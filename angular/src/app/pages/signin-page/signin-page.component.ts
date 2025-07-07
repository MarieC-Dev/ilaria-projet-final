import {Component, OnInit, signal} from '@angular/core';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { connectionSocial } from '../../lists/social-networks-list';
import { SIGNIN } from '../../lists/signin-signup-list';
import {UserFormFactory} from '../../factories/user-form.factory';
import {ReactiveFormsModule} from '@angular/forms';
import {UsersApiService} from '../../services/users-api.service';
import {IsLoggedInService} from '../../services/isLoggedIn.service';
import {JsonPipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin-page',
  imports: [SocialNetworksComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SigninPageComponent implements OnInit {
  socialNetworksList = signal(connectionSocial);
  formInputConnection = signal(SIGNIN);
  userLogin!: UserFormFactory;

  constructor(
    private router: Router,
    private usersApiService: UsersApiService,
    private acountAccess: IsLoggedInService
  ) { }

  ngOnInit(): void {
    this.userLogin = new UserFormFactory();
  }

  onSubmit() {
    this.usersApiService.login(this.userLogin.formGroupLogin.value).subscribe({
      next: (res) => {
        console.log(res);
        window.location.reload();
      },
      error: (err) => console.log('Login front error ', err)
    })

    if(this.acountAccess.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}
