import { CommonModule, JsonPipe } from '@angular/common';
import {Component, computed, inject, input, OnInit, signal} from '@angular/core';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { RecipeList } from '../../models/recipe.model';
import { ModifyIconComponent } from "../icons/modify-icon/modify-icon.component";
import { DeleteIconComponent } from "../icons/delete-icon/delete-icon.component";
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FavoriteApiService} from '../../services/favorite-api.service';
import {RecipesApiService} from '../../services/recipes-api.service';
import {UsersApiService} from '../../services/users-api.service';
import {CommentApiService} from '../../services/comment-api.service';
import {switchMap} from 'rxjs';
import {PopUpComponent} from '../pop-up/pop-up.component';
import {SlugifyForRoutageService} from '../../services/slugify-for-routage.service';
import {IsLoggedInService} from '../../services/isLoggedIn.service';

@Component({
  selector: 'app-myfavorites-myrecipes',
  imports: [
    CommonModule,
    RecipeItemComponent,
    ModifyIconComponent,
    DeleteIconComponent,
    RouterLink,
    PopUpComponent
  ],
  templateUrl: './myfavorites-myrecipes.component.html',
  styleUrl: './myfavorites-myrecipes.component.scss'
})
export class MyfavoritesMyrecipesComponent implements OnInit {
  title = input.required<string>();
  isFavorites = input.required<boolean>();
  favoritesArray = input<RecipeList>([]);
  isRecipes = input.required<boolean>();
  showPopUp = signal(false);
  userRecipes = signal<any[]>([]);
  selectedRecipeIdToDelete = signal(-1);
  recipeAverage = inject(RecipeAverageService);

  userId!: number;
  userData!: any[];
  username: string = '';
  favoritesList!: any[];
  recipesListApi: any[] = [];
  recipesComments!: any[];
  average = inject(RecipeAverageService);
  userLoggedInData!: any;
  getAllComments!: any[];

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
    private route: ActivatedRoute,
    private favoriteApi: FavoriteApiService,
    private recipeApi: RecipesApiService,
    private commentApi: CommentApiService,
    private userApi: UsersApiService,
    private userLoggedIn: IsLoggedInService,
    protected slugify: SlugifyForRoutageService) {
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

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

    this.userApi.getOneUser(this.userId).pipe(
      switchMap((user) => {
        this.userData = user.profile[0];
        this.username = user.profile[0].username;

        return this.favoriteApi.getAllFavorites();
      })
    ).subscribe({
      next: (result) => {
        const userFavorites = result.rows.filter((favorite: any) => favorite.userId === this.userId);
        this.favoritesList = userFavorites;

        const favoriteRecipes: any[] = [];
        const favoriteIds = this.favoritesList.filter((item) => item.userId === this.userId);

        favoriteIds.map((fav) => {
          const recipes = this.recipesListApi.filter((recipe) => recipe.id === fav.recipeId);
          favoriteRecipes.push(recipes);
        });
        this.favoritesList = favoriteIds;
        console.log(this.favoritesList);
      },
      error: (err) => console.log('get favotites list error ' + err)
    });

    this.recipeApi.getAllRecipes().pipe(
      switchMap((allRecipe) => {
        this.recipesListApi = allRecipe;
        const userRecipeArray: any[] = [];
        this.recipesListApi.map((recipe) => {
          if(this.userId === recipe.authorId) {
            userRecipeArray.push(recipe);
          }
        });
        this.userRecipes.set(userRecipeArray);
        return this.commentApi.getAllComments();
      })
    ).subscribe((comment) => {
      this.recipesComments = comment.rows;
    })

    this.commentApi.getAllComments().subscribe((result) => {
      this.getAllComments = result.rows;
    })
  }

  getUserFavorites() {
    const favoriteRecipes: any[] = [];
    const favoriteIds = this.favoritesList.filter((item) => item.userId === this.userId);

    favoriteIds.map((fav) => {
      const recipes = this.recipesListApi.filter((recipe) => recipe.id === fav.recipeId);
      favoriteRecipes.push(recipes);
    });

    return favoriteRecipes.flat();
  }

  deleteUserRecipe(id: number): any {
    return this.recipeApi.deteteRecipe(id).subscribe((result) => {
      this.userRecipes.update(recipes =>
        recipes.filter(recipe => recipe.id !== id)
      );
      console.log('Front Recipe has been deleted', result);
    });
  }

  showPopUpTrue(id: number) {
    this.showPopUp.set(true);
    this.selectedRecipeIdToDelete.set(id);
    return this.showPopUp();
  }

  showPopUpFalse() {
    this.showPopUp.set(false);
    return this.showPopUp();
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
