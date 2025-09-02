import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet
} from '@angular/router';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { commonSocial } from '../../lists/social-networks-list';
import { BurgerMenuDirective } from '../../directives/burger-menu.directive';
import { IsLoggedInService } from '../../services/isLoggedIn.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {UsersApiService} from '../../services/users-api.service';
import {AuthStateService} from '../../services/auth-state.service';
import {filter, Observable} from 'rxjs';
import {SlugifyForRoutageService} from '../../services/slugify-for-routage.service';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SocialNetworksComponent,
    BurgerMenuDirective,
    AsyncPipe,
    CommonModule, RouterModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: '../../../styles.scss'
})
export class MainLayoutComponent implements OnInit {
  @ViewChild(BurgerMenuDirective) appBurgerMenu!: BurgerMenuDirective;
  socialNetworksList = signal(commonSocial);
  userIsLogged!: Observable<boolean>;
  userData!: {id?: number, username: string, email?: string, pwd?: string, roleId?: number};
  breadcrumbs: Breadcrumb[] = [];

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
    private authState: AuthStateService,
    private loggedIn: IsLoggedInService,
    private router: Router,
    private route: ActivatedRoute,
    protected slugify: SlugifyForRoutageService
  ) { }

  ngOnInit(): void {
    this.userIsLogged = this.authState.isLoggedIn;

    this.loggedIn.isLoggedIn().subscribe((res) => {
      this.userData = res.user;
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumb(this.route.root);
      });
  }

  private buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children = route.children;

    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;

        // Remplace les :param par les vraies valeurs
        let label = child.snapshot.data['breadcrumb'] || routeURL;

        // Accès aux paramètres de la route
        const routeParams = child.snapshot.params;

        Object.keys(routeParams).forEach(paramKey => {
          label = label.replace(`:${paramKey}`,
          routeParams[paramKey].replace(/-/g, ' ').replace(/\b\w/g, (char: any) => char.toUpperCase()));
        });

        breadcrumbs.push({ label, url });
      }

      return this.buildBreadcrumb(child, url, breadcrumbs);
    }

    return breadcrumbs;
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
