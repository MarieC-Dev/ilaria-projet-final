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
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminFavoritesPageComponent } from './pages/admin-favorites-page/admin-favorites-page.component';
import { AdminRecipesPageComponent } from './pages/admin-recipes-page/admin-recipes-page.component';

export const routes: Routes = [
    /* { path: '/recipe/:id', component: RecipeDetailsPage }, */
    { path: 'admin/mes-recettes', component: AdminRecipesPageComponent },
    { path: 'admin/mes-favoris', component: AdminFavoritesPageComponent },
    { path: 'admin/mes-infos', component: AdminPageComponent },
    { path: 'profil/mes-recettes/modifier', component: EditRecipePageComponent },
    { path: 'profil/mes-recettes', component: ProfileRecipesPageComponent },
    { path: 'profil/creer-une-recette', component: CreateRecipesComponent },
    { path: 'profil/mes-favoris', component: ProfileFavoritesPageComponent },
    { path: 'profil/mes-infos', component: ProfilePageComponent },
    { path: 'accueil', component: HomePageComponent },
    { path: 'recettes', component: RecipeDetailsPage },
    { path: 'connexion', component: SigninPageComponent },
    { path: 'inscription', component: SignupPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: 'rechercher', component: SearchPageComponent },
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    { path: '**', component: NotFoundPageComponent },
];

/*
<a 
    routerlink="/profil/mes-infos" 
    routerlinkactive="btn-bg-darkGrey__profile--active" 
    ariacurrentwhenactive="page" 
    class="btn-bg-darkGrey btn-bg-darkGrey__profile btn-bg-darkGrey__profile--active" 
    ng-reflect-router-link="/profil/mes-infos" 
    ng-reflect-router-link-active="btn-bg-darkGrey__profile--acti" 
    ng-reflect-aria-current-when-active="page" 
    href="/profil/mes-infos" 
    aria-current="page">
<p>Mon profil</p>
</a>

<a 
    routerlink="/admin/mes-infos" 
    routerlinkactive="btn-bg-darkGrey__profile--active" 
    ariacurrentwhenactive="page" 
    class="btn-bg-darkGrey btn-bg-darkGrey__profile">
<p>Mon profil</p></a>
*/