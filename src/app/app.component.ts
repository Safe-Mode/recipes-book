import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from './services/auth.service';
import * as AuthActions from './store/auth/auth.actions';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    // Managing state via rxjs
    // this.authService.autoLogIn();

    // Managing state via ngRx
    this.store.dispatch(new AuthActions.AutoLogin());
  }

}
