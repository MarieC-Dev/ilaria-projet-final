import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { RecipeStepComponent } from '../../recipe-step/recipe-step.component';
import { RecipeCommentComponent } from '../../recipe-comment/recipe-comment.component';
import { SocialNetworksComponent } from '../../social-networks/social-networks.component';
import { Ingredient, RecipeComment, RecipeStep, RecipeTag } from '../../../models/recipe.model';
import { RecipeAverageService } from '../../../services/recipe-average.service';
import { RECIPE_LIST } from '../../../lists/recipe-list.fake';
import { commonSocial } from '../../../lists/social-networks-list';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  imports: [
    RecipeStepComponent,
    RecipeCommentComponent,
    SocialNetworksComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent {
  recipeAverage = inject(RecipeAverageService);
  recipesList = signal(RECIPE_LIST);
  recipe = this.recipesList()[0];

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

  getAverage(id: number) {
    this.recipeAverage.getRecipeAverage(id, this.recipesList());
  }
}
