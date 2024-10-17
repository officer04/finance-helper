export interface LanguageBody {
  code: string;
  value: string
}

export interface SupportedLanguageResponse {
  items: LanguageBody[]
}