import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthResponseData, AuthService } from '../../services/auth.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { DynamicCmpHostDirective } from '../../shared/directives/dynamic-cmp-host.directive';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../store/auth/auth.reducer';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild(DynamicCmpHostDirective) modalHost;

  private closeSub: Subscription;

  isLoginMode = true;
  isLoading = false;
  error = null;
  isTypePassword = true;
  isRepeatTypePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cfr: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    // Managing state via ngRx
    this.store
      .select('auth')
      .subscribe(({ isLoading, authError }: fromAuth.State) => {
        this.isLoading = isLoading;
        this.error = authError;
      });
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

    // Managing state via ngRx
    this.store.dispatch(new AuthActions.ClearError());
  }

  onAuthFormSubmit(form: NgForm): void {
    if (form.valid) {
      const { email, password } = form.value;

      // Manging state via rxjs
      // const authMethod = (this.isLoginMode) ? 'logInUser' : 'signUpUser';
      // let authObs: Observable<AuthResponseData>;
      //
      // this.isLoading = true;
      // authObs = this.authService[authMethod](email, password);

      // authObs.subscribe(
      //   () => {
      //     this.error = null;
      //     this.isLoading = false;
      //     this.router.navigate(['/']);
      //   },
      //   (errorMessage: string) => {
      //     this.error = errorMessage;
      //     // this.showErrorModal(errorMessage);
      //     this.isLoading = false;
      //   }
      // );

      // Managing state via ngRx
      const authEffect = (this.isLoginMode) ? 'LoginStart' : 'SignUpStart';
      this.store.dispatch(new AuthActions[authEffect]({ email, password }));
    }
  }

}
