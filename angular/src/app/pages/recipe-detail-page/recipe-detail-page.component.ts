import { Component, signal } from '@angular/core';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { JsonPipe } from '@angular/common';
import { RecipeItemTimeComponent } from '../../components/recipe-item-time/recipe-item-time.component';


@Component({
  selector: 'app-recipe-detail-page',
  imports: [JsonPipe, RecipeItemTimeComponent],
  templateUrl: './recipe-detail-page.component.html',
  styleUrl: './recipe-detail-page.component.scss'
})
export class RecipeDetailPageComponent {
  recipeList = signal(RECIPE_LIST);
  recipe = this.recipeList()[0];
}
