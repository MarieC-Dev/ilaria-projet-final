import {Component, computed, inject, OnInit, signal} from '@angular/core';
import { SearchFormComponent } from "../../components/search-form/search-form.component";
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { PageSliderComponent } from "../../components/page-slider/page-slider.component";
import {RecipesApiService} from '../../services/recipes-api.service';
import {UsersApiService} from '../../services/users-api.service';
import {FavoriteApiService} from '../../services/favorite-api.service';
import {IsLoggedInService} from '../../services/isLoggedIn.service';
import {CommentApiService} from '../../services/comment-api.service';
import {switchMap} from 'rxjs';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [SearchFormComponent, RecipeItemComponent, PageSliderComponent, NgIf],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit {
  getAllRecipes: any[] = [];
  getAllUsers: any[] = [];
  getAllComments!: any[];
  userLoggedInData!: any;
  recipeAverage = inject(RecipeAverageService);

  error: string | null = null;

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
    private commentApi: CommentApiService
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

    this.commentApi.getAllComments().subscribe((result) => {
      this.getAllComments = result.rows;
    })
  }

  onSearch(name: string): void {
    this.error = null;
    const searchTerm = name.trim().toLowerCase();

    this.recipeApi.getAllRecipes().subscribe({
      next: (recipes) => {
        this.getAllRecipes = recipes.filter(recipe =>
          recipe.name.toLowerCase().includes(searchTerm)
        );

        if (this.getAllRecipes.length === 0) {
          this.error = 'Aucun résultat trouvé';
        }
      },
      error: () => {
        this.error = 'Erreur lors de la recherche';
        this.getAllRecipes = [];
      }
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

  getNumberOfComments(recipeId: number) {
    const recipeComment = this.getAllComments.filter((comment) => comment.recipeId === recipeId)
    return recipeComment.length
  }

  getRecipeAverage(recipeId: number) {
    const recipeComment = this.getAllComments.filter((comment) => comment.recipeId === recipeId)
    return this.recipeAverage.getRecipeAverage(recipeId, recipeComment);
  }
}
