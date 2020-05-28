import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthResponseData, AuthService } from '../../services/auth.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { DynamicCmpHostDirective } from '../../shared/directives/dynamic-cmp-host.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  @ViewChild(DynamicCmpHostDirective, { static: false }) modalHost;

  private closeSub: Subscription;

  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cfr: ComponentFactoryResolver
  ) {
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorModal(message: string): void {
    const modalFactory = this.cfr.resolveComponentFactory(ModalComponent);
    const modalHostVCRef = this.modalHost.vcRef;

    modalHostVCRef.clear();

    const modalComponentRef = modalHostVCRef.createComponent(modalFactory);

    modalComponentRef.instance.message = message;

    this.closeSub = modalComponentRef.instance.closed.subscribe(() => {
      this.closeSub.unsubscribe();
      modalHostVCRef.clear();
    });
  }

  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }

  onAuthFormSubmit(form: NgForm): void {
    if (form.valid) {
      const { email, password } = form.value;
      const authMethod = (this.isLoginMode) ? 'logInUser' : 'signUpUser';
      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      authObs = this.authService[authMethod](email, password);

      authObs.subscribe(
        () => {
          this.error = null;
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        (errorMessage: string) => {
          this.error = errorMessage;
          // this.showErrorModal(errorMessage);
          this.isLoading = false;
        }
      );
    }
  }

}
