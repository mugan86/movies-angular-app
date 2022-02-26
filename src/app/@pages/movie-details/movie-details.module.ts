import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { DetailsContentItemModule } from '@core/components';

@NgModule({
  declarations: [MovieDetailsComponent, DurationPipe],
  imports: [CommonModule, MovieDetailsRoutingModule, DetailsContentItemModule],
})
export class MovieDetailsModule {}
