import {Component, OnInit, signal} from '@angular/core';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { connectionSocial } from '../../lists/social-networks-list';
import { SIGNIN } from '../../lists/signin-signup-list';
import { FormInputComponent } from '../../components/form-components/form-input/form-input.component';
import {UserFormFactory} from '../../factories/user-form.factory';
import {ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {UsersApiService} from '../../services/users-api.service';

@Component({
  selector: 'app-signin-page',
  imports: [SocialNetworksComponent, ReactiveFormsModule],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SigninPageComponent implements OnInit {
  socialNetworksList = signal(connectionSocial);
  formInputConnection = signal(SIGNIN);
  userLogin!: UserFormFactory;

  constructor(private usersApiService: UsersApiService) { }

  ngOnInit(): void {
    this.userLogin = new UserFormFactory();
  }

  onSubmit() {
    this.usersApiService.login(this.userLogin.formGroupLogin.value).subscribe({
      next: (result) => console.log(result),
      error: (err) => console.log('Login front error ', err)
    })
  }
}
