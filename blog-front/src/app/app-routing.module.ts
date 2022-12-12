import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateArticleComponent } from './components/article/create-article/create-article.component';
import { ListArticleComponent } from './components/article/list-article/list-article.component';
import { ListMyArticleComponent } from './components/article/list-my-article/list-my-article.component';
import { UpdateArticleComponent } from './components/article/update-article/update-article.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'liste-articles', component: ListArticleComponent },
  { path: 'mes-articles', component: ListMyArticleComponent },
  { path: 'ajouter-article', component: CreateArticleComponent },
  { path: 'editer-article/:id', component: UpdateArticleComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
