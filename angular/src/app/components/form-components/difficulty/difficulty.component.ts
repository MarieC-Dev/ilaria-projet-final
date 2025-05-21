import {Component, EventEmitter, inject, Input, model, OnInit, Output, signal} from '@angular/core';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';
import {ControlContainer, FormControl, FormGroupDirective, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipeFormFactory} from '../../../factories/recipe-form.factory';

@Component({
  selector: 'app-difficulty',
  imports: [MultipleInputsComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './difficulty.component.html',
  styleUrl: './difficulty.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DifficultyComponent {
  recipeForm = inject(RecipeFormFactory);
  recipeDifficultyControl = this.recipeForm.createRecipeForm().controls['difficulty'] as FormControl;
  recipeDifficultyValue: number = this.recipeDifficultyControl.value;
  difficulties = ['Très facile', 'Facile', 'Moyen', 'Difficile'];

  @Input() controlName!: string;
  @Input() difficultyValue!: any;

  onInputChange(event: Event) {
    let elm = event.target as HTMLInputElement;

    this.recipeDifficultyControl.setValue(elm.value);
    console.log(this.recipeDifficultyControl.value)
  }

  getDifficulty() {
    switch(parseInt(this.recipeDifficultyControl.value)) {
      case 0:
        return 'Ne sais pas';
        break;
      case 1:
        return this.difficulties[0];
        break;
      case 2:
        return this.difficulties[1];
        break;
      case 3:
        return this.difficulties[2];
        break;
      case 4:
        return this.difficulties[3];
        break;
      default:
        return 'Aucune difficulté renseignée';
    }
  }
}
