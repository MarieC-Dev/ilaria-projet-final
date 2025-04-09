import { Component, signal, inject } from '@angular/core';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { CommonModule, JsonPipe } from '@angular/common';
import { RecipeItemTimeComponent } from '../../components/recipe-item-time/recipe-item-time.component';
import { RecipeStepComponent } from '../../components/recipe-step/recipe-step.component';
import { RecipeCommentComponent } from '../../components/recipe-comment/recipe-comment.component';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { commonSocial } from '../../lists/social-networks-list';
import { RecipePresentationComponent } from '../../components/sections/recipe-presentation/recipe-presentation.component';

@Component({
  selector: 'app-recipe-detail-page',
  imports: [
    RecipePresentationComponent,
    RecipeItemTimeComponent, 
    RecipeStepComponent, 
    RecipeCommentComponent,
    RecipeItemComponent,
    SocialNetworksComponent,
    CommonModule
  ],
  templateUrl: './recipe-detail-page.component.html',
  styleUrl: './recipe-detail-page.component.scss'
})
export class RecipeDetailPageComponent {
  recipesList = signal(RECIPE_LIST);
  recipe = this.recipesList()[0];
  othersRecipes = this.recipesList();
  recipeAverage = inject(RecipeAverageService);
  socialNetworksList = signal(commonSocial);

  getNumberStep(id: number) {   
    const filterById = this.recipe.steps.filter((step: any) => step.id === id);
    return filterById[0].id + 1;
  }

  getQuantityIngredient(id: number) {
    const filterById = this.recipe.ingredientsList.filter((ingr: any) => ingr.id === id);

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

  getOtherRecipesList() {   
    const array = [];

    for (let i = 0; i <= 8; i++) {
      const element = this.othersRecipes[i];
      array.push(element);
    }
    
    array.splice(this.recipe.id, 1);
    return array;
  }
}
