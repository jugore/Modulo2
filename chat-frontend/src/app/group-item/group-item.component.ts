import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {

  @Input() option: string | undefined
  @Input() nameGroup: string | undefined
  @Input() functionCorrect: string | undefined
  @Output() buttonSelected: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  onSelectBtn(){
    this.buttonSelected?.emit()
  }

}
