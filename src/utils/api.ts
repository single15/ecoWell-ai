import {
  DashboardStatsDtoApiResponse,
  SubmitSurveyRequest,
  SurveyDtoApiResponse,
  SurveyResponseDtoApiResponse,
} from "./apiTypes";
import submitResponse from "./responseData/submitResponse.json";
import activeSurveyResponse from "./responseData/surveyApi-active.json";

const DEFAULT_BASE_URL =
  "https://unwailed-kisha-prebarbarously.ngrok-free.dev/api";

function getBaseUrl(): string {
  // In real app, consider env var like import.meta.env.VITE_API_BASE_URL
  return DEFAULT_BASE_URL;
}

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const resp = await fetch(input, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`HTTP ${resp.status}: ${text}`);
  }
  return (await resp.json()) as T;
}

export const SurveysApi = {
  async getActive(): Promise<SurveyDtoApiResponse> {
    const url = `${getBaseUrl()}/SurveysApi/active`;
    return await http<SurveyDtoApiResponse>(url, { method: "GET" });
  },

  async submit(
    request: SubmitSurveyRequest
  ): Promise<SurveyResponseDtoApiResponse> {
    const url = `${getBaseUrl()}/SurveysApi/submit`;
    return await http<SurveyResponseDtoApiResponse>(url, {
      method: "POST",
      body: JSON.stringify(request),
    });
  },
};

// Mock API for local development/testing
export const MockSurveysApi = {
  async getActive(): Promise<SurveyDtoApiResponse> {
    // Return the JSON bundled with the app
    return Promise.resolve(activeSurveyResponse as SurveyDtoApiResponse);
  },
  async submit(
    request: SubmitSurveyRequest
  ): Promise<SurveyResponseDtoApiResponse> {
    return Promise.resolve(submitResponse as SurveyResponseDtoApiResponse);
  },
};

export const DashboardApi = {
  async getStats(): Promise<DashboardStatsDtoApiResponse> {
    const url = `${getBaseUrl()}/DashboardApi/stats`;
    return await http<DashboardStatsDtoApiResponse>(url, { method: "GET" });
  },
};
