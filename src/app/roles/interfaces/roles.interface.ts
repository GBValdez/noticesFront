export interface roleCreationDto {
  name: string;
  description: string;
}

export interface roleDto extends roleCreationDto {
  id: number;
}
