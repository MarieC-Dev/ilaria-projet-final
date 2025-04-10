import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { RecipeStepComponent } from '../../recipe-step/recipe-step.component';
import { RecipeCommentComponent } from '../../recipe-comment/recipe-comment.component';
import { SocialNetworksComponent } from '../../social-networks/social-networks.component';
import { Ingredient, RecipeComment, RecipeStep, RecipeTag } from '../../../models/recipe.model';
import { RecipeAverageService } from '../../../services/recipe-average.service';
import { RECIPE_LIST } from '../../../lists/recipe-list.fake';
import { User } from '../../../models/user.model';
import { commonSocial } from '../../../lists/social-networks-list';

@Component({
  selector: 'app-recipe-details',
  imports: [RecipeStepComponent, RecipeCommentComponent, SocialNetworksComponent],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent {
  recipeAverage = inject(RecipeAverageService);
  recipesList = signal(RECIPE_LIST);
  
  recipeSteps = input.required<RecipeStep[]>();

  recipeOpinions = input<RecipeComment[]>();
  recipeAuthorName = input.required<string>();

  recipeIngredientsList = input.required<Ingredient[]>();

  recipeTags = input.required<RecipeTag[]>();

  socialNetworksList = signal(commonSocial);

  getNumberStep(id: number, steps: RecipeStep[]) {

    const filterById = steps.filter((step: any) => step.id === id);
    return filterById[0].id + 1;
  }

  getQuantityIngredient(id: number, ingredients: Ingredient[]) {
    const filterById = ingredients.filter((ingr: any) => ingr.id === id);

    if(filterById[0].quantity === 0 || '') {
      return;
    } else {
      return filterById[0].quantity;
    }
  }

  getClassComment(recipeAuthorName: InputSignal<string>, answerAuthorName?: string) {
    const authorName: string = recipeAuthorName.toString();

    if(answerAuthorName) { // [answer] existe -> ANSWER
      if(authorName !== answerAuthorName) { // ANSWER user
        return 'recipeComment isAnswer userAnswer';
      } else { // ANSWER author
        return 'recipeComment isAnswer authorAnswer';
      }
    } else { // COMMENT
      return 'recipeComment';
    }
  }

  getAverage(id: number) {
    this.recipeAverage.getRecipeAverage(id, this.recipesList());
  }
}
