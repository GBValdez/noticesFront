import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { SubMenuComponent } from '@utils/components/sub-menu/sub-menu.component';
import { CategoryService } from '@category/services/category.service';
import { categoryDto } from '@category/interface/category.interface';
import { NoticeService } from '@notice/services/notice.service';
import { AlertController } from '@ionic/angular/standalone';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-notice-create',
  templateUrl: './notice-create.page.html',
  styleUrls: ['./notice-create.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SubMenuComponent,
  ],
})
export class NoticeCreatePage implements OnInit {
  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(45)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    body: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    categories: ['', [Validators.required]],
  });
  categories: categoryDto[] = [];
  constructor(
    private fb: FormBuilder,
    private categorySvc: CategoryService,
    private noticeSvc: NoticeService,
    private alerCtrl: AlertController,
    private router: Router,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    console.log(this.authSvc.getAuth());
    this.categorySvc.getMethod().subscribe((categories) => {
      this.categories = categories;
    });
  }
  cleanForm() {
    console.log('cleanForm', this.form.value);
    this.form.patchValue({
      title: '',
      description: '',
      body: '',
      imageUrl: '',
      categories: '',
    });
  }

  sendForm() {
    if (this.form.valid) {
      this.noticeSvc.postMethod(this.form.value).subscribe(async (res) => {
        const alert = await this.alerCtrl.create({
          header: 'Success',
          message: 'La noticia se a creado con exito',
          buttons: ['OK'],
        });
        alert.present();
        this.cleanForm();
        this.router.navigate(['/notice/home']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
