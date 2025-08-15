import {Component, OnInit} from '@angular/core';
import {HeartIconComponent} from "../../components/icons/heart-icon/heart-icon.component";
import {ProfileIconComponent} from "../../components/icons/profile-icon/profile-icon.component";
import {RecipeIconComponent} from "../../components/icons/recipe-icon/recipe-icon.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IsLoggedInService} from '../../services/isLoggedIn.service';
import {UsersIconComponent} from '../../components/icons/users-icon/users-icon.component';

@Component({
  selector: 'app-header-profile',
  imports: [
    RouterLink,
    HeartIconComponent,
    ProfileIconComponent,
    RecipeIconComponent,
    RouterLinkActive,
    UsersIconComponent
  ],
  templateUrl: './header-profile.component.html',
  styleUrl: './header-profile.component.scss'
})
export class HeaderProfileComponent implements OnInit {
  userLoggedIn: any;

  constructor(
    private isLoggedIn: IsLoggedInService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn.isLoggedIn().subscribe((result) => {
      this.userLoggedIn = result;
    })
  }
}
