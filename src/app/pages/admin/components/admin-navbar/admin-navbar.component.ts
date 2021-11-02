/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { I18nServiceService } from './../../../../services/i18n-service/i18n-service.service';
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
})
export class AdminNavbarComponent implements OnInit {
  @Input() welcome;
  @Input() infos;
  currentUser: any;
  @Input() users: any;
  @Input() user: any;
  constructor(
    private authService: AuthenticationsService,
    private router: Router,
    private i18nServiceService: I18nServiceService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.authService.currentUserValue;

    if (this.currentUser) {
      this.users = await this.authService.getUser(this.currentUser.token || this.currentUser['user'].token).toPromise();
      this.user = this.users.body['user'].username || this.users.username;
    }
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
