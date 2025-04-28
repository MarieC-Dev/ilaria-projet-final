import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SocialNetworksComponent } from '../../components/social-networks/social-networks.component';
import { commonSocial } from '../../lists/social-networks-list';
import { SearchIconComponent } from "../../components/icons/search-icon/search-icon.component";
import { BurgerMenuDirective } from '../../directives/burger-menu.directive';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    SocialNetworksComponent, 
    SearchIconComponent, 
    BurgerMenuDirective
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: '../../../styles.scss'
})
export class MainLayoutComponent {
  socialNetworksList = signal(commonSocial);
}
