import { Component, signal } from '@angular/core';
import { SIGNUP } from '../../lists/signin-signup-list';
import { FormInputComponent } from '../../components/form-components/form-input/form-input.component';
import {UsersApiService} from '../../services/users-api.service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  imports: [FormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  formInputConnection = signal(SIGNUP);
  newUser = {
    imageName: '',
    imageData: '',
    username: '',
    email: '',
    password: '',
    role: 3,
    created: Date.now(),
  }

  constructor(private usersApiService: UsersApiService) { }

  onSubmit(): void {
    this.usersApiService.createUser(this.newUser).subscribe((res) => {
      console.log(res);
    })
  }
}
