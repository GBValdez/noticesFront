import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormCategoryComponent } from '@utils/components/form-category/form-category.component';
import { categoryCreationDto } from '@category/interface/category.interface';
import { CategoryService } from '@category/services/category.service';
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.page.html',
  styleUrls: ['./category-create.page.scss'],
  standalone: true,
  imports: [IonicModule, FormCategoryComponent],
})
export class CategoryCreatePage implements OnInit {
  constructor(
    private categorySvc: CategoryService,
    private alertCtr: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}
  sendData(data: categoryCreationDto) {
    this.categorySvc.postMethod(data).subscribe(async () => {
      const alert = await this.alertCtr.create({
        header: 'Success',
        message: 'La categoria se a creado con exito',
        buttons: ['OK'],
      });
      alert.present();
      this.router.navigate(['/notice/category']);
    });
  }
}
