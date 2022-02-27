import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hashtag',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.css']
})
export class HashtagComponent {
  @Input() hashtag: string = '';
}
