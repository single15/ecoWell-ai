// Generated from OpenAPI schemas in src/utils/apiResponse.json (manually mapped)

export interface ApiResponse<T> {
  success: boolean;
  message?: string | null;
  data: T | null | undefined;
  errors?: string[] | null;
}

export interface DashboardStatsDto {
  totalEmployees: number;
  totalSurveys: number;
  totalResponses: number;
  responsesThisWeek: number;
  averageSentimentScore: number;
  overallSentiment: string | null;
  departmentSentiments: DepartmentSentimentDto[] | null;
}

export interface DepartmentSentimentDto {
  department: string | null;
  responseCount: number;
  averageSentiment: number;
  sentimentLabel: string | null;
}

export interface EmployeeDto {
  id: number;
  employeeCode: string | null;
  name: string | null;
  email: string | null;
  department: string | null;
  totalResponses: number;
  lastResponseDate: string | null; // date-time
}

export type EmployeeDtoList = EmployeeDto[];

export interface EsgMetricDto {
  id: number;
  category: string | null;
  metricName: string | null;
  description: string | null;
  relatedResponsesCount: number;
  averageSentiment: number;
}

export type EsgMetricDtoList = EsgMetricDto[];

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

export interface CreateEmployeeRequest {
  employeeCode?: string | null;
  name?: string | null;
  email?: string | null;
  department?: string | null;
}

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
export type DashboardStatsDtoApiResponse = ApiResponse<DashboardStatsDto>;
export type EmployeeDtoApiResponse = ApiResponse<EmployeeDto>;
export type EmployeeDtoListApiResponse = ApiResponse<EmployeeDtoList>;
export type EsgMetricDtoApiResponse = ApiResponse<EsgMetricDto>;
export type EsgMetricDtoListApiResponse = ApiResponse<EsgMetricDtoList>;
export type SurveyDtoApiResponse = ApiResponse<SurveyDto>;
export type SurveyDtoListApiResponse = ApiResponse<SurveyDtoList>;
export type SurveyResponseDtoApiResponse = ApiResponse<SurveyResponseDto>;
export type SurveyResponseDtoListApiResponse =
  ApiResponse<SurveyResponseDtoList>;
export type ObjectApiResponse = ApiResponse<unknown>;
