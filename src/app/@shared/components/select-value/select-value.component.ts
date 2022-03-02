import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-value',
  templateUrl: './select-value.component.html',
  styleUrls: ['./select-value.component.css']
})
export class SelectValueComponent {
  @Input() label!: string;
}
