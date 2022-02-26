import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-items-loader',
  templateUrl: './content-items-loader.component.html',
  styleUrls: ['./content-items-loader.component.css'],
})
export class ContentItemsLoaderComponent implements OnInit {
  @Input('elementsShow') elementsShow: number = 6;
  items: Array<number> = [];

  ngOnInit(): void {
    this.items = Array.from({ length: this.elementsShow }, (_, i) => i + 1);
  }

  trackById(index: number) {
    return index;
  }
}
