import { Component } from '@angular/core';
import {DeleteIconComponent} from '../../components/icons/delete-icon/delete-icon.component';
import {HeaderProfileComponent} from '../../layout/header-profile/header-profile.component';
import {PopUpComponent} from '../../components/pop-up/pop-up.component';

@Component({
  selector: 'app-profile-admin-allrecipes-page',
  imports: [
    DeleteIconComponent,
    HeaderProfileComponent,
    PopUpComponent
  ],
  templateUrl: './profile-admin-allrecipes-page.component.html',
  styleUrl: './profile-admin-allrecipes-page.component.scss'
})
export class ProfileAdminAllrecipesPageComponent {

}
