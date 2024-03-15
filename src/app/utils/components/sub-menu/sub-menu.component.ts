import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class SubMenuComponent implements OnInit {
  constructor(private authSvc: AuthService) {}
  isAdmin: boolean = false;
  ngOnInit() {
    this.authSvc.getObservable().subscribe((auth) => {
      {
        if (auth) this.isAdmin = auth.roles.includes('ADMIN');
        else this.isAdmin = false;
      }
    });
    if (this.authSvc.hasAuth())
      this.isAdmin = this.authSvc.getAuth()!.roles.includes('ADMIN');
  }
  logout() {
    this.authSvc.removeAuth();
  }
}
