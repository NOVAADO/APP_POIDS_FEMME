export type DetectedState = "present" | "missing" | "unclear";

export type MealAnalysisResult = {
  summary: string;
  detected: {
    protein: DetectedState;
    vegetablesOrFiber: DetectedState;
    grainOrStarch: DetectedState;
    fat: DetectedState;
  };
  gentleSuggestion: string;
  simpleOption: string;
  glycemicSupportNote: string;
  reassurance: string;
  safetyNote?: string;
};

export type MealAnalysisErrorCode =
  | "missing_meal"
  | "no_api_key"
  | "upstream_error"
  | "invalid_response";

export type MealAnalysisErrorPayload = {
  error: true;
  code: MealAnalysisErrorCode;
  message: string;
};

export type MealAnalysisApiResponse = MealAnalysisResult | MealAnalysisErrorPayload;
