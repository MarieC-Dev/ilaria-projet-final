import { Component } from '@angular/core';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';

@Component({
  selector: 'app-signin-page',
  imports: [SocialNetworksComponent],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SigninPageComponent {

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