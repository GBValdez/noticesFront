import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { SubMenuComponent } from '@utils/components/sub-menu/sub-menu.component';
import { NoticeService } from '@notice/services/notice.service';
import { AlertController } from '@ionic/angular/standalone';
import { NoticeFormComponent } from '@notice/components/notice-form/notice-form.component';
import { noticeCreationDto } from '@notice/interface/notice.interface';

@Component({
  selector: 'app-notice-create',
  templateUrl: './notice-create.page.html',
  styleUrls: ['./notice-create.page.scss'],
  standalone: true,
  imports: [IonicModule, NoticeFormComponent],
})
export class NoticeCreatePage {
  constructor(
    private noticeSvc: NoticeService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  sendData(data: noticeCreationDto) {
    this.noticeSvc.postMethod(data).subscribe(async (res) => {
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'La noticia se a creado con exito',
        buttons: ['OK'],
      });
      alert.present();
      this.router.navigate(['/notice/home']);
    });
  }
}
