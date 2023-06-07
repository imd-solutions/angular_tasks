import { Component, OnInit, TemplateRef } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthenticationService } from 'src/app/services/authentication/authentication-service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  resetForm!: FormGroup
  submitted = false

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    })

    this.resetForm = this.fb.group({
      forgottenPassword: new FormControl(null, Validators.required),
    })
  }

  get loginFormControl() {
    return this.loginForm.controls
  }

  onFormSubmit(): void {
    this.submitted = true
    
    if (this.loginForm.valid) {
      let data = {
        email: this.loginFormControl['email'].value,
        password: this.loginFormControl['password'].value
      }

      this.authenticationService.userLogin(data).subscribe({
        next: (resp) => this.processUserLogin(resp),
        error: (err) =>  this.loginFailed(err)
      })
    }
  }

  openForgottenPasswordModal(modalTemplate: TemplateRef<any>) {
    
  }

  onResetFormSubmit(): void {
    this.submitted = true
    console.log('LoginForm', this.resetForm.controls)
  }

  private processUserLogin(response: any) {
    
      let loggedIn = true;
      localStorage.setItem("isLoggedIn", JSON.stringify(loggedIn)); 
      localStorage.setItem('user', JSON.stringify(response));
      
      this.toastr.success('User logged in successfully!', 'SUCCESS');
      this.router.navigate(['/application/task-view'])

    
  }

  private loginFailed(e: any) {
    this.toastr.error(e.error, 'ERROR');
  }
}
