import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-input',
  imports: [],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent {
  id = input<string>('');
  type = input<string>('');
  label = input<string>('');
  inputId = input<string>('');
  required = input<boolean>();
}
