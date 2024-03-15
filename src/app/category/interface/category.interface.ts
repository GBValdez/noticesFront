export interface categoryCreationDto {
  name: string;
  description: string;
}

export interface categoryDto extends categoryCreationDto {
  id: number;
}
