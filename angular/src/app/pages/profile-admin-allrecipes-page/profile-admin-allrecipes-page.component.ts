import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {DeleteIconComponent} from '../../components/icons/delete-icon/delete-icon.component';
import {HeaderProfileComponent} from '../../layout/header-profile/header-profile.component';
import {PopUpComponent} from '../../components/pop-up/pop-up.component';
import {NgIf} from '@angular/common';
import {RecipeItemComponent} from '../../components/recipe-item/recipe-item.component';
import {RecipeAverageService} from '../../services/recipe-average.service';
import {RecipesApiService} from '../../services/recipes-api.service';
import {UsersApiService} from '../../services/users-api.service';
import {FavoriteApiService} from '../../services/favorite-api.service';
import {IsLoggedInService} from '../../services/isLoggedIn.service';
import {CommentApiService} from '../../services/comment-api.service';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-profile-admin-allrecipes-page',
  imports: [
    DeleteIconComponent,
    HeaderProfileComponent,
    PopUpComponent,
    NgIf,
    RecipeItemComponent
  ],
  templateUrl: './profile-admin-allrecipes-page.component.html',
  styleUrl: './profile-admin-allrecipes-page.component.scss'
})
export class ProfileAdminAllrecipesPageComponent implements OnInit {
  getAllRecipes = signal<any[]>([]);
  getAllUsers: any[] = [];
  getAllComments!: any[];
  userLoggedInData!: any;
  recipeAverage = inject(RecipeAverageService);

  showPopUp = signal(false);
  selectedRecipeIdToDelete = signal<number>(-1);

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
        this.getAllRecipes.set(result);
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
    });
  }

  getUser(): any[] {
    return this.getAllRecipes().map((recipe) =>
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

  showPopUpTrue(id: number) {
    this.showPopUp.set(true);
    this.selectedRecipeIdToDelete.set(id);
    console.log(this.selectedRecipeIdToDelete())
    return this.showPopUp();
  }

  showPopUpFalse() {
    this.showPopUp.set(false);
    return this.showPopUp;
  }

  deleteRecipe(id: number): any {
    console.log()
    return this.recipeApi.deteteRecipe(id).subscribe((result) => {
      this.getAllRecipes.update(recipes =>
        recipes.filter(recipe => recipe.id !== id)
      );
      console.log('Front Recipe has been deleted', result);
    });
  }

  getNumberOfComments(recipeId: number) {
    const recipeComment = this.getAllComments.filter((comment) => comment.recipeId === recipeId)
    return recipeComment.length;
  }

  getRecipeAverage(recipeId: number) {
    const recipeComment = this.getAllComments.filter((comment) => comment.recipeId === recipeId)
    return this.recipeAverage.getRecipeAverage(recipeId, recipeComment);
  }
}
