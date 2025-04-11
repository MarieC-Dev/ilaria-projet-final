import { Component } from '@angular/core';
import { FormInputComponent } from '../../components/form-components/form-input/form-input.component';
import { MultipleInputsComponent } from '../../components/form-components/multiple-inputs/multiple-inputs.component';
import { InputsTimesComponent } from "../../components/form-components/inputs-times/inputs-times.component";
import { StepsIngredientsInputsComponent } from "../../components/form-components/steps-ingredients-inputs/steps-ingredients-inputs.component";
import { CookingTypeComponent } from "../../components/form-components/cooking-type/cooking-type.component";

@Component({
  selector: 'app-create-recipes',
  imports: [FormInputComponent, MultipleInputsComponent, InputsTimesComponent, StepsIngredientsInputsComponent, CookingTypeComponent],
  templateUrl: './create-recipes.component.html',
  styleUrl: './create-recipes.component.scss'
})
export class CreateRecipesComponent {

}
