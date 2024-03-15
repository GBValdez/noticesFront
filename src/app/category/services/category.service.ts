import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  categoryCreationDto,
  categoryDto,
} from '@category/interface/category.interface';
import { CommonsSvcService } from '@utils/commons-svc.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CommonsSvcService<
  categoryDto,
  categoryCreationDto
> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.url = 'category';
  }
}
