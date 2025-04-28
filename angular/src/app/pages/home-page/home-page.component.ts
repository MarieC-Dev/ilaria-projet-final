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
  /* videos = [
    {
      id: this.index++,
      link: 'U3dWg3A7IcA?si=SF3svYv6tfWMldYm',
    }, {
      id: this.index++,
      link: 'Fm3iH1PPgMw?si=ZOwWoOUGllt4Ryt6',
    }, {
      id: this.index++,
      link: 'Uwm72U1zGUU?si=fT5iK20yC8ETHx0C',
    }, {
      id: this.index++,
      link: '8y2XtISJOCM?si=bC14nyiv-Cg6O1yW',
    }, {
      id: this.index++,
      link: 'uq-QTUCuspU?si=WDDwj6wwwclgLXfO',
    }, {
      id: this.index++,
      link: 'Oetn61s9sXU?si=AprDZ6srTiXyY8_n',
    }, {
      id: this.index++,
      link: 'aIQSInpPLA8?si=r55fwrzOUQTI5O6r',
    }, {
      id: this.index++,
      link: '-8t0qYTovKM?si=HfKMGpUNjFFEki2J',
    }, 
  ]; */
  
  getRecipeAverage(id: number) {
    return this.recipeAverage.getRecipeAverage(id, this.recipesList());
  }

}
