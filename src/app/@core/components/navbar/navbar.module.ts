import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, TranslateModule.forChild()],
  exports: [NavbarComponent, TranslateModule],
})
export class NavbarModule {}
