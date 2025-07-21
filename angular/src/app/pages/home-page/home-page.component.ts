import {Component, inject, OnInit, signal} from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

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
import {UsersApiService} from '../../services/users-api.service';
import {FavoriteApiService} from '../../services/favorite-api.service';

@Component({
  selector: 'app-home-page',
  imports: [
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
  getAllUsers: any[] = [];
  recipeAverage = inject(RecipeAverageService);

  constructor(
    private recipeApi: RecipesApiService,
    private userApi: UsersApiService,
  ) { }

  ngOnInit(): void {
    this.recipeApi.getAllRecipes().subscribe({
      next: (result) => {
        this.getAllRecipes = result;
      },
      error: (err) => console.log(err),
    });

    this.userApi.getAllUsers().subscribe({
      next: (result) => this.getAllUsers = result,
      error: (err) => console.log(err),
    });
  }

  getUser() {
    let array: any[] = [];
    this.getAllRecipes.map((recipe) => {
      const find = this.getAllUsers.find((user) => user.id === recipe.authorId);
      array.push(find);
    })
    return array;
  }

  /*
    getRecipeComments(recipeId: number) {
    const recipeComments = this.recipesComments.filter((comment) => comment.recipeId === recipeId);
    return recipeComments;
  }

  getAverage(recipeId: number) {
    const recipeComments = this.recipesComments.filter((comment) => comment.recipeId === recipeId);
    return this.average.getRecipeAverage(recipeId, this.getRecipeComments(recipeId));
  }
  * */

}
