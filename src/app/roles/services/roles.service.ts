import { Injectable } from '@angular/core';
import { CommonsSvcService } from '@utils/commons-svc.service';
import { roleCreationDto, roleDto } from '../interfaces/roles.interface';
import { HttpClient } from '@angular/common/http';

// Servicio para la gestión de roles
@Injectable({
  providedIn: 'root',
})
export class RolesService extends CommonsSvcService<roleDto, roleCreationDto> {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.url = 'rol';
  }
}
