import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GroupCardCategoryComponent } from '@utils/components/group-card-category/group-card-category.component';
import { RolesService } from '../../services/roles.service';
import { roleDto } from '../../interfaces/roles.interface';

// Componente para la visualización de los roles

@Component({
  selector: 'app-roles-home',
  templateUrl: './roles-home.page.html',
  styleUrls: ['./roles-home.page.scss'],
  standalone: true,
  imports: [IonicModule, GroupCardCategoryComponent],
})
export class RolesHomePage {
  constructor(private rolesSvc: RolesService) {}
  roles: roleDto[] = [];

  ionViewWillEnter() {
    this.rolesSvc.getMethod().subscribe((roles) => {
      this.roles = roles;
    });
  }

  deleteRole(id: number) {
    this.rolesSvc.deleteMethod(id).subscribe(async () => {
      this.roles = this.roles.filter((role) => role.id !== id);
    });
  }
}
