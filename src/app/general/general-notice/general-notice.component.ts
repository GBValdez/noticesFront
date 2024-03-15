import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-general-notice',
  templateUrl: './general-notice.component.html',
  styleUrls: ['./general-notice.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class GeneralNoticeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
