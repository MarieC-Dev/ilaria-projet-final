import { Component, signal } from '@angular/core';
import { CookingTypeComponent } from '../form-components/cooking-type/cooking-type.component';
import { DifficultyComponent } from '../form-components/difficulty/difficulty.component';
import { FormInputComponent } from '../form-components/form-input/form-input.component';
import { InputsTimesComponent } from '../form-components/inputs-times/inputs-times.component';
import { MultipleInputsComponent } from '../form-components/multiple-inputs/multiple-inputs.component';
import { StepsIngredientsInputsComponent } from '../form-components/steps-ingredients-inputs/steps-ingredients-inputs.component';
import { CUISINE_TYPE } from '../../lists/cuisine-type-list';

@Component({
  selector: 'app-create-edit-recipe-form',
  imports: [
    FormInputComponent, 
    MultipleInputsComponent, 
    InputsTimesComponent, 
    StepsIngredientsInputsComponent, 
    CookingTypeComponent, 
    DifficultyComponent,
  ],
  templateUrl: './create-edit-recipe-form.component.html',
  styleUrl: './create-edit-recipe-form.component.scss'
})
export class CreateEditRecipeFormComponent {
  cuisineTypeList = signal(CUISINE_TYPE);
}
