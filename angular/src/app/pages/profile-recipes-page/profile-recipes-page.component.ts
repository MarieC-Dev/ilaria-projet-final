import {Component, inject} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MyfavoritesMyrecipesComponent } from "../../components/sections/myfavorites-myrecipes/myfavorites-myrecipes.component";
import { ProfileIconComponent } from '../../components/icons/profile-icon/profile-icon.component';
import { HeartIconComponent } from '../../components/icons/heart-icon/heart-icon.component';
import { RecipeIconComponent } from '../../components/icons/recipe-icon/recipe-icon.component';
import {AccountAccessService} from '../../services/account-access.service';
import {AsyncPipe} from '@angular/common';
import {HeaderProfileComponent} from '../../layout/header-profile/header-profile.component';

@Component({
  selector: 'app-profile-recipes-page',
  imports: [
    RouterLink,
    RouterLinkActive,
    MyfavoritesMyrecipesComponent,
    ProfileIconComponent,
    HeartIconComponent,
    RecipeIconComponent,
    AsyncPipe,
    HeaderProfileComponent
  ],
  templateUrl: './profile-recipes-page.component.html',
  styleUrl: './profile-recipes-page.component.scss'
})
export class ProfileRecipesPageComponent {
  accountAccess: AccountAccessService = inject(AccountAccessService);
  userLoggedIn = this.accountAccess.isLoggedIn();
}
