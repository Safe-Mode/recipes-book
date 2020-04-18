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

  @HostListener('click', ['$event.target']) onClick(element: Element) {
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
