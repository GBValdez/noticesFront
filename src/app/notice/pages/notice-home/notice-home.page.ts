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
  ],
})
export class NoticeHomePage implements OnInit {
  form: FormGroup = this.fb.group({
    categories: [''],
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

    this.noticeSvc.getMethod().subscribe((notices) => {
      this.notices = notices;
      this.notices.forEach((notice) => {
        notice.description = notice.description.substring(0, 100);
        if (notice.description.length >= 100) notice.description += '...';
      });
    });
  }
}
