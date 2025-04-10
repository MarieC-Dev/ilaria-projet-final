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
import { RecipeDetailsComponent } from '../../components/sections/recipe-details/recipe-details.component';

@Component({
  selector: 'app-recipe-details-page',
  imports: [
    RecipePresentationComponent,
    RecipeDetailsComponent,
    RecipeItemTimeComponent, 
    RecipeStepComponent, 
    RecipeCommentComponent,
    RecipeItemComponent,
    SocialNetworksComponent,
    CommonModule
  ],
  templateUrl: './recipe-details-page.component.html',
  styleUrl: './recipe-details-page.component.scss'
})
export class RecipeDetailsPage {
  recipesList = signal(RECIPE_LIST);
  recipe = this.recipesList()[0];
  othersRecipes = this.recipesList();
  recipeAverage = inject(RecipeAverageService);
  socialNetworksList = signal(commonSocial);

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
