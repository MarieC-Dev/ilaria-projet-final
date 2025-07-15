import { CommonModule, JsonPipe } from '@angular/common';
import {Component, inject, input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-myfavorites-myrecipes',
  imports: [
    CommonModule,
    RecipeItemComponent,
    ModifyIconComponent,
    DeleteIconComponent,
    RouterLink
  ],
  templateUrl: './myfavorites-myrecipes.component.html',
  styleUrl: './myfavorites-myrecipes.component.scss'
})
export class MyfavoritesMyrecipesComponent implements OnInit {
  title = input.required<string>();
  isFavorites = input.required<boolean>();
  favoritesArray = input<RecipeList>([]);
  isRecipes = input.required<boolean>();
  recipesArray = input<Array<any>>([]);

  userId!: number;
  userData!: any[];
  username: string = '';
  favoritesList!: any[];
  recipesListApi: any[] = [];
  recipesComments!: any[];
  average = inject(RecipeAverageService);

  constructor(
    private route: ActivatedRoute,
    private favoriteApi: FavoriteApiService,
    private recipeApi: RecipesApiService,
    private commentApi: CommentApiService,
    private userApi: UsersApiService) {
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.favoriteApi.getAllFavorites().subscribe({
      next: (result) => {
        const userFavorites = result.rows.filter((favorite: any) => favorite.userId === this.userId);
        this.favoritesList = userFavorites
      },
      error: (err) => console.log('get favotites list error ' + err)
    });

    this.recipeApi.getAllRecipes().pipe(
      switchMap((recipe) => {
        this.recipesListApi = recipe;
        return this.commentApi.getAllComments();
      })
    ).subscribe((comment) => {
      this.recipesComments = comment.rows;
    })

    this.userApi.getOneUser(this.userId).subscribe({
      next: (result) => {
        this.userData = result.profile[0];
        this.username = result.profile[0].username;
      },
      error: (err) => console.log('get user data error ' + err)
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

  getUserRecipes() {
    const userRecipes: any = [];

    this.recipesListApi.map((recipe) => {
      if(this.userId === recipe.authorId) {
        userRecipes.push(recipe);
      }
    });

    return userRecipes;
  }

  deleteUserRecipe(id: number) {
    this.recipeApi.deteteRecipe(id).subscribe({
      next: (result) => {
        const resultId = this.recipesListApi.findIndex((recipe) => recipe.id === id);
        this.recipesListApi.splice(resultId, 1);
        console.log('Front Recipe has been deleted', result)
      },
      error: (err) => console.log('Front delete recipe error : ', err)
    })
  }

  getRecipeComments(recipeId: number) {
    const recipeComments = this.recipesComments.filter((comment) => comment.recipeId === recipeId);
    return recipeComments;
  }

  getAverage(recipeId: number) {
    const recipeComments = this.recipesComments.filter((comment) => comment.recipeId === recipeId);
    return this.average.getRecipeAverage(recipeId, this.getRecipeComments(recipeId));
  }



}
