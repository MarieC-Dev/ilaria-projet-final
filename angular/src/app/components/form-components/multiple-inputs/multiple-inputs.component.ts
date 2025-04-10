import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-multiple-inputs',
  imports: [CommonModule],
  templateUrl: './multiple-inputs.component.html',
  styleUrl: './multiple-inputs.component.scss'
})
export class MultipleInputsComponent {
  inputId = input.required<string>();
  labelTitle = input.required<string>();
  required = input.required<boolean>();
}
