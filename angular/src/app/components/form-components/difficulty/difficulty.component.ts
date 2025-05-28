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
  @Input() controlName!: string;

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.value)
  }
}
