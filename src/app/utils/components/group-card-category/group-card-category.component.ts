import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { categoryDto } from '@category/interface/category.interface';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';

// Componente para mostrar registros en forma de tarjetas
@Component({
  selector: 'app-group-card-category',
  templateUrl: './group-card-category.component.html',
  styleUrls: ['./group-card-category.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class GroupCardCategoryComponent {
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();
  @Input() categories: categoryDto[] = [];
  @Input() linkCategory: string = '';
  @Input() canEdit: boolean = true;

  constructor(private alertCtrl: AlertController) {}

  async deleteCategory(category: categoryDto) {
    const WARNING_ALERT = await this.alertCtrl.create({
      header: 'Advertencia',
      message: `¿Estas seguro de eliminar el registro "${category.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteEvent.emit(category.id);
          },
        },
      ],
    });
    await WARNING_ALERT.present();
  }
}
