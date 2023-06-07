import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  userLogOut(event: any) {
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
      
    this.toastr.success('User logged out successfully!', 'SUCCESS');
    this.router.navigate(['/auth/login'])
  }

}
