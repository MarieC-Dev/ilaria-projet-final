import { CommonModule } from '@angular/common';
import {Component, input, OnInit} from '@angular/core';
import {RecipesApiService} from '../../../services/recipes-api.service';
import {RecipeItemTimeComponent} from '../../recipe-item-time/recipe-item-time.component';

@Component({
  selector: 'app-recipe-presentation',
  imports: [CommonModule, RecipeItemTimeComponent],
  templateUrl: './recipe-presentation.component.html',
  styleUrl: './recipe-presentation.component.scss'
})
export class RecipePresentationComponent implements OnInit {
  image = input<string>('');
  title = input<string>('');
  description = input<string>('');
  authorName = input<string>('');
  authorRecipesNumber = input<number>();

  recipeId = input<number>();
  recipeData: any[] = [];

  cuisineTypeId = input.required<number>();
  cuisineTypeName = input.required<string>();

  constructor(private recipeApi: RecipesApiService) {
  }

  ngOnInit(): void {
    //this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeApi.getOneRecipe(Number(this.recipeId)).subscribe({
      next: (result) => {
        console.log(result[0])
        this.recipeData.push(result[0]);
      },
      error: (err) => console.log('Front get one recipe error : ', err)
    })
    //Number(this.route.snapshot.paramMap.get('id'));
  }
}
