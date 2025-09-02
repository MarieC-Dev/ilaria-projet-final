import { Component, OnInit, computed, signal } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

import { RecipesFilterComponent } from '../../components/recipes-filter/recipes-filter.component';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { SearchIconComponent } from "../../components/icons/search-icon/search-icon.component";
import { SortBySelectComponent } from "../../components/sort-by-select/sort-by-select.component";
import { VideosSliderDirective } from '../../directives/videos-slider.directive';
import { PlayIconComponent } from "../../components/icons/play-icon/play-icon.component";
import { RecipesApiService } from '../../services/recipes-api.service';
import { JsonPipe } from '@angular/common';
import { UsersApiService } from '../../services/users-api.service';
import { FavoriteApiService } from '../../services/favorite-api.service';
import { switchMap } from 'rxjs';
import { CommentApiService } from '../../services/comment-api.service';
import { IsLoggedInService } from '../../services/isLoggedIn.service';
import { SlugifyForRoutageService } from '../../services/slugify-for-routage.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RecipesFilterComponent,
    RecipeItemComponent,
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
  getAllRecipes: any[] = [];
  getAllUsers: any[] = [];
  userLoggedInData!: any;

  favorites = signal<any[]>([]);

  favoritesMap = computed(() => {
    const map: { [recipeId: number]: boolean } = {};
    this.favorites().forEach(fav => {
      if (fav.userId === this.userLoggedInData?.id) {
        map[fav.recipeId] = true;
      }
    });
    return map;
  });

  constructor(
    private recipeApi: RecipesApiService,
    private userApi: UsersApiService,
    private favoriteApi: FavoriteApiService,
    private userLoggedIn: IsLoggedInService,
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

    this.userLoggedIn.isLoggedIn().pipe(
      switchMap((res1) => {
        this.userLoggedInData = res1.user;
        return this.favoriteApi.getAllFavorites();
      }),
    ).subscribe({
      next: (res3) => {
        this.favorites.set(res3.rows);
      },
      error: (err) => console.log(err),
    });
  }

  getUser(): any[] {
    return this.getAllRecipes.map((recipe) =>
      this.getAllUsers.find((user) => user.id === recipe.authorId)
    );
  }

  addFavorite(recipeId: number): void {
    const favoriteData = {
      userId: this.userLoggedInData.id,
      recipeId: recipeId
    };

    this.favoriteApi.addFavorite(favoriteData).subscribe({
      next: (result) => {
        this.favorites.update(current => [...current, result.rows]);
      },
      error: (err) => {
        console.error('POST favorite error', err);
      }
    });
  }

  deleteFavorite(recipeId: number): void {
    const fav = this.favorites().find(
      (f) =>
        f.userId === this.userLoggedInData.id &&
        f.recipeId === recipeId
    );

    if (!fav) return;

    this.favoriteApi.deleteFavorite(fav.id).subscribe({
      next: () => {
        this.favorites.update(current => current.filter(f => f.id !== fav.id));
      },
      error: (err) => {
        console.error('DELETE favorite error', err);
      }
    });
  }
}
