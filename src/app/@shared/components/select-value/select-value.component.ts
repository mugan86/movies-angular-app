import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-value',
  templateUrl: './select-value.component.html',
  styleUrls: ['./select-value.component.css']
})
export class SelectValueComponent {
  @Input() label!: string;
  @Input() hashtag: boolean = true;
  @Output() labelRemove = new EventEmitter<string>();
  remove() {
    this.labelRemove.emit(this.label);
  }
}
