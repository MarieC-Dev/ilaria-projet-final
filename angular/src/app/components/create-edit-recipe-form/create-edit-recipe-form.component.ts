import {Component, inject, OnInit, signal} from '@angular/core';
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

@Component({
  selector: 'app-create-edit-recipe-form',
  imports: [
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
export class CreateEditRecipeFormComponent {
  cuisineTypeList = signal(CUISINE_TYPE);
  cookingTypeList = signal(COOKING_TYPE_LIST);
  newRecipe = inject(RecipeFormFactory);
  recipeDifficuty = this.newRecipe.createRecipeForm().controls['difficulty'].value as FormControl;

  constructor(private recipesApiService: RecipesApiService) { }

  onDifficultyChange(newValue: any) {
    this.newRecipe.createRecipeForm().controls['difficulty'].setValue(newValue);
    console.log(this.newRecipe.createRecipeForm().controls['difficulty'].value);
  }

  onCheckboxChanged(checkedValue: any): void {
    const findItemChecked = this.cookingTypeList().find(elm => elm.inputId === checkedValue)!;
    //this.newRecipe.cookingType = findItemChecked.id;
    this.newRecipe.createRecipeForm().controls['cookingType'].setValue(findItemChecked.id);
    console.log(this.newRecipe.createRecipeForm().controls['cookingType']);
  }

  onSubmit() {
    /*this.recipesApiService.createRecipe(this.newRecipe).subscribe((res) => {
      console.log(res);
    })*/
    console.log(this.newRecipe.createRecipeForm());
  }
}
