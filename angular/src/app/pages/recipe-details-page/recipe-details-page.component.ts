import { Component, signal, inject } from '@angular/core';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { CommonModule, JsonPipe } from '@angular/common';
import { RecipeItemTimeComponent } from '../../components/recipe-item-time/recipe-item-time.component';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { commonSocial } from '../../lists/social-networks-list';
import { RecipePresentationComponent } from '../../components/sections/recipe-presentation/recipe-presentation.component';
import { RecipeDetailsComponent } from '../../components/sections/recipe-details/recipe-details.component';
import { OtherRecipesComponent } from '../../components/sections/other-recipes/other-recipes.component';

@Component({
  selector: 'app-recipe-details-page',
  imports: [
    RecipePresentationComponent,
    RecipeDetailsComponent,
    RecipeItemTimeComponent,
    OtherRecipesComponent,
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
}
