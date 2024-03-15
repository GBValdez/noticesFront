import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { noticeDto } from '@notice/interface/notice.interface';
import { NoticeService } from '@notice/services/notice.service';
import { GroupCardsPage } from '@utils/components/group-cards/group-cards.page';

@Component({
  selector: 'app-notice-detaill',
  templateUrl: './notice-detaill.page.html',
  styleUrls: ['./notice-detaill.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, GroupCardsPage],
})
export class NoticeDetaillPage {
  constructor(
    private routerAct: ActivatedRoute,
    private noticeSvc: NoticeService
  ) {}
  notice!: noticeDto;
  noticesRecommended: noticeDto[] = [];
  id: number = this.routerAct.snapshot.params['id'];

  ionViewWillEnter() {
    this.noticeSvc.getMethodById(this.id).subscribe((notice) => {
      this.notice = notice;
      console.log(this.notice);
      this.noticeSvc
        .findByCategories(this.notice.categories.map((category) => category.id))
        .subscribe((notices) => {
          this.noticesRecommended = notices.filter(
            (notice) => notice.id != this.notice.id
          );
        });
    });
  }
}
