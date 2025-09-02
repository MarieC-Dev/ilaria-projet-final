import {Component, OnInit, signal} from '@angular/core';
import {HeaderProfileComponent} from '../../layout/header-profile/header-profile.component';
import {JsonPipe, NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteIconComponent} from '../../components/icons/delete-icon/delete-icon.component';
import {ModifyIconComponent} from '../../components/icons/modify-icon/modify-icon.component';
import {PopUpComponent} from '../../components/pop-up/pop-up.component';
import {UsersApiService} from '../../services/users-api.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile-admin-allusers-page',
  imports: [
    HeaderProfileComponent,
    ReactiveFormsModule,
    DeleteIconComponent,
    PopUpComponent,
    RouterLink
  ],
  templateUrl: './profile-admin-allusers-page.component.html',
  styleUrl: './profile-admin-allusers-page.component.scss'
})
export class ProfileAdminAllusersPageComponent implements OnInit {
  usersList = signal<any[]>([]);
  selectedUserIdToDelete = signal<number>(-1);

  showPopUp = signal(false);

    constructor(
      private usersApi: UsersApiService,
      private router: Router
    ) { }

    ngOnInit(): void {
      this.usersApi.getAllUsers().subscribe((res) => {
        this.usersList.set(res)
      });
    }

    showPopUpTrue(id: number) {
      this.showPopUp.set(true);
      this.selectedUserIdToDelete.set(id);
      console.log(this.selectedUserIdToDelete())
      return this.showPopUp();
    }

    showPopUpFalse() {
      this.showPopUp.set(false);
      return this.showPopUp();
    }

    deleteUser(id: number) {
      this.usersApi.deleteUser(id).subscribe(() => {
        this.showPopUpFalse();
        this.usersList.update(users =>
          users.filter(user => user.id !== id)
        );
        console.log(id);
      })
    }
}
