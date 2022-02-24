import { Component } from '@angular/core';
import { TitleService } from '@core/services/title.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
})
export class ActorsComponent {
  constructor(private titleService: TitleService) {
    this.titleService.change('Actores');
  }
}
