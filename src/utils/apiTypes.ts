// Generated from OpenAPI schemas in src/utils/apiResponse.json (manually mapped)

export interface ApiResponse<T> {
  success: boolean;
  message?: string | null;
  data: T | null | undefined;
  errors?: string[] | null;
}

export interface QuestionDto {
  id: number;
  questionText: string | null;
  type: string | null;
  orderIndex: number;
  options: string | null; // Server provides string; client may parse JSON
}

export interface SurveyDto {
  id: number;
  title: string | null;
  description: string | null;
  isActive: boolean;
  questions: QuestionDto[] | null;
}

export type SurveyDtoList = SurveyDto[];

export interface SurveyResponseDto {
  id: number;
  surveyId: number;
  surveyTitle: string | null;
  employeeId: number;
  employeeName: string | null;
  completedAt: string; // date-time
  sentimentScore: number | null;
  sentimentLabel: string | null;
  aiAnalysis: string | null;
}

export type SurveyResponseDtoList = SurveyResponseDto[];

export interface SurveyAnswerRequest {
  questionId: number;
  answerText?: string | null;
}

export interface SubmitSurveyRequest {
  surveyId: number;
  employeeId: number;
  answers: SurveyAnswerRequest[] | null;
}

// API Response wrappers
export type SurveyDtoApiResponse = ApiResponse<SurveyDto>;
export type SurveyDtoListApiResponse = ApiResponse<SurveyDtoList>;
export type SurveyResponseDtoApiResponse = ApiResponse<SurveyResponseDto>;
