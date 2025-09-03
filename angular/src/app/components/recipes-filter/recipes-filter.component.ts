import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RECIPES_FILTER } from '../../lists/recipes-filter-list';
import { ShowRecipesFilterDirective } from '../../directives/show-recipes-filter.directive';
import { ChevronDownIconComponent } from "../icons/chevron-down-icon/chevron-down-icon.component";

@Component({
  selector: 'app-recipes-filter',
  standalone: true,
  imports: [ShowRecipesFilterDirective, ChevronDownIconComponent],
  templateUrl: './recipes-filter.component.html',
  styleUrl: '../../../styles.scss'
})
export class RecipesFilterComponent {
  recipesFilter = signal(RECIPES_FILTER);

  selectedFilters: {
    cuisine: string[];
    difficulty: string[];
    cooking: string[];
  } = {
    cuisine: [],
    difficulty: [],
    cooking: []
  };

  @Output() filtersChanged = new EventEmitter<typeof this.selectedFilters>();

  onCheckboxChange(type: 'cuisine' | 'difficulty' | 'cooking', value: string) {
    const current = this.selectedFilters[type];

    if (current[0] === value) {
      this.selectedFilters[type] = [];
    } else {
      this.selectedFilters[type] = [value];
    }

    this.filtersChanged.emit(this.selectedFilters);
  }

  getFilterKey(index: number): 'cuisine' | 'difficulty' | 'cooking' {
    if (index === 0) return 'cuisine';
    if (index === 1) return 'difficulty';
    return 'cooking';
  }
}
