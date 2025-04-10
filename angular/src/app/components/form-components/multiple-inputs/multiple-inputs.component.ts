import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-multiple-inputs',
  imports: [CommonModule],
  templateUrl: './multiple-inputs.component.html',
  styleUrl: './multiple-inputs.component.scss'
})
export class MultipleInputsComponent {
  numberOfInput = input.required<number>();
  labelTitle = input.required<string>();

  inputId = input.required<Array<string>>();
  type = input.required<Array<string>>();
  placeholder = input.required<Array<string>>();
  required = input.required<Array<boolean>>();

  /*
    - [inputId, inputId, ...] : string
    - [type, type, ...] : string
    - [placeholder, placeholder, ...] : string
    - [required, required, ...] : boolean
  */
}
