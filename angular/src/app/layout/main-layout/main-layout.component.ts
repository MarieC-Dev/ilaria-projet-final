import {Component, inject, signal, ViewChild} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { commonSocial } from '../../lists/social-networks-list';
import { SearchIconComponent } from "../../components/icons/search-icon/search-icon.component";
import { BurgerMenuDirective } from '../../directives/burger-menu.directive';
import { IsLoggedInService } from '../../services/isLoggedIn.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SocialNetworksComponent,
    SearchIconComponent,
    BurgerMenuDirective,
    AsyncPipe
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: '../../../styles.scss'
})
export class MainLayoutComponent {
  @ViewChild(BurgerMenuDirective) appBurgerMenu!: BurgerMenuDirective;
  socialNetworksList = signal(commonSocial);
  accountAccess: IsLoggedInService = inject(IsLoggedInService);
  userStatus = this.accountAccess.isLoggedIn();

  index: number = 0;
  headerNav = [
    {
      id: this.index++,
      link: '/accueil',
      name: 'Accueil'
    }, /*{
      id: this.index++,
      link: '/recettes',
      name: 'Recettes'
    }, */{
      id: this.index++,
      link: '/rechercher',
      name: 'Rechercher'
    }, {
      id: this.index++,
      link: '/contact',
      name: 'Contact'
    },
  ];
}
