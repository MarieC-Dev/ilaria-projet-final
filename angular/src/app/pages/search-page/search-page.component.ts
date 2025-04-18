import { Component, inject, signal } from '@angular/core';
import { SearchFormComponent } from "../../components/search-form/search-form.component";
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { PageSliderComponent } from "../../components/page-slider/page-slider.component";

@Component({
  selector: 'app-search-page',
  imports: [SearchFormComponent, RecipeItemComponent, PageSliderComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  recipesList = signal(RECIPE_LIST);
  averageService = inject(RecipeAverageService);

  getRecipeAverage(id: number) {
    return this.averageService.getRecipeAverage(id, this.recipesList());
  }
}
