import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.show') isShown: boolean;

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.preventDefault();

    this.isShown = !this.isShown;
    this
      .elementRef
      .nativeElement
      .querySelector('.dropdown-menu')
      .classList
      .toggle('show');
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit() { }
}
