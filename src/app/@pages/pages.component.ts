import { ResizedEvent } from 'angular-resize-event';
import { Component } from '@angular/core';
import { ScreenService } from '@core/services/screen.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent {
  constructor(private screenService: ScreenService) {}
  onResized(event: ResizedEvent): void {
    this.screenService.setSize({
      width: Math.round(event.newRect.width),
      height: Math.round(event.newRect.height)
    });
  }
}
