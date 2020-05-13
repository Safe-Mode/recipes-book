import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) { }

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

}
