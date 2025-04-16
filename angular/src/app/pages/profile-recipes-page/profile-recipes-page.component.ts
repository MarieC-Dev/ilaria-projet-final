import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MyfavoritesMyrecipesComponent } from "../../components/sections/myfavorites-myrecipes/myfavorites-myrecipes.component";

@Component({
  selector: 'app-profile-recipes-page',
  imports: [RouterLink, RouterLinkActive, MyfavoritesMyrecipesComponent],
  templateUrl: './profile-recipes-page.component.html',
  styleUrl: './profile-recipes-page.component.scss'
})
export class ProfileRecipesPageComponent {

}
