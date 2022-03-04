import { NavigationService } from '@core/services';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-info-card',
  templateUrl: './basic-info-card.component.html',
  styleUrls: ['./basic-info-card.component.css']
})
export class BasicInfoCardComponent {
  @Input() info!: { title: string, img: string, url: string, hashtags: string[]};
  constructor(private navigationService: NavigationService) { }

  goToDetails = (url: string) => this.navigationService.goTo(url);

  trackByElement = (__: number, elementString: any): string => elementString;


}
