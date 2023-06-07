import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../api/api.service'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  constructor(
    private apiService: ApiService
  ) {}

  userLogin(userCredentials: any): Observable<any> {
    return this.apiService.post('login', userCredentials)
  }

  userRegister(userCredentials: any): Observable<any> {
    return this.apiService.post('register', userCredentials)
  }

  userForgottenPassword(userCredentials: any): Observable<any> {
    return this.apiService.post('forgotten-password', userCredentials)
  }
}
