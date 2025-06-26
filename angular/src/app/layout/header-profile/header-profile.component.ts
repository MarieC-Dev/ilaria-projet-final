import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {HeartIconComponent} from "../../components/icons/heart-icon/heart-icon.component";
import {ProfileIconComponent} from "../../components/icons/profile-icon/profile-icon.component";
import {RecipeIconComponent} from "../../components/icons/recipe-icon/recipe-icon.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AccountAccessService} from '../../services/account-access.service';

@Component({
  selector: 'app-header-profile',
    imports: [
      RouterLink,
      AsyncPipe,
      HeartIconComponent,
      ProfileIconComponent,
      RecipeIconComponent,
      RouterLinkActive
    ],
  templateUrl: './header-profile.component.html',
  styleUrl: './header-profile.component.scss'
})
export class HeaderProfileComponent {
  accountAccess: AccountAccessService = inject(AccountAccessService);
  userLoggedIn = this.accountAccess.isLoggedIn();
}
