export interface credentialsDto {
  username: string;
  password: string;
}

export interface loginResDto {
  token: string;
}

export interface auth {
  roles: string[];
  username: string;
  email: string;
  token: string;
  exp: number;
  iat: number;
}

export interface decodeJwtInterface {
  roles: string[];
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface registerBody {
  username: string;
  email: string;
  password: string;
  name: string;
}
