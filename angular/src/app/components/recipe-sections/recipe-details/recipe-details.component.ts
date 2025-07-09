import {Component, Input, OnInit, signal} from '@angular/core';
import { RecipeStepComponent } from '../../recipe-step/recipe-step.component';
import { SocialNetworksComponent } from '../../social-networks/social-networks.component';
import { commonSocial } from '../../../lists/social-networks-list';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecipeCommentComponent } from '../../recipe-comment-component/recipe-comment.component';
import { IngredientsStepsApiService } from '../../../services/ingredients-steps-api.service';
import { RecipeDetailsService } from '../../../services/recipe-details.service';
import { CommentApiService } from '../../../services/comment-api.service';
import { UsersApiService } from '../../../services/users-api.service';
import { IsLoggedInService } from '../../../services/isLoggedIn.service';

@Component({
  selector: 'app-recipe-details',
  imports: [
    RecipeStepComponent,
    SocialNetworksComponent,
    CommonModule,
    RouterLink,
    RecipeCommentComponent
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipeId!: number;

  ingredientsList!: any[];
  ingredients!: any[];
  stepsList!: any[];
  steps!: any[];
  commentsList: any[] = [];
  usersList!: any[];
  userConnected!: any;

  socialNetworksList = signal(commonSocial);

  constructor(
    private ingredientsStepsApi: IngredientsStepsApiService,
    private commentApi: CommentApiService,
    private usersApi: UsersApiService,
    protected recipeDetailService: RecipeDetailsService,

    private isLoggedInApi: IsLoggedInService
  ) { }

  ngOnInit(): void {
    this.ingredientsStepsApi.getIngredientsList().subscribe({
      next: (result) => {
        this.ingredientsList = result.rows;
      },
      error: (err) => console.log(err)
    });

    this.ingredientsStepsApi.getAllIngredients().subscribe({
      next: (result) => {
        this.ingredients = result.rows;
      },
      error: (err) => console.log(err)
    });

    this.ingredientsStepsApi.getStepsList().subscribe({
      next: (result) => this.stepsList = result.rows,
      error: (err) => console.log(err)
    });

    this.ingredientsStepsApi.getAllSteps().subscribe({
      next: (result) => this.steps = result.rows,
      error: (err) => console.log(err)
    });

    this.commentApi.getAllComments().subscribe({
      next: (result) => {
        this.commentsList = result.rows;
      },
      error: (err) => console.log(err)
    });

    this.usersApi.getAllUsers().subscribe({
      next: (result) => {
        this.usersList = result;
      },
      error: (err) => console.log(err)
    });

    this.isLoggedInApi.isLoggedIn().subscribe({
      next: (result) => {
        this.userConnected = result;
      },
      error: (err) => console.log(err)
    })
  }

  getIngredientsData(recipeId: number) {
    const recipeItemList = this.ingredientsList.filter((list) => list.recipeId === recipeId);

    return recipeItemList.map((list: any) => {
      return this.ingredients.filter((ingredient) => ingredient.id === list.ingredientId)
    });
  }

  getStepsData(recipeId: number) {
    const recipeItemList = this.stepsList.filter((list) => list.recipeId === recipeId);

    return recipeItemList.map((list: any) => {
      return this.steps.filter((step) => step.id === list.stepId)
    });
  }

  getRecipeComments() {
    const recipeComments = this.commentsList.filter((comment) => comment.recipeId === this.recipeId);
    return recipeComments;
  }
}
