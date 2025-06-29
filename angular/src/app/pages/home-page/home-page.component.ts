import {Component, inject, OnInit, signal} from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

import { PageSliderComponent } from '../../components/page-slider/page-slider.component';
import { RecipesFilterComponent } from '../../components/recipes-filter/recipes-filter.component';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { SearchIconComponent } from "../../components/icons/search-icon/search-icon.component";
import { SortBySelectComponent } from "../../components/sort-by-select/sort-by-select.component";
import { VideosSliderDirective } from '../../directives/videos-slider.directive';
import { PlayIconComponent } from "../../components/icons/play-icon/play-icon.component";
import {RecipesApiService} from '../../services/recipes-api.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    PageSliderComponent,
    RecipesFilterComponent,
    RecipeItemComponent,
    SearchIconComponent,
    SortBySelectComponent,
    VideosSliderDirective,
    YouTubePlayer,
    PlayIconComponent,
    JsonPipe
],
  templateUrl: './home-page.component.html',
  styleUrl: '../../../styles.scss'
})
export class HomePageComponent implements OnInit {
  recipesList = signal(RECIPE_LIST);
  getAllRecipes: any[] = [];
  recipeAverage = inject(RecipeAverageService);

  index: number = 0;

  constructor(private recipeApi: RecipesApiService) {
  }

  ngOnInit(): void {
    this.recipeApi.getAllRecipes().subscribe({
      next: (result) => this.getAllRecipes = result,
      error: (err) => console.log(err),
    });
  }

  getRecipeAverage(id: number) {
    return this.recipeAverage.getRecipeAverage(id, this.recipesList());
  }

}
