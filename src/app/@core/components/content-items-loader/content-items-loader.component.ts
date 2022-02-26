import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-items-loader',
  templateUrl: './content-items-loader.component.html',
  styleUrls: ['./content-items-loader.component.css'],
})
export class ContentItemsLoaderComponent implements OnInit{
  @Input('elementsShow') elementsShow: number = 6;
  items: Array<number> = [];

  ngOnInit(): void {
    console.log(this.elementsShow)
    this.items = Array.from({length: this.elementsShow}, (x, i) => i + 1)
    
  }

  trackByItem(index: number, item: any) {
    return index;
  }
}
