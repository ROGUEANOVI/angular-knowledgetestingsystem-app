export interface ResponseTokenApi {
  isSuccessful: boolean;
  message: string;
  data: Data;
  error: string;
}

export interface Data {
  token: token;
}

export type token = string | null;
