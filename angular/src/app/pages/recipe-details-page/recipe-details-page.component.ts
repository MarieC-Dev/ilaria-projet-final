import {Component, signal, inject, OnInit} from '@angular/core';
import { RECIPE_LIST } from '../../lists/recipe-list.fake';
import { CommonModule, JsonPipe } from '@angular/common';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { RecipePresentationComponent } from '../../components/recipe-sections/recipe-presentation/recipe-presentation.component';
import { RecipeDetailsComponent } from '../../components/recipe-sections/recipe-details/recipe-details.component';
import { OtherRecipesComponent } from '../../components/recipe-sections/other-recipes/other-recipes.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipe-details-page',
  imports: [
    RecipePresentationComponent,
    RecipeDetailsComponent,
    OtherRecipesComponent,
    CommonModule,
    JsonPipe,
  ],
  templateUrl: './recipe-details-page.component.html',
  styleUrl: './recipe-details-page.component.scss'
})
export class RecipeDetailsPage implements OnInit {
  recipeId: number = 0;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
