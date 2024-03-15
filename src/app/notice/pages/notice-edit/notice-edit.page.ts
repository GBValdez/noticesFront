import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NoticeFormComponent } from '@notice/components/notice-form/notice-form.component';
import {
  noticeCreationDto,
  noticeDto,
} from '@notice/interface/notice.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticeService } from '@notice/services/notice.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-notice-edit',
  templateUrl: './notice-edit.page.html',
  styleUrls: ['./notice-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, NoticeFormComponent],
})
export class NoticeEditPage {
  @ViewChild('form', {
    static: true,
  })
  noticeForm!: NoticeFormComponent;
  titleNotice: string = '';
  constructor(
    private actRoute: ActivatedRoute,
    private noticeSvc: NoticeService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ionViewDidEnter() {
    this.noticeSvc.getMethodById(this.id).subscribe((notice) => {
      this.titleNotice = notice.title;
      this.notice = notice;
      this.noticeForm.form.patchValue({
        title: notice.title,
        description: notice.description,
        body: notice.body,
        imageUrl: notice.imageUrl,
        categories: notice.categories.map((category) => category.id),
      });
    });
  }

  id: number = this.actRoute.snapshot.params['id'];
  notice!: noticeDto;

  sendData(data: noticeCreationDto) {
    this.noticeSvc.putMethod(this.id, data).subscribe(async (res) => {
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'La noticia se a actualizado con exito',
        buttons: ['OK'],
      });
      alert.present();
      this.router.navigate(['/notice/home']);
    });
  }
}
