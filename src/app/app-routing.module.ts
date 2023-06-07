import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { AuthGuard } from './guard/auth-guard/auth.guard';
import { GuestGuard } from './guard/guest-guard/guest.guard';
//Layout
import { ApplicationComponent, AuthComponent, SiteComponent } from './layout'
// Auth Pages
import { LoginComponent, RegisterComponent, ForgottenPasswordComponent } from "./pages/auth"
// Pages
import { TaskViewComponent, TermsConditionsComponent } from "./pages"
import { CreateListComponent } from './pages/application/lists/create-list/create-list.component';
import { CreateTaskComponent } from './pages/application/tasks/create-task/create-task.component';
import { UpdateTaskComponent } from './pages/application/tasks/update-task/update-task.component';
import { ViewTaskComponent } from './pages/application/tasks/view-task/view-task.component';
import { UpdateListComponent } from './pages/application/lists/update-list/update-list.component';

const routes: Routes = [
  //Site routes goes here
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  // Auth routes goes here here
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [GuestGuard],
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'forgotten-password', component: ForgottenPasswordComponent },
    ],
  },
  // Application routes goes here here
  {
    path: 'application',
    component: ApplicationComponent,
    canActivate:  [AuthGuard],
    children: [
      { path: 'task-view', component: TaskViewComponent },
      { path: 'lists/:id', component: TaskViewComponent },
      { path: 'edit-list/:id', component: UpdateListComponent },
      { path: 'new-list', component: CreateListComponent },
      { path: 'new-tasks/:listId', component: CreateTaskComponent },
      { path: 'lists/:listId/edit-task/:taskId', component: UpdateTaskComponent },
      { path: 'lists/:listId/view-task/:taskId', component: ViewTaskComponent },
    ],
  },
  // Legal pages
  {
    path: 'legal',
    component: SiteComponent,
    children: [
      { path: 'terms-and-conditions', component: TermsConditionsComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
