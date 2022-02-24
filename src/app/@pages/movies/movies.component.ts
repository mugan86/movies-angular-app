import { Component } from '@angular/core';
import { TitleService } from '@core/services/title.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  constructor(private titleService: TitleService) { 
    this.titleService.change('Películas');
  }
}
