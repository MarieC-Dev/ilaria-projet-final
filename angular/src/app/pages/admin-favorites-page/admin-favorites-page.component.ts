import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileIconComponent } from "../../components/icons/profile-icon/profile-icon.component";
import { HeartIconComponent } from "../../components/icons/heart-icon/heart-icon.component";
import { RecipeIconComponent } from "../../components/icons/recipe-icon/recipe-icon.component";
import { MyfavoritesMyrecipesComponent } from "../../components/myfavorites-myrecipes/myfavorites-myrecipes.component";
import { RECIPE_LIST } from '../../lists/recipe-list.fake';

@Component({
  selector: 'app-admin-favorites-page',
  imports: [RouterModule, ProfileIconComponent, HeartIconComponent, RecipeIconComponent, MyfavoritesMyrecipesComponent],
  templateUrl: './admin-favorites-page.component.html',
  styleUrl: './admin-favorites-page.component.scss'
})
export class AdminFavoritesPageComponent {
  favoritesList = signal(RECIPE_LIST);
}
