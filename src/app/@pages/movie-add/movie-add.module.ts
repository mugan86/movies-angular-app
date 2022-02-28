import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieAddComponent } from './movie-add.component';
import { MovieAddRoutingModule } from './movie-add-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MovieAddComponent
  ],
  imports: [
    CommonModule,
    MovieAddRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class MovieAddModule { }
