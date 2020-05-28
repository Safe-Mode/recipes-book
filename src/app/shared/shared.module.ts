import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './directives/dropdown.directive';
import { DynamicCmpHostDirective } from './directives/dynamic-cmp-host.directive';
import { EqualPasswordValidatorDirective } from './directives/equal-password.directive';
import { ShortenPipe } from './shorten.pipe';
import { LogoComponent } from './components/logo/logo.component';
import { ModalComponent } from './components/modal/modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DropdownDirective,
    DynamicCmpHostDirective,
    EqualPasswordValidatorDirective,
    ShortenPipe,
    LogoComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DropdownDirective,
    DynamicCmpHostDirective,
    EqualPasswordValidatorDirective,
    ShortenPipe,
    LogoComponent,
    ModalComponent,
    CommonModule
  ],
  entryComponents: [ModalComponent]
})
export class SharedModule { }
