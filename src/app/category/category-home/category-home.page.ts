import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.page.html',
  styleUrls: ['./category-home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CategoryHomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
