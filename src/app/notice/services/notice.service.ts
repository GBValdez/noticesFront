import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  noticeCreationDto,
  noticeDto,
} from '@notice/interface/notice.interface';
import { CommonsSvcService } from '@utils/commons-svc.service';

@Injectable({
  providedIn: 'root',
})
export class NoticeService extends CommonsSvcService<
  noticeDto,
  noticeCreationDto
> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.url = 'notice';
  }
}
