import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'InputText',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent {
  @Input() name!: string
  @Input() cssLabelClass!: string
  @Input() labelText!: string
  @Input() icon!: string
  @Input() id!: string
  @Input() type!: string
  @Input() placeHolder!: string
  @Input() cssInputClass!: string
  @Input() error!: boolean
  @Input() errorMessage!: string

  @Output() inputValue = new EventEmitter<string>()

  public value!: any

  emitInputValue() {
    // console.log('Value:', this.value)
  }

  inputTextValue(event: any) {
    // console.log('Value:', event.target.value)
    this.inputValue.emit(event.target.value)
  }
}
