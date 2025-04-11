import { Component } from '@angular/core';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-steps-ingredients-inputs',
  imports: [MultipleInputsComponent, CommonModule],
  templateUrl: './steps-ingredients-inputs.component.html',
  styleUrl: './steps-ingredients-inputs.component.scss'
})
export class StepsIngredientsInputsComponent {
  
}
