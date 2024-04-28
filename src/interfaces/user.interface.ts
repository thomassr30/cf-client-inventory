export interface IUserResponse {
  data: Data[];
  meta: Meta;
}

export interface Data {
  rut: string;
  name: string;
  phone: null;
  radial_code: null | string;
  position: null | string;
  isActive: boolean;
}

export interface Meta {
  totalData: number;
  page: number;
  perPage: number;
}
