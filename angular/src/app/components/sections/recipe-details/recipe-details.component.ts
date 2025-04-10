import { Component, input } from '@angular/core';

@Component({
  selector: 'app-recipe-details',
  imports: [],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent {
  recipeSteps = input<Array<any>>();
}
