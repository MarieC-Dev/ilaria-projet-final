import { Component, inject, signal } from '@angular/core';
import { FormInputComponent } from "../../components/form-components/form-input/form-input.component";
import { RecipeItemComponent } from "../../components/recipe-item/recipe-item.component";
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileIconComponent } from '../../components/icons/profile-icon/profile-icon.component';
import { HeartIconComponent } from '../../components/icons/heart-icon/heart-icon.component';
import { RecipeIconComponent } from '../../components/icons/recipe-icon/recipe-icon.component';

@Component({
  selector: 'app-profile-page',
  imports: [
    FormInputComponent, 
    RecipeItemComponent, 
    RouterLink, 
    RouterLinkActive,
    ProfileIconComponent,
    HeartIconComponent,
    RecipeIconComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  recipesList = signal(RECIPE_LIST);
  lastRecipe = this.recipesList().slice(-1)[0];
  recipeAverage = inject(RecipeAverageService);

  getRecipeAverage(id: number) {   
    return this.recipeAverage.getRecipeAverage(id, this.recipesList().slice(-1));
  }
}
