import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() viewSelected = new EventEmitter<string>();

  currentLink = 'recipes';

  constructor() { }

  ngOnInit() {
    this.viewSelected.emit(this.currentLink);
  }

  onNavLinkClicked(link: string) {
    this.currentLink = link;
    this.viewSelected.emit(this.currentLink);
  }
}
