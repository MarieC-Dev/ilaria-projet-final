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
import {RecipeAverageService} from '../../../services/recipe-average.service';
import {switchMap} from 'rxjs';
import {TagsListService} from '../../../services/tags-list.service';

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

  recipeIngredients!: any[];
  recipeSteps!: any[];
  commentsList!: any[];
  usersList!: any[];
  userConnected!: any;
  recipeTags!: any[];

  socialNetworksList = signal(commonSocial);

  constructor(
    private ingredientsStepsApi: IngredientsStepsApiService,
    private commentApi: CommentApiService,
    private recipeAverage: RecipeAverageService,
    private usersApi: UsersApiService,
    private tagsApi: TagsListService,
    protected recipeDetailService: RecipeDetailsService,

    private isLoggedInApi: IsLoggedInService
  ) { }

  ngOnInit(): void {
    this.ingredientsStepsApi.getIngredientsList().pipe(
      switchMap((ingredientsList: any) => {
        this.recipeIngredients = ingredientsList.rows.filter((list: any) => list.recipeId === this.recipeId);
        return this.ingredientsStepsApi.getAllIngredients();
      }),
    ).subscribe((ingredients) => {
      const ingredientsRows = ingredients.rows;
      this.recipeIngredients = this.recipeIngredients.flatMap((list: any) => { // ingredientId
        return ingredientsRows.filter((ingredient: any) => ingredient.id === list.ingredientId);
      });
    });

    this.ingredientsStepsApi.getStepsList().pipe(
      switchMap((stepsList: any) => {
        this.recipeSteps = stepsList.rows.filter((list: any) => list.recipeId === this.recipeId);
        return this.ingredientsStepsApi.getAllSteps();
      }),
    ).subscribe((steps) => {
      const stepsRows = steps.rows;
      this.recipeSteps = this.recipeSteps.flatMap((list: any) => { // ingredientId
        return stepsRows.filter((step: any) => step.id === list.stepId);
      });
    });

    this.tagsApi.getAllTags().subscribe({
      next: (result) => {
        this.recipeTags = result.filter((tag: any) => tag.recipeId === this.recipeId);
      },
      error: (err) => console.log(err)
    });

    this.commentApi.getCommentsByRecipeId(this.recipeId).subscribe((result) => {
      this.commentsList = result.rows;
    })

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
    });
  }

  getRecipeAverage() {
    return this.recipeAverage.getRecipeAverage(Number(this.recipeId), this.commentsList)
  }

  tagsTranslation(tag: string) {
    switch(tag) {
      // Difficulté
      case 'easy':
        return 'Facile';
      case 'intermediate':
        return 'Intermédiaire';
      case 'difficult':
        return 'Difficile';

      // Type de cuisson
      case 'hot-plate':
        return 'Plaque chauffante';
      case 'stove':
        return 'Four';
      case 'air-fryer':
        return 'Air fryer';
      case 'barbecue':
        return 'Barbecue';
      case 'no-cooking':
        return 'Sans cuisson';

      // Type de cuisine
      case 'french':
        return 'Française';
      case 'italian':
        return 'Italienne';
      case 'spanish':
        return 'Espagnole';
      case 'asiatic':
        return 'Asiatique';
      case 'indian':
        return 'Indienne';
      case 'european':
        return 'Européenne';
      case 'north-african':
        return 'Nord-africaine';
      case 'african':
        return 'Africaine';
      case 'grecian':
        return 'Grecque';
      case 'north-american':
        return 'Nord-américaine';
      case 'russian':
        return 'Russe';
      case 'australian':
        return 'Australienne';

      default:
        return '?';
    }
  }
}
