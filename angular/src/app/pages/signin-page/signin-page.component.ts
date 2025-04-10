import { Component, signal } from '@angular/core';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { connectionSocial } from '../../lists/social-networks-list';
import { SIGNIN } from '../../lists/signin-signup-list';
import { FormInputComponent } from '../../components/form-components/form-input/form-input.component';

@Component({
  selector: 'app-signin-page',
  imports: [SocialNetworksComponent, FormInputComponent],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SigninPageComponent {
  socialNetworksList = signal(connectionSocial);
  formInputConnection = signal(SIGNIN);
}

/*
Connection :
  - Email
  - Password

Sign Up :
 - picture
 - firstname
 - lastname
 - username
 - password
*/