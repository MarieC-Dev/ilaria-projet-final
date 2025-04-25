import { Component, model, signal, ViewChild } from '@angular/core';
import { RECIPES_FILTER } from '../../lists/recipes-filter-list';
import { ShowRecipesFilterDirective } from '../../directives/show-recipes-filter.directive';
import { ChevronDownIconComponent } from "../icons/chevron-down-icon/chevron-down-icon.component";

@Component({
  selector: 'app-recipes-filter',
  imports: [ShowRecipesFilterDirective, ChevronDownIconComponent],
  templateUrl: './recipes-filter.component.html',
  styleUrl: '../../../styles.scss'
})
export class RecipesFilterComponent {
  recipesFilter = signal(RECIPES_FILTER);
  
}
