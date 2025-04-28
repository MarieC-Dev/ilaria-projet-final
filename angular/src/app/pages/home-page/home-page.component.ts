import { Component, inject, signal } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

import { PageSliderComponent } from '../../components/page-slider/page-slider.component';
import { RecipesFilterComponent } from '../../components/recipes-filter/recipes-filter.component';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { SearchIconComponent } from "../../components/icons/search-icon/search-icon.component";
import { SearchFormComponent } from "../../components/search-form/search-form.component";
import { SortBySelectComponent } from "../../components/sort-by-select/sort-by-select.component";
import { ChevronDownIconComponent } from "../../components/icons/chevron-down-icon/chevron-down-icon.component";
import { JsonPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { VideosSliderDirective } from '../../directives/videos-slider.directive';
import { PlayIconComponent } from "../../components/icons/play-icon/play-icon.component";

@Component({
  selector: 'app-home-page',
  imports: [
    PageSliderComponent,
    RecipesFilterComponent,
    RecipeItemComponent,
    SearchIconComponent,
    SortBySelectComponent,
    ChevronDownIconComponent,
    VideosSliderDirective,
    YouTubePlayer,
    JsonPipe,
    PlayIconComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: '../../../styles.scss'
})
export class HomePageComponent {
  recipesList = signal(RECIPE_LIST);
  recipeAverage = inject(RecipeAverageService);
  private sanitizer = inject(DomSanitizer);

  youtubeUrl!: string;
  videosUrl!: SafeResourceUrl;

  index: number = 0;
  
  getRecipeAverage(id: number) {
    return this.recipeAverage.getRecipeAverage(id, this.recipesList());
  }

}
