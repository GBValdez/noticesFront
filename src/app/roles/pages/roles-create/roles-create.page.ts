import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormCategoryComponent } from '@utils/components/form-category/form-category.component';
import { RolesService } from '../../services/roles.service';
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { roleCreationDto } from '../../interfaces/roles.interface';
// Componente para la creación de roles

@Component({
  selector: 'app-roles-create',
  templateUrl: './roles-create.page.html',
  styleUrls: ['./roles-create.page.scss'],
  standalone: true,
  imports: [IonicModule, FormCategoryComponent],
})
export class RolesCreatePage {
  constructor(
    private roleSvc: RolesService,
    private alertCtr: AlertController,
    private router: Router
  ) {}

  sendData(data: roleCreationDto) {
    this.roleSvc.postMethod(data).subscribe(async () => {
      const alert = await this.alertCtr.create({
        header: 'Success',
        message: 'El rol se a creado con exito',
        buttons: ['OK'],
      });
      alert.present();
      this.router.navigate(['/notice/roles']);
    });
  }
}
