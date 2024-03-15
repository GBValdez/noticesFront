import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { categoryDto } from '@category/interface/category.interface';
import { CategoryService } from '@category/services/category.service';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { noticeCreationDto } from '@notice/interface/notice.interface';

@Component({
  selector: 'app-notice-form',
  templateUrl: './notice-form.component.html',
  styleUrls: ['./notice-form.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, RouterModule],
})
export class NoticeFormComponent implements OnInit {
  categories: categoryDto[] = [];

  @Output() submitNotice: EventEmitter<noticeCreationDto> =
    new EventEmitter<noticeCreationDto>();
  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private categorySvc: CategoryService
  ) {}
  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(45)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    body: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    categories: ['', [Validators.required]],
  });
  ngOnInit() {
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
  async sendForm() {
    if (this.form.valid) {
      const WARNING_ALERT = await this.alertCtrl.create({
        header: 'Advertencia',
        message: '¿Estas seguro guardar los cambios?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.submitNotice.emit(this.form.value);
              this.cleanForm();
            },
          },
        ],
      });
      await WARNING_ALERT.present();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
