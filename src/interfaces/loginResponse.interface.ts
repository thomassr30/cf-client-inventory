export interface LoginResponse {
  data: Data;
  access_token: string;
}

export interface Data {
  id: number;
  email: string;
  role: string;
  name: string;
  lastName: string;
  numberCompany: number;
  fireBrigade: number;
}
