import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { SubMenuComponent } from '@utils/components/sub-menu/sub-menu.component';
import { NoticeService } from '@notice/services/notice.service';
import { noticeDto } from '@notice/interface/notice.interface';
import { categoryDto } from '@category/interface/category.interface';
import { CategoryService } from '@category/services/category.service';
import { Observable } from 'rxjs';
import { GroupCardsPage } from '@utils/components/group-cards/group-cards.page';

@Component({
  selector: 'app-notice-home',
  templateUrl: './notice-home.page.html',
  styleUrls: ['./notice-home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SubMenuComponent,
    GroupCardsPage,
  ],
})
export class NoticeHomePage implements OnInit {
  form: FormGroup = this.fb.group({
    categories: [[]],
  });

  catalogues: categoryDto[] = [];
  constructor(
    private noticeSvc: NoticeService,
    private fb: FormBuilder,
    private categorySvc: CategoryService
  ) {}
  notices: noticeDto[] = [];
  ngOnInit() {
    this.categorySvc.getMethod().subscribe((categories) => {
      this.catalogues = categories;
    });
    this.getData();
  }
  getData() {
    let obs: Observable<noticeDto[]>;
    if (this.form.get('categories')?.value.length == 0)
      obs = this.noticeSvc.getMethod();
    else
      obs = this.noticeSvc.findByCategories(this.form.get('categories')?.value);
    obs.subscribe((notices) => {
      this.notices = notices;
      this.notices.forEach((notice) => {
        notice.description = notice.description.substring(0, 100);
        if (notice.description.length >= 100) notice.description += '...';
      });
    });
  }
}
