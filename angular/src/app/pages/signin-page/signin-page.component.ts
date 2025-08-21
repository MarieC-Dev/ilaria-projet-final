import {Component, OnInit, signal} from '@angular/core';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { connectionSocial } from '../../lists/social-networks-list';
import {UserFormFactory} from '../../factories/user-form.factory';
import {ReactiveFormsModule} from '@angular/forms';
import {UsersApiService} from '../../services/users-api.service';
import {IsLoggedInService} from '../../services/isLoggedIn.service';
import {JsonPipe} from '@angular/common';
import {Router} from '@angular/router';
import {AuthStateService} from '../../services/auth-state.service';

@Component({
  selector: 'app-signin-page',
  imports: [SocialNetworksComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SigninPageComponent implements OnInit {
  socialNetworksList = signal(connectionSocial);
  userLogin!: UserFormFactory;
  isLoggedInData = {};

  constructor(
    private router: Router,
    private usersApiService: UsersApiService,
    private isLoggedIn: IsLoggedInService,
    private authState: AuthStateService
  ) { }

  ngOnInit(): void {
    this.userLogin = new UserFormFactory();
    /*this.isLoggedIn.isLoggedIn().subscribe(isLoggedIn => {
      console.log(isLoggedIn);
      this.isLoggedInData = isLoggedIn;
    });*/
  }

  onSubmit() {
    this.usersApiService.login(this.userLogin.formGroupLogin.value).subscribe({
      next: (res) => {
        console.log(res);
        this.authState.login(res.user);
      },
      error: (err) => console.log('Login front error ', err),
    });
  }
}
