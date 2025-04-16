import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MyfavoritesMyrecipesComponent } from "../../components/sections/myfavorites-myrecipes/myfavorites-myrecipes.component";
import { RECIPE_LIST } from '../../lists/recipe-list.fake';

@Component({
  selector: 'app-profile-favorites-page',
  imports: [RouterLink, RouterLinkActive, MyfavoritesMyrecipesComponent],
  templateUrl: './profile-favorites-page.component.html',
  styleUrl: './profile-favorites-page.component.scss'
})
export class ProfileFavoritesPageComponent {
  favoritesList = signal(RECIPE_LIST);

}
