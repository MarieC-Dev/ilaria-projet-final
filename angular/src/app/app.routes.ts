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
import { accountGuardGuard } from './guards/account-guard.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { RecipeCommentPageComponent } from './pages/recipe-comment-page/recipe-comment-page.component';
import { pagesAccessGuard } from './guards/pages-access.guard';
import {adminGuard} from './guards/admin.guard';
import {
  ProfileAdminAllusersPageComponent
} from './pages/profile-admin-allusers-page/profile-admin-allusers-page.component';
import {AdminEditUserPageComponent} from './pages/admin-edit-user-page/admin-edit-user-page.component';
import {
  ProfileAdminAllrecipesPageComponent
} from './pages/profile-admin-allrecipes-page/profile-admin-allrecipes-page.component';

export const routes: Routes = [
  {
    path: 'profil/:id/:slug',
    canActivate: [accountGuardGuard],
    canActivateChild: [accountGuardGuard],
    data: {breadcrumb: 'Mon profil'},
    children: [
      {
        path: 'mes-recettes/:recipeId/:slug/modifier',
        component: EditRecipePageComponent,
        data: { breadcrumb: 'Mes recettes > :slug > Modifier', title: 'Mes recettes > :slug > Modifier' }
      },
      {
        path: 'mes-recettes/creer',
        component: CreateRecipesComponent,
        data: { breadcrumb: 'Mes recettes > Créer', title: 'Mes recettes > Créer' }
      },
      {
        path: 'mes-recettes',
        component: ProfileRecipesPageComponent,
        data: { breadcrumb: 'Mes recettes', title: 'Mes recettes' }
      },
      {
        path: 'mes-favoris',
        component: ProfileFavoritesPageComponent,
        data: { breadcrumb: 'Mes favoris', title: 'Mes Favoris' }
      },
      {
        path: 'mes-infos',
        component: ProfilePageComponent,
        data: { breadcrumb: 'Mes infos', title: 'Mes infos' }
      },
    ],
  },

  {
    path: 'profil/:id/admin',
    canActivate: [adminGuard],
    canActivateChild: [adminGuard],
    data: { breadcrumb: 'Admin' },
    children: [
      {
        path: 'recettes/:recipeId/:slug/modifier',
        component: EditRecipePageComponent,
        data: { breadcrumb: 'Mes recettes > :slug > Modifier', title: 'Mes recettes > :slug > Modifier' }
      },
      {
        path: 'mes-recettes/creer',
        component: CreateRecipesComponent,
        data: { breadcrumb: 'Mes recettes > Créer', title: 'Mes recettes > Créer' }
      },
      {
        path: 'utilisateurs/:userId/:slug',
        component: AdminEditUserPageComponent,
        data: { breadcrumb: 'Tous les utilisateurs > :slug', title: 'Tous les utilisateurs > :slug' }
      },
      {
        path: 'recettes',
        component: ProfileAdminAllrecipesPageComponent,
        data: { breadcrumb: 'Toutes les recettes', title: 'Toutes les recettes' }
      },
      {
        path: 'utilisateurs',
        component: ProfileAdminAllusersPageComponent,
        data: { breadcrumb: 'Tous les utilisateurs', title: 'Tous les utilisateurs' }
      },
      {
        path: 'mes-recettes',
        component: ProfileRecipesPageComponent,
        data: { breadcrumb: 'Mes recettes', title: 'Mes recettes' }
      },
      {
        path: 'mes-favoris',
        component: ProfileFavoritesPageComponent,
        data: { breadcrumb: 'Mes favoris', title: 'Mes Favoris' }
      },
      {
        path: 'mes-infos',
        component: ProfilePageComponent,
        data: { breadcrumb: 'Mes infos', title: 'Mes infos' }
      },
    ],
  },

  {
    path: 'recettes',
    data: { breadcrumb: 'Recettes' },
    children: [
      {
        path: ':id/:slug/commentaire',
        component: RecipeCommentPageComponent,
        canActivate: [pagesAccessGuard],
        data: { breadcrumb: ':slug > Commentaire', title: ':slug - Écrire un commentaire' },
      }, {
        path: ':id/:slug',
        component: RecipeDetailsPage,
        data: { breadcrumb: ':slug', title: ':slug' },
      },
    ]
  },

  {
    path: 'accueil',
    component: HomePageComponent,
    data: { breadcrumb: 'Accueil', title: 'Accueil' },
  },
  { path: 'connexion', component: SigninPageComponent, data: { breadcrumb: 'Connexion', title: 'Connexion' }  },
  { path: 'inscription', component: SignupPageComponent, data: { breadcrumb: 'Inscription', title: 'Inscription' }  },
  { path: 'contact', component: ContactPageComponent, data: { breadcrumb: 'Contact', title: 'Contact' }  },
  { path: 'rechercher', component: SearchPageComponent, data: { breadcrumb: 'Rechercher', title: 'Rechercher' }  },
  { path: 'unauthorized', component: UnauthorizedComponent, data: { title: 'Accès refusé' } },
  { path: '', redirectTo: 'accueil', pathMatch: 'full', data: { breadcrumb: 'Accueil', title: 'Accueil' } },
  { path: 'profil', component: NotFoundPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
