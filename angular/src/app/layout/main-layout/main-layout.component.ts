import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { commonSocial } from '../../lists/social-networks-list';
import { BurgerMenuDirective } from '../../directives/burger-menu.directive';
import { IsLoggedInService } from '../../services/isLoggedIn.service';
import { AsyncPipe } from '@angular/common';
import {UsersApiService} from '../../services/users-api.service';
import {AuthStateService} from '../../services/auth-state.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SocialNetworksComponent,
    BurgerMenuDirective,
    AsyncPipe
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: '../../../styles.scss'
})
export class MainLayoutComponent implements OnInit {
  @ViewChild(BurgerMenuDirective) appBurgerMenu!: BurgerMenuDirective;
  socialNetworksList = signal(commonSocial);
  userIsLogged!: Observable<boolean>;
  userData!: {id?: number, username?: string, email?: string, pwd?: string, roleId?: number};

  index: number = 0;
  headerNav = [
    {
      id: this.index++,
      link: '/accueil',
      name: 'Accueil'
    }, {
      id: this.index++,
      link: '/rechercher',
      name: 'Rechercher'
    }, {
      id: this.index++,
      link: '/contact',
      name: 'Contact'
    },
  ];

  constructor(
    private userApi: UsersApiService,
    private authState: AuthStateService
  ) { }

  ngOnInit(): void {
    this.userIsLogged = this.authState.isLoggedIn;
  }

  logout() {
    return this.userApi.logout().subscribe({
      next: (res) => {
        localStorage.removeItem('token');
        sessionStorage.clear();

        this.authState.logout();
      },
      error: (err) => console.log(err)
    })
  }
}
