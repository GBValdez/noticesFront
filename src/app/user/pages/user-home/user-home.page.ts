import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GroupCardCategoryComponent } from '@utils/components/group-card-category/group-card-category.component';
import { UserService } from '@user/services/user.service';
import { userDto } from '@user/interfaces/user.interface';

// Componente para la visualización de los usuarios

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
  standalone: true,
  imports: [IonicModule, GroupCardCategoryComponent],
})
export class UserHomePage {
  users: userDto[] = [];
  constructor(private userSvc: UserService) {}
}
