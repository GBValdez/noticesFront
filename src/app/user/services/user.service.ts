import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userDto } from '@user/interfaces/user.interface';
import { CommonsSvcService } from '@utils/commons-svc.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CommonsSvcService<userDto, userDto> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.url = 'user';
  }
}
