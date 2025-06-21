import {Component, OnInit, signal} from '@angular/core';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { connectionSocial } from '../../lists/social-networks-list';
import { SIGNIN } from '../../lists/signin-signup-list';
import {UserFormFactory} from '../../factories/user-form.factory';
import {ReactiveFormsModule} from '@angular/forms';
import {UsersApiService} from '../../services/users-api.service';
import {AccountAccessService} from '../../services/account-access.service';
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
  access = {};

  constructor(
    private router: Router,
    private usersApiService: UsersApiService
  ) { }

  ngOnInit(): void {
    this.userLogin = new UserFormFactory();
  }

  onSubmit() {
    this.usersApiService.login(this.userLogin.formGroupLogin.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/']);
      },
      error: (err) => console.log('Login front error ', err)
    })


  }
}
