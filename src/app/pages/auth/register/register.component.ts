import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AuthenticationService } from 'src/app/services/authentication/authentication-service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  submitted = false

  constructor(
    private fb: FormBuilder, 
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      telephone: new FormControl(),
      terms: [false, Validators.requiredTrue],
    }, { 
      validator: this.confirmedValidator('password', 'confirmPassword')
    })
  }

  get registerFormControl() {
    return this.registerForm.controls
  }

  onFormSubmit(): void {
    this.submitted = true
    if (this.registerForm.controls['terms'].value === 'on') {
      this.registerForm.controls['terms'].setErrors(null)
    }

    if (this.registerForm.valid) {
      let data = {
        firstname: this.registerFormControl['firstname'].value,
        lastname: this.registerFormControl['lastname'].value,
        email: this.registerFormControl['email'].value,
        telephone: this.registerFormControl['telephone'].value,
        password: this.registerFormControl['password'].value
      }

      this.authService.userRegister(data).subscribe({
        next: (resp) => this.registerUser(resp),
        error: (err) => this.errorRegisteringUser(err),
      })
    }
  }

  registerUser(response: any) {      
    this.toastr.success('You have been registered. Please login', 'SUCCESS');
    this.router.navigate(['/auth/login'])
  }
  errorRegisteringUser(e: any) {
    this.toastr.error(e.error, 'ERROR');
  }

  confirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
}


