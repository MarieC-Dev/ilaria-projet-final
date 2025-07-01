import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RecipeDetailsPage } from './pages/recipe-details-page/recipe-details-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { CreateRecipesComponent } from './pages/create-recipes/create-recipes.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileFavoritesPageComponent } from './pages/profile-favorites-page/profile-favorites-page.component';
import { ProfileRecipesPageComponent } from './pages/profile-recipes-page/profile-recipes-page.component';
import { EditRecipePageComponent } from './pages/edit-recipe-page/edit-recipe-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import {accountGuardGuard} from './guards/account-guard.guard';
import {UnauthorizedComponent} from './pages/unauthorized/unauthorized.component';
import {RecipeCommentPageComponent} from './pages/recipe-comment-page/recipe-comment-page.component';

export const routes: Routes = [
  { path: 'recettes/commentaire', component: RecipeCommentPageComponent },
  /*{ path: 'recettes/:id/commentaire', component: RecipeCommentPageComponent },*/

  { path: 'profil/creer-une-recette', component: CreateRecipesComponent },
  {
    path: 'recettes/commentaire',
    component: RecipeCommentPageComponent,
    canActivate: [accountGuardGuard]
  },
  /*{ path: 'recettes/:id/commentaire', component: RecipeCommentPageComponent },*/
  {
    path: 'profil/:id',
    canActivate: [accountGuardGuard],
    canActivateChild: [accountGuardGuard],
    children: [
      { path: 'mes-recettes/modifier', component: EditRecipePageComponent },
      { path: 'mes-recettes/creer', component: CreateRecipesComponent },
      { path: 'mes-recettes', component: ProfileRecipesPageComponent },
      { path: 'mes-favoris', component: ProfileFavoritesPageComponent },
      { path: 'mes-infos', component: ProfilePageComponent },
    ],
  },
  { path: 'recettes/:id', component: RecipeDetailsPage },
  { path: 'accueil', component: HomePageComponent },
  { path: 'recettes', component: RecipeDetailsPage },
  { path: 'connexion', component: SigninPageComponent },
  { path: 'inscription', component: SignupPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'rechercher', component: SearchPageComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'profil', component: NotFoundPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
