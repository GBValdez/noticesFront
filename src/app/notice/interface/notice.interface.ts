import { categoryDto } from '@category/interface/category.interface';
import { userDto } from '@user/interfaces/user.interface';
interface categoryBasic {
  title: string;
  description: string;
  imageUrl: string;
  body: string;
}

export interface noticeCreationDto extends categoryBasic {
  categories: number[];
}

export interface noticeDto extends categoryBasic {
  id: number;
  categories: categoryDto[];
  publicationDay: Date;
  author: userDto;
}
