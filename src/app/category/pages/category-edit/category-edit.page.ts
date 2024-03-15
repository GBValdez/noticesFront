import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormCategoryComponent } from '@utils/components/form-category/form-category.component';
import { categoryCreationDto } from '@category/interface/category.interface';
import { CategoryService } from '@category/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, FormCategoryComponent],
})
export class CategoryEditPage {
  categoryName: string = '';
  @ViewChild('form', { static: true }) form!: FormCategoryComponent;
  constructor(
    private categorySvc: CategoryService,
    private routeAct: ActivatedRoute,
    private router: Router,
    private alertCtr: AlertController
  ) {}
  id: number = this.routeAct.snapshot.params['id'];
  ionViewDidEnter() {
    this.categorySvc.getMethodById(this.id).subscribe((category) => {
      this.categoryName = category.name;
      this.form.form.patchValue({
        name: category.name,
        description: category.description,
      });
    });
  }

  sendData(data: categoryCreationDto) {
    this.categorySvc.putMethod(this.id, data).subscribe(async () => {
      const alert = await this.alertCtr.create({
        header: 'Success',
        message: 'La categoría se a actualizado con exito',
        buttons: ['OK'],
      });
      alert.present();
      this.router.navigate(['notice/category']);
    });
  }
}
