import { Component, inject, signal } from '@angular/core';
import { PageSliderComponent } from '../../components/page-slider/page-slider.component';
import { RecipesFilterComponent } from '../../components/recipes-filter/recipes-filter.component';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { SearchIconComponent } from "../../components/icons/search-icon/search-icon.component";

@Component({
  selector: 'app-home-page',
  imports: [PageSliderComponent, RecipesFilterComponent, RecipeItemComponent, SearchIconComponent],
  templateUrl: './home-page.component.html',
  styleUrl: '../../../styles.scss'
})
export class HomePageComponent {
  recipesList = signal(RECIPE_LIST);
  recipeAverage = inject(RecipeAverageService);
  
  getRecipeAverage(id: number) {
    return this.recipeAverage.getRecipeAverage(id, this.recipesList());
  }

}
