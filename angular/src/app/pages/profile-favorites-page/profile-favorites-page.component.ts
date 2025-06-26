import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MyfavoritesMyrecipesComponent } from "../../components/sections/myfavorites-myrecipes/myfavorites-myrecipes.component";
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { HeartIconComponent } from "../../components/icons/heart-icon/heart-icon.component";
import { ProfileIconComponent } from "../../components/icons/profile-icon/profile-icon.component";
import { RecipeIconComponent } from "../../components/icons/recipe-icon/recipe-icon.component";
import {HeaderProfileComponent} from '../../layout/header-profile/header-profile.component';

@Component({
  selector: 'app-profile-favorites-page',
  imports: [RouterLink, RouterLinkActive, MyfavoritesMyrecipesComponent, HeartIconComponent, ProfileIconComponent, RecipeIconComponent, HeaderProfileComponent],
  templateUrl: './profile-favorites-page.component.html',
  styleUrl: './profile-favorites-page.component.scss'
})
export class ProfileFavoritesPageComponent {
  favoritesList = signal(RECIPE_LIST);

}
