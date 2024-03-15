import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, IonicModule } from '@ionic/angular';
import { SubMenuComponent } from '@utils/components/sub-menu/sub-menu.component';

@Component({
  selector: 'app-general-notice',
  templateUrl: './general-notice.component.html',
  styleUrls: ['./general-notice.component.scss'],
  standalone: true,
  imports: [IonicModule, SubMenuComponent],
})
export class GeneralNoticeComponent {
  constructor() {}
}
