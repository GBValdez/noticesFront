import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoryService } from '@category/services/category.service';
import { categoryDto } from '@category/interface/category.interface';
import { FormCategoryComponent } from '@utils/components/form-category/form-category.component';
import { GroupCardCategoryComponent } from '@utils/components/group-card-category/group-card-category.component';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.page.html',
  styleUrls: ['./category-home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, GroupCardCategoryComponent],
})
export class CategoryHomePage {
  categories: categoryDto[] = [];
  constructor(
    private categorySvc: CategoryService,
    private alertCtr: AlertController
  ) {}

  ionViewWillEnter() {
    this.categorySvc.getMethod().subscribe((categories) => {
      this.categories = categories;
    });
  }

  deleteCategory(id: number) {
    this.categorySvc.deleteMethod(id).subscribe(async () => {
      this.categories = this.categories.filter(
        (category) => category.id !== id
      );
      const alert = await this.alertCtr.create({
        header: 'Success',
        message: 'La categoría se a eliminado con exito',
        buttons: ['OK'],
      });
      alert.present();
    });
  }
}
