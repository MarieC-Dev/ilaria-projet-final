import {Component, OnInit, signal} from '@angular/core';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { connectionSocial } from '../../lists/social-networks-list';
import {UserFormFactory} from '../../factories/user-form.factory';
import {ReactiveFormsModule} from '@angular/forms';
import {UsersApiService} from '../../services/users-api.service';
import {AuthStateService} from '../../services/auth-state.service';

@Component({
  selector: 'app-signin-page',
  imports: [SocialNetworksComponent, ReactiveFormsModule],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SigninPageComponent implements OnInit {
  socialNetworksList = signal(connectionSocial);
  userLogin!: UserFormFactory;
  loginError: boolean = false;

  constructor(
    private usersApiService: UsersApiService,
    private authState: AuthStateService
  ) { }

  ngOnInit(): void {
    this.userLogin = new UserFormFactory();
  }

  onSubmit() {
    this.usersApiService.login(this.userLogin.formGroupLogin.value).subscribe({
      next: (res) => {
        console.log(res);
        this.loginError = false;
        this.authState.login(res.user);
      },
      error: (err) => {
        console.log('Login front error ', err);
        this.loginError = true;
      },
    });
  }
}
