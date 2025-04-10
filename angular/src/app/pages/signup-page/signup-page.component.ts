import { Component, signal } from '@angular/core';
import { SIGNUP } from '../../lists/signin-signup-list';
import { FormInputComponent } from '../../components/form-components/form-input/form-input.component';

@Component({
  selector: 'app-signup-page',
  imports: [FormInputComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  formInputConnection = signal(SIGNUP);
}
