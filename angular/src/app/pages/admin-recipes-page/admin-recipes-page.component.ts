import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileIconComponent } from "../../components/icons/profile-icon/profile-icon.component";
import { HeartIconComponent } from "../../components/icons/heart-icon/heart-icon.component";
import { RecipeIconComponent } from "../../components/icons/recipe-icon/recipe-icon.component";
import { MyfavoritesMyrecipesComponent } from "../../components/sections/myfavorites-myrecipes/myfavorites-myrecipes.component";

@Component({
  selector: 'app-admin-recipes-page',
  imports: [RouterModule, ProfileIconComponent, HeartIconComponent, RecipeIconComponent, MyfavoritesMyrecipesComponent],
  templateUrl: './admin-recipes-page.component.html',
  styleUrl: './admin-recipes-page.component.scss'
})
export class AdminRecipesPageComponent {

}
