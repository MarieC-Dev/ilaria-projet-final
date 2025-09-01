import {Component, inject} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MyfavoritesMyrecipesComponent } from "../../components/myfavorites-myrecipes/myfavorites-myrecipes.component";
import { ProfileIconComponent } from '../../components/icons/profile-icon/profile-icon.component';
import { HeartIconComponent } from '../../components/icons/heart-icon/heart-icon.component';
import { RecipeIconComponent } from '../../components/icons/recipe-icon/recipe-icon.component';
import {IsLoggedInService} from '../../services/isLoggedIn.service';
import {AsyncPipe} from '@angular/common';
import {HeaderProfileComponent} from '../../layout/header-profile/header-profile.component';

@Component({
  selector: 'app-profile-recipes-page',
  imports: [
    MyfavoritesMyrecipesComponent,
    HeaderProfileComponent
  ],
  templateUrl: './profile-recipes-page.component.html',
  styleUrl: './profile-recipes-page.component.scss'
})
export class ProfileRecipesPageComponent {
}
