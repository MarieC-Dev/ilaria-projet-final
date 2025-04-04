import { Component, signal } from '@angular/core';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { JsonPipe } from '@angular/common';
import { RecipeItemTimeComponent } from '../../components/recipe-item-time/recipe-item-time.component';
import { RecipeStepComponent } from '../../components/recipe-step/recipe-step.component';
import { RecipeCommentComponent } from '../../components/recipe-comment/recipe-comment.component';


@Component({
  selector: 'app-recipe-detail-page',
  imports: [RecipeItemTimeComponent, RecipeStepComponent, RecipeCommentComponent, JsonPipe],
  templateUrl: './recipe-detail-page.component.html',
  styleUrl: './recipe-detail-page.component.scss'
})
export class RecipeDetailPageComponent {
  recipeList = signal(RECIPE_LIST);
  recipe = this.recipeList()[0];

  getNumberStep(id: number) {
    const filterById = this.recipe.steps.filter((step) => step.id === id);
    return filterById[0].id + 1;
  }

  getQuantityIngredient(id: number) {
    const filterById = this.recipe.ingredientsList.filter((ingr) => ingr.id === id);

    if(filterById[0].quantity === 0 || '') {
      return;
    } else {
      return filterById[0].quantity;
    }
  }

  getClassComment(recipeAuthorName: string, answerAuthorName?: string) {
    if(answerAuthorName) { // [answer] existe -> ANSWER
      if(recipeAuthorName !== answerAuthorName) { // ANSWER user
        return 'recipeComment isAnswer userAnswer';
      } else { // ANSWER author
        return 'recipeComment isAnswer authorAnswer';
      }
    } else { // COMMENT
      return 'recipeComment';
    }
  }

  /* Ajouter une classe si la 1er réponse est de l'auteur

    recipe.opinions.answer
  */
}
