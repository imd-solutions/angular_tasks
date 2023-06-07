import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Layouts
import { AuthComponent } from './layout/auth/auth.component';
import { ApplicationComponent } from './layout/application/application.component';
import { ErrorComponent } from './layout/error/error.component';
import { SiteComponent } from './layout/site/site.component';
// App Component
import { AppComponent } from './app.component';
// Pages
import { TaskViewComponent } from './pages/application/tasks/view/task-view.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgottenPasswordComponent } from './pages/auth/forgotten-password/forgotten-password.component';
import { TermsConditionsComponent } from './pages/legal/terms-conditions/terms-conditions.component';
// Components
import { TextComponent } from './components/input/text/text.component';
import { ButtonComponent } from './components/event/button/button.component';
import { CheckboxComponent } from './components/input/checkbox/checkbox.component';
import { CreateListComponent } from './pages/application/lists/create-list/create-list.component';
import { CreateTaskComponent } from './pages/application/tasks/create-task/create-task.component';
import { UpdateTaskComponent } from './pages/application/tasks/update-task/update-task.component';
import { ViewTaskComponent } from './pages/application/tasks/view-task/view-task.component';
import { ModalComponent } from './components/notification/modal/modal.component';
import { ModalService } from './services/modal/modal.service';
import { UpdateListComponent } from './pages/application/lists/update-list/update-list.component';
@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    ApplicationComponent,
    ErrorComponent,
    ForgottenPasswordComponent,
    TextComponent,
    ButtonComponent,
    CheckboxComponent,
    TermsConditionsComponent,
    SiteComponent,
    CreateListComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    ViewTaskComponent,
    ModalComponent,
    UpdateListComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
