import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-input',
  imports: [CommonModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent {
  id = input.required<string>();
  type = input<string>('');
  label = input.required<string>();
  inputId = input.required<string>();
  required = input.required<boolean>();
}
