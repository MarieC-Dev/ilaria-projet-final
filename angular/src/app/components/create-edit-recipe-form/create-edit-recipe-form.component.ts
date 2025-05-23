import {Component, inject, signal} from '@angular/core';
import { CookingTypeComponent } from '../form-components/cooking-type/cooking-type.component';
import { DifficultyComponent } from '../form-components/difficulty/difficulty.component';
import { FormInputComponent } from '../form-components/form-input/form-input.component';
import { InputsTimesComponent } from '../form-components/inputs-times/inputs-times.component';
import { MultipleInputsComponent } from '../form-components/multiple-inputs/multiple-inputs.component';
import { StepsIngredientsInputsComponent } from '../form-components/steps-ingredients-inputs/steps-ingredients-inputs.component';
import { CUISINE_TYPE } from '../../lists/cuisine-type-list';
import {RecipesApiService} from '../../services/recipes-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-edit-recipe-form',
  imports: [
    FormInputComponent,
    MultipleInputsComponent,
    InputsTimesComponent,
    StepsIngredientsInputsComponent,
    CookingTypeComponent,
    DifficultyComponent,
    FormsModule
  ],
  templateUrl: './create-edit-recipe-form.component.html',
  styleUrl: './create-edit-recipe-form.component.scss'
})
export class CreateEditRecipeFormComponent {
  cuisineTypeList = signal(CUISINE_TYPE);
  newRecipe = {
    name: '',
    description: '',
    imageName: '',
    imageData: '',
    cuisineType: '',
    cookingType: [],
    servingNumber: 0,
    difficulty: 0,
    authorId: 0,
    recipeTime: 0,
    created: Date.now(),
  };

  constructor(private recipesApiService: RecipesApiService) {
  }

  onCheckboxChanged(checkedValue: string[]): void {
    //newRecipe.cookingType
    //console.log(checkedValue);
  }

  onSubmit() {
    this.recipesApiService.createRecipe(this.newRecipe).subscribe((res) => {
      console.log(res);
    })
  }
}
