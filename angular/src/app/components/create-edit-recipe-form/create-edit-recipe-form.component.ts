import {Component, computed, inject, model, OnInit, signal} from '@angular/core';
import { CookingTypeComponent } from '../form-components/cooking-type/cooking-type.component';
import { DifficultyComponent } from '../form-components/difficulty/difficulty.component';
import { FormInputComponent } from '../form-components/form-input/form-input.component';
import { InputsTimesComponent } from '../form-components/inputs-times/inputs-times.component';
import { MultipleInputsComponent } from '../form-components/multiple-inputs/multiple-inputs.component';
import { StepsIngredientsInputsComponent } from '../form-components/steps-ingredients-inputs/steps-ingredients-inputs.component';
import { CUISINE_TYPE } from '../../lists/cuisine-type-list';
import {RecipesApiService} from '../../services/recipes-api.service';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {COOKING_TYPE_LIST} from '../../lists/cooking-type-list';
import {RecipeFormFactory} from '../../factories/recipe-form.factory';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-create-edit-recipe-form',
  imports: [
    CommonModule,
    MultipleInputsComponent,
    InputsTimesComponent,
    StepsIngredientsInputsComponent,
    CookingTypeComponent,
    DifficultyComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-edit-recipe-form.component.html',
  styleUrl: './create-edit-recipe-form.component.scss'
})
export class CreateEditRecipeFormComponent implements OnInit{
  recipeForm!: RecipeFormFactory;
  cuisineTypeList = signal(CUISINE_TYPE);
  cookingTypeList = signal(COOKING_TYPE_LIST);
  isCooking = false;
  isPause = false;

  constructor(private recipesApiService: RecipesApiService) { }

  ngOnInit(): void {
    this.recipeForm = new RecipeFormFactory();
  }

  onSubmit() {
    /*this.recipesApiService.createRecipe(this.recipeForm).subscribe((res) => {
      console.log(res);
    })*/
    console.log(this.recipeForm);
  }

  protected readonly computed = computed;
}
