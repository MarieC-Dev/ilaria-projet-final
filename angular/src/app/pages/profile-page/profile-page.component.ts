import { Component, inject, signal } from '@angular/core';
import { FormInputComponent } from "../../components/form-components/form-input/form-input.component";
import { RecipeItemComponent } from "../../components/recipe-item/recipe-item.component";
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeAverageService } from '../../services/recipe-average.service';

@Component({
  selector: 'app-profile-page',
  imports: [FormInputComponent, RecipeItemComponent],
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
