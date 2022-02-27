import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-info-card',
  templateUrl: './basic-info-card.component.html',
  styleUrls: ['./basic-info-card.component.css']
})
export class BasicInfoCardComponent implements OnInit {
  @Input() info!: { title: string, img: string, url: string, hashtags: string[]};
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.info === undefined) {
      
    }
  }

  goToDetails = (url: string) => this.router.navigateByUrl(url);

  trackByElement = (__: number, elementString: any): string => elementString;


}
