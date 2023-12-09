import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecoverFilesComponent } from './pages/recover-files/recover-files.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recover-files',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: []
  },
  {
    path: 'recover-files',
    component: RecoverFilesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recover-db',
    component: RecoverFilesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    redirectTo: 'recover-files',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'recover-files',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

