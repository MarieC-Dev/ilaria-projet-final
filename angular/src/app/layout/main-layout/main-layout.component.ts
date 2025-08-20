import {Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { commonSocial } from '../../lists/social-networks-list';
import { SearchIconComponent } from "../../components/icons/search-icon/search-icon.component";
import { BurgerMenuDirective } from '../../directives/burger-menu.directive';
import { IsLoggedInService } from '../../services/isLoggedIn.service';
import { AsyncPipe } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {UsersApiService} from '../../services/users-api.service';

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
  userIsLogged = signal(false);
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
    private accountAccess: IsLoggedInService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountAccess.isLoggedIn().subscribe(isLoggedIn => {
      this.userIsLogged.set(isLoggedIn.isAuthenticated);
      this.userData = isLoggedIn.user;
    });
  }

  logout() {
    return this.userApi.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        sessionStorage.clear();

        this.accountAccess.isLoggedIn().subscribe(isLoggedIn => {
          this.userIsLogged.set(isLoggedIn.isAuthenticated);
          this.userData = {};
        });

        this.router.navigate(['/connexion']);
      },
      error: (err) => console.log(err)
    })
  }
}
