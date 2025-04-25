import { Component, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-home-page',
  imports: [
    PageSliderComponent, 
    RecipesFilterComponent, 
    RecipeItemComponent, 
    SearchIconComponent, 
    SortBySelectComponent, 
    ChevronDownIconComponent,
    JsonPipe
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

  videos: Array<SafeUrl> = [
    'U3dWg3A7IcA?si=SF3svYv6tfWMldYm',
    'Fm3iH1PPgMw?si=ZOwWoOUGllt4Ryt6',
    'Uwm72U1zGUU?si=fT5iK20yC8ETHx0C',
    '-8t0qYTovKM?si=HfKMGpUNjFFEki2J'
  ];

  updateVideosUrl(id: SafeUrl): any {
    this.youtubeUrl = 'https://youtube.com/embed/' + id;
    return this.videosUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrl);
  }

  videosList() {
    const array: Array<any> = [];

    for (let i = 0; i < this.videos.length; i++) {
      array.push({
        id: i,
        link: this.updateVideosUrl(this.videos[i])
      });      
    }

    return array;
  }
  
  getRecipeAverage(id: number) {
    return this.recipeAverage.getRecipeAverage(id, this.recipesList());
  }

}
