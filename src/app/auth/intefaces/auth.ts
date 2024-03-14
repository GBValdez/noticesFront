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
}
