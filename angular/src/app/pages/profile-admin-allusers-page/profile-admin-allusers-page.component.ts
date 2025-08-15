import {Component, OnInit, signal} from '@angular/core';
import {HeaderProfileComponent} from '../../layout/header-profile/header-profile.component';
import {JsonPipe, NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteIconComponent} from '../../components/icons/delete-icon/delete-icon.component';
import {ModifyIconComponent} from '../../components/icons/modify-icon/modify-icon.component';
import {PopUpComponent} from '../../components/pop-up/pop-up.component';
import {UsersApiService} from '../../services/users-api.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile-admin-allusers-page',
  imports: [
    HeaderProfileComponent,
    ReactiveFormsModule,
    JsonPipe,
    ModifyIconComponent,
    DeleteIconComponent,
    PopUpComponent,
    RouterLink
  ],
  templateUrl: './profile-admin-allusers-page.component.html',
  styleUrl: './profile-admin-allusers-page.component.scss'
})
export class ProfileAdminAllusersPageComponent implements OnInit {
    usersList!: any[];
    showPopUp = signal(false)

    constructor(private usersApi: UsersApiService) {
    }

    ngOnInit(): void {
        this.usersApi.getAllUsers().subscribe((res) => {
          this.usersList = res;
        });
    }

    showPopUpTrue() {
      this.showPopUp.update((bool) => bool === !bool);
    }

}
