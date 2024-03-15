import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { noticeDto } from '@notice/interface/notice.interface';
import { CategoryService } from '@category/services/category.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-group-cards',
  templateUrl: './group-cards.page.html',
  styleUrls: ['./group-cards.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class GroupCardsPage implements OnInit {
  @Input() notices: noticeDto[] = [];
  ngOnInit() {}
}
