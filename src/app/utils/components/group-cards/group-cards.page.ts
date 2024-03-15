import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { noticeDto } from '@notice/interface/notice.interface';
import { CategoryService } from '@category/services/category.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { NoticeService } from '@notice/services/notice.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-group-cards',
  templateUrl: './group-cards.page.html',
  styleUrls: ['./group-cards.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class GroupCardsPage implements OnInit {
  constructor(
    private authSvc: AuthService,
    private noticeSvc: NoticeService,
    private alertCtr: AlertController
  ) {}
  isAdmin: boolean = false;
  @Input() notices: noticeDto[] = [];
  ngOnInit() {
    this.isAdmin = this.authSvc.getAuth()!.roles.includes('ADMIN');
  }
  async deleteNotice(id: number) {
    const alert = await this.alertCtr.create({
      header: 'Advertencia',
      message: '¿Estas seguro de eliminar la noticia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.noticeSvc.deleteMethod(id).subscribe(async () => {
              this.notices = this.notices.filter((notice) => notice.id !== id);
              const alert = await this.alertCtr.create({
                header: 'Success',
                message: 'La noticia se a eliminado con exito',
                buttons: ['OK'],
              });
            });
          },
        },
      ],
    });
    alert.present();
  }
}
