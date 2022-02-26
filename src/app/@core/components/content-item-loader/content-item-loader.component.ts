import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-item-loader',
  templateUrl: './content-item-loader.component.html',
  styleUrls: ['./content-item-loader.component.css']
})
export class ContentItemLoaderComponent implements OnInit {
  @Input() width: number = 390;
  @Input() height: number = 300;
  @Input() speed: number = 0.7;

  ngOnInit(): void {
    if (this.width < 120 && this.width > 600) {
      this.width = 390;
    }
    if (this.height < 120 && this.height > 400) {
      this.height = 300;
    }
    if (this.speed < 0.1 && this.speed > 1) {
      this.speed = 0.7;
    }
  }

}
