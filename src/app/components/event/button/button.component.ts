import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'EventButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() btnCss!: string
  @Input() btnText!: string


}
