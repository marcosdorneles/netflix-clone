import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from 'src/layout/full/full.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { LoginComponent } from 'src/pages/login/login.component';
import { SerieComponent } from 'src/pages/serie/serie.component';
import { AuthGuard } from 'src/security/guard/auth.guard';

const routes: Routes = [
  {
    path:'login', component:LoginComponent
  },
  {
    path:'',
    component: FullComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'series/:id',
        component: SerieComponent
      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
