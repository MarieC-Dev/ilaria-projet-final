import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { CommonModule, JsonPipe } from '@angular/common';
import { RecipeItemTimeComponent } from '../../components/recipe-item-time/recipe-item-time.component';
import { RecipeStepComponent } from '../../components/recipe-step/recipe-step.component';
import { RecipeCommentComponent } from '../../components/recipe-comment/recipe-comment.component';
import { ShowCommentAnswersDirective } from '../../directives/show-comment-answers.directive';


@Component({
  selector: 'app-recipe-detail-page',
  imports: [
    RecipeItemTimeComponent, 
    RecipeStepComponent, 
    RecipeCommentComponent, 
    ShowCommentAnswersDirective,
    CommonModule
  ],
  templateUrl: './recipe-detail-page.component.html',
  styleUrl: './recipe-detail-page.component.scss'
})
export class RecipeDetailPageComponent {
  recipeList = signal(RECIPE_LIST);
  recipe = this.recipeList()[0];

  /* ngAfterViewInit() {
    console.log('---> Component ngAfterViewInit');
    
    this.showCommentAnswersDirective.getHeight();
    this.showCommentAnswersDirective.setHeight();
  } */

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
