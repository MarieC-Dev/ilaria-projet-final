import {Component, computed, inject, model, OnInit, signal} from '@angular/core';
import { CookingTypeComponent } from '../form-components/cooking-type/cooking-type.component';
import { DifficultyComponent } from '../form-components/difficulty/difficulty.component';
import { FormInputComponent } from '../form-components/form-input/form-input.component';
import { MultipleInputsComponent } from '../form-components/multiple-inputs/multiple-inputs.component';
import { CUISINE_TYPE } from '../../lists/cuisine-type-list';
import {RecipesApiService} from '../../services/recipes-api.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {COOKING_TYPE_LIST} from '../../lists/cooking-type-list';
import {RecipeFormFactory} from '../../factories/recipe-form.factory';
import {CommonModule} from '@angular/common';
import {DeleteIconComponent} from '../icons/delete-icon/delete-icon.component';
import {TableListComponent} from '../form-components/table-list/table-list.component';

@Component({
  selector: 'app-create-edit-recipe-form',
  imports: [
    CommonModule,
    MultipleInputsComponent,
    CookingTypeComponent,
    DifficultyComponent,
    FormsModule,
    ReactiveFormsModule,
    DeleteIconComponent,
    TableListComponent,
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
  tableHeadIngredient: string[] = ['Quantité', 'Unités', 'Ingrédients'];
  tableHeadStep: string[] = ['N°', 'Description'];

  constructor(private recipesApiService: RecipesApiService) { }

  ngOnInit(): void {
    this.recipeForm = new RecipeFormFactory();
  }

  /* INGREDIENTS */
  get ingredientsList(): FormArray {
    return this.recipeForm.formGroup.get('ingredientsList') as FormArray;
  }

  addIngredient(): void {
    const ingredientItem = this.recipeForm.formGroup.get('ingredientDetail') as FormGroup;
    const newIngredient = new FormGroup({
      quantity: new FormControl<string>(ingredientItem.value.quantity),
      unit: new FormControl<string>(ingredientItem.value.unit),
      name: new FormControl<string>(ingredientItem.value.name),
    })

    this.ingredientsList.push(newIngredient);
    ingredientItem.patchValue({
      quantity: '',
      unit: '',
      name: ''
    });
  }

  removeIngredient() {
    console.log('Remove');
  }
  /* ===== */

  /* STEPS */
  get stepsList() {
    return this.recipeForm.formGroup.get('stepsList') as FormArray;
  }

  addStep() {
    const step: FormGroup = this.recipeForm.formGroup.get('stepDetail') as FormGroup;
    const newStep: FormGroup = new FormGroup({
      number: new FormControl<string>(step.value.number),
      stepName: new FormControl<string>(step.value.stepName),
    });
    this.stepsList.push(newStep);

    step.patchValue({
      number: '',
      stepName: ''
    });
  }

  removeStep() {
    console.log('Remove');
  }
  /* ===== */

  onSubmit() {
    /*this.recipesApiService.createRecipe(this.recipeForm).subscribe((res) => {
      console.log(res);
    })*/
    console.log(this.recipeForm);
  }
}
