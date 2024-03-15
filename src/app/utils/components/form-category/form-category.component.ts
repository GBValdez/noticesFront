import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { categoryDto } from '@category/interface/category.interface';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, RouterModule],
})
export class FormCategoryComponent implements OnInit {
  @Output() submitCategory: EventEmitter<categoryDto> =
    new EventEmitter<categoryDto>();
  @Input() linkCategory: string = '';
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(45)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
  });
  constructor(private fb: FormBuilder, private alerCtrl: AlertController) {}

  ngOnInit() {}
  cleanForm() {
    this.form.patchValue({
      name: '',
      description: '',
    });
  }
  async summitForm() {
    if (this.form.valid) {
      const WARNING_ALERT = await this.alerCtrl.create({
        header: 'Advertencia',
        message: '¿Estas seguro de guardar los cambios?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Guardar',
            handler: () => {
              this.submitCategory.emit(this.form.value);
              this.cleanForm();
            },
          },
        ],
      });
      WARNING_ALERT.present();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
