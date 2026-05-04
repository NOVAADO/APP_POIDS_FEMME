import { NextResponse } from "next/server";
import type {
  MealAnalysisErrorPayload,
  MealAnalysisResult,
} from "@/lib/ai/meal-analysis-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `Tu es l’agent “Analyse douce du repas” d’une application destinée aux femmes en préménopause, périménopause et ménopause, avec surplus de poids possible, résistance à l’insuline possible, charge mentale élevée et profils neurodivergents.

Ta mission est d’aider l’utilisatrice à comprendre la structure d’un repas sans jugement, sans calcul de calories et sans logique de régime strict.

Tu repères simplement si le repas semble contenir :
- une source de protéines;
- des légumes, fruits ou fibres;
- un féculent ou glucide complexe;
- un lipide.

Tu proposes une amélioration simple, douce et réaliste si elle peut soutenir la stabilité de l’énergie ou de la glycémie.

Tu ne donnes jamais de calories, de macros détaillées, de score, de verdict moral ou de message de culpabilité.

Tu ne fais aucun diagnostic médical. Tu ne remplaces pas une professionnelle ou un professionnel de la santé.

Ton ton est mature, chaleureux, pratique, non infantilisant et non culpabilisant.

Tu réponds toujours dans le format JSON imposé par l’API. Toutes les phrases sont rédigées en français du Québec, courtes (1-2 phrases par champ).`;

const RESPONSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: {
      type: "string",
      description: "Une phrase neutre qui décrit ce que tu repères globalement, sans jugement.",
    },
    detected: {
      type: "object",
      additionalProperties: false,
      properties: {
        protein: { type: "string", enum: ["present", "missing", "unclear"] },
        vegetablesOrFiber: { type: "string", enum: ["present", "missing", "unclear"] },
        grainOrStarch: { type: "string", enum: ["present", "missing", "unclear"] },
        fat: { type: "string", enum: ["present", "missing", "unclear"] },
      },
      required: ["protein", "vegetablesOrFiber", "grainOrStarch", "fat"],
    },
    gentleSuggestion: {
      type: "string",
      description:
        "Une suggestion douce et réaliste. Jamais culpabilisante. Toujours optionnelle.",
    },
    simpleOption: {
      type: "string",
      description:
        "Une option facile et concrète à ajouter ou ajuster (ex. concombre, soupe, poignée d’épinards).",
    },
    glycemicSupportNote: {
      type: "string",
      description:
        "Un repère doux qui peut soutenir la stabilité glycémique (ex. ordre des bouchées, marche douce). Jamais médical.",
    },
    reassurance: {
      type: "string",
      description:
        "Un rappel court qui désamorce la pression. Ce n’est pas un test à réussir.",
    },
    safetyNote: {
      type: "string",
      description:
        "Optionnel. Ajoute uniquement si le contenu pourrait être ambigu côté santé. Jamais un diagnostic.",
    },
  },
  required: [
    "summary",
    "detected",
    "gentleSuggestion",
    "simpleOption",
    "glycemicSupportNote",
    "reassurance",
  ],
} as const;

function errorPayload(
  status: number,
  code: MealAnalysisErrorPayload["code"],
  message: string,
) {
  const body: MealAnalysisErrorPayload = { error: true, code, message };
  return NextResponse.json(body, { status });
}

function isResult(value: unknown): value is MealAnalysisResult {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (typeof v.summary !== "string") return false;
  if (typeof v.gentleSuggestion !== "string") return false;
  if (typeof v.simpleOption !== "string") return false;
  if (typeof v.glycemicSupportNote !== "string") return false;
  if (typeof v.reassurance !== "string") return false;
  if (!v.detected || typeof v.detected !== "object") return false;
  const d = v.detected as Record<string, unknown>;
  const states = ["present", "missing", "unclear"];
  return (
    typeof d.protein === "string" &&
    states.includes(d.protein) &&
    typeof d.vegetablesOrFiber === "string" &&
    states.includes(d.vegetablesOrFiber) &&
    typeof d.grainOrStarch === "string" &&
    states.includes(d.grainOrStarch) &&
    typeof d.fat === "string" &&
    states.includes(d.fat)
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return errorPayload(
      503,
      "no_api_key",
      "L’analyse IA n’est pas encore activée sur cet environnement.",
    );
  }

  let mealText = "";
  try {
    const body = (await request.json()) as { meal?: string };
    mealText = (body.meal ?? "").trim();
  } catch {
    return errorPayload(400, "missing_meal", "Le corps de la requête est invalide.");
  }

  if (mealText.length === 0) {
    return errorPayload(
      400,
      "missing_meal",
      "Écris quelques mots sur ton repas avant de lancer l’analyse.",
    );
  }
  if (mealText.length > 2000) {
    mealText = mealText.slice(0, 2000);
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Voici le repas à analyser doucement :\n${mealText}` },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "meal_analysis",
            schema: RESPONSE_SCHEMA,
            strict: true,
          },
        },
      }),
    });
  } catch {
    return errorPayload(
      502,
      "upstream_error",
      "L’analyse n’a pas fonctionné pour l’instant. Tu peux réessayer plus tard.",
    );
  }

  if (!upstream.ok) {
    return errorPayload(
      502,
      "upstream_error",
      "L’analyse n’a pas fonctionné pour l’instant. Tu peux réessayer plus tard.",
    );
  }

  let parsed: unknown;
  try {
    const data = (await upstream.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("empty content");
    parsed = JSON.parse(content);
  } catch {
    return errorPayload(
      502,
      "invalid_response",
      "L’analyse a renvoyé une réponse inattendue. Tu peux réessayer plus tard.",
    );
  }

  if (!isResult(parsed)) {
    return errorPayload(
      502,
      "invalid_response",
      "L’analyse a renvoyé une réponse inattendue. Tu peux réessayer plus tard.",
    );
  }

  const result: MealAnalysisResult = parsed;
  return NextResponse.json(result, { status: 200 });
}
