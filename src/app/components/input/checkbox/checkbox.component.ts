import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'InputCheckbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() name!: string
  @Input() cssClass!: string
  @Input() id!: string
  @Input() error!: boolean
  @Input() errorMessage!: string

  @Output() inputValue = new EventEmitter<boolean>()

  filter = false

  inputCheckboxValue(event: any) {
    this.filter = event
    this.inputValue.emit(this.filter)
  }
}