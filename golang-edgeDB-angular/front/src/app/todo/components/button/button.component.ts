import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonIcon} from "../../models/view/buton-icon";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input()
  iconLabel!: ButtonIcon|undefined;

  @Input()
  active!: boolean;

  @Output()
  click = new EventEmitter();

  onClick() {
    if (this.active) {
      this.click.emit();
    }
  }

}
