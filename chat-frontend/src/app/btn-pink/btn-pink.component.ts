import { Component,EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-pink',
  templateUrl: './btn-pink.component.html',
  styleUrls: ['./btn-pink.component.css']
})
export class BtnPinkComponent implements OnInit {

  constructor() { }

  @Input() name: string | undefined
  @Output() buttonSelected: EventEmitter<any> = new EventEmitter()
  ngOnInit(): void {
  }

  onSelectBtn(){
    this.buttonSelected?.emit()
  }
}
