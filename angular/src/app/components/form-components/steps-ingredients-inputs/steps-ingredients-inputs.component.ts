import { Component } from '@angular/core';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';
import { CommonModule } from '@angular/common';
import { DeleteIconComponent } from "../../icons/delete-icon/delete-icon.component";

@Component({
  selector: 'app-steps-ingredients-inputs',
  imports: [MultipleInputsComponent, CommonModule, DeleteIconComponent],
  templateUrl: './steps-ingredients-inputs.component.html',
  styleUrl: './steps-ingredients-inputs.component.scss'
})
export class StepsIngredientsInputsComponent {
  
}
