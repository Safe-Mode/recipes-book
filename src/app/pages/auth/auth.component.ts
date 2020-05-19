import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onAuthFormSubmit(form: NgForm): void {
    if (form.valid) {
      const { email, password } = form.value;
      const authMethod = (this.isLoginMode) ? 'logInUser' : 'signUpUser';
      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      authObs = this.authService[authMethod](email, password);

      authObs.subscribe(
        (response: AuthResponseData) => {
          console.log(response);
          this.error = null;
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        (errorMessage: string) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }
  }

}
