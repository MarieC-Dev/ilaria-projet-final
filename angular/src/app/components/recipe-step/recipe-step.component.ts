import { Component, input } from '@angular/core';

@Component({
  selector: 'app-recipe-step',
  imports: [],
  templateUrl: './recipe-step.component.html',
  styleUrl: './recipe-step.component.scss'
})
export class RecipeStepComponent {
  nbStep = input<any>();
  description = input<string>('');
}
