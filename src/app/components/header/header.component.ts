import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../../models/user.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub$: Subscription;
  isAuthenticated = false;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub$ = this.authService.user$.subscribe((user: User) => {
      this.isAuthenticated = Boolean(user);
    });
  }

  ngOnDestroy(): void {
    this.userSub$.unsubscribe();
  }

  onSaveData(event: Event): void {
    event.preventDefault();
    this.dataStorageService.storeRecipes();
  }

  onFetchData(event: Event): void {
    event.preventDefault();

    this.dataStorageService
      .fetchRecipes()
      .subscribe();
  }

  onLogOut(event: Event): void {
    event.preventDefault();
    this.authService.logOutUser();
  }

}
