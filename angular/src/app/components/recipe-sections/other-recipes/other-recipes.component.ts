import { Component, inject, input, signal } from '@angular/core';
import { RecipeItemComponent } from '../../recipe-item/recipe-item.component';
import { RECIPE_LIST } from '../../../lists/recipe-list.fake';
import { Recipe } from '../../../models/recipe.model';
import { JsonPipe } from '@angular/common';
import { RecipeAverageService } from '../../../services/recipe-average.service';

@Component({
  selector: 'app-other-recipes',
  imports: [RecipeItemComponent, JsonPipe],
  templateUrl: './other-recipes.component.html',
  styleUrl: './other-recipes.component.scss'
})
export class OtherRecipesComponent {
  recipeAverage = inject(RecipeAverageService);
  recipesList = signal(RECIPE_LIST);
  othersRecipes = this.recipesList();

  recipe = input.required<Recipe>();
  recipeId = input.required<number>();

  getOtherRecipesList() {
    const array = [];

    if(this.othersRecipes.length > 8) {
      for (let i = 0; i <= 8; i++) {
        array.push(this.othersRecipes[i]);
      }

      array.splice(this.recipeId(), 1);
      return array;
    } else {
      if(this.othersRecipes.length > 1) {
        for (let i = 0; i < this.othersRecipes.length; i++) {
          array.push(this.othersRecipes[i]);
        }

        array.splice(this.recipeId(), 1);
        return array;
      } else {
        return this.othersRecipes;
      }
    }
  }

  /*getAverage(id: number) {
    this.recipeAverage.getRecipeAverage(id, this.recipesList());
  }*/
}
