/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SignupComponent } from './../../pages/components/signup/signup.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss'],
})
export class HeadersComponent implements OnInit {
  @ViewChild('effacerSwal', { static: false })
  private effacerSwal: SwalComponent;
  currentUser: any;
  user: any;
  users: any;
  isSeller = false;

  constructor(private authService: AuthenticationsService, public signinDialog: MatDialog) {}

  async ngOnInit(): Promise<any> {
    this.currentUser = await this.authService.currentUserValue;

    if (this.currentUser) {
      this.users = await this.authService.getUser(this.currentUser.token || this.currentUser['user'].token).toPromise();
      this.user = this.users.body['user'].username || this.users.username;

      if (this.users.body['user'].account_type === 'SELLER' || this.users.body['user'].account_type === 'Seller') {
        this.isSeller = true;
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.signinDialog.open(SignupComponent);
    dialogRef.afterClosed().subscribe((result) => console.log('dialog closed |' + result.toString()));
  }

  toOpenDialog() {
    if (this.currentUser) {
      this.oldBuyerNewSeller();
    }

    if (!this.currentUser) {
      this.openDialog();
    }
  }

  oldBuyerNewSeller(): void {
    this.effacerSwal.fire();
  }

  onUpdateUser() {
    this.authService.getUser(this.currentUser.token || this.currentUser['user'].token).subscribe((data) => {
      console.log(data.body);
      const users: any = data.body;

      console.log('user test ', users.user);

      const user = {
        username: users.user.username,
        email: users.user.email,
        gender: users.user.gender,
        account_type: 'Seller',
        address: users.user.address,
      };

      console.log(user);
      this.authService.update(user, users.user.token).subscribe((res) => {
        console.log('updated from backend ', res.body);
        this.users = res.body;
        console.log(this.users);
        window.location.reload();
      });
    });
  }
}
