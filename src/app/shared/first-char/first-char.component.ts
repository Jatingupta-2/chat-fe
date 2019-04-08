import { Component, OnInit, EventEmitter,OnChanges,SimpleChanges,Input, Output } from '@angular/core';


@Component({
  selector: 'first-char',
  templateUrl: './first-char.component.html',
  styleUrls: ['./first-char.component.css']
})
export class FirstCharComponent implements OnInit {
  @Input() name:string;
  @Input() userBg:string;
  @Input() userColor:string;

  public firstChar:string;
  private _name:string='';

  @Output()
  notify:EventEmitter<string>= new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this._name=this.name;
    this.firstChar=this._name[0];
  }

  ngOnChanges(changes:SimpleChanges){
    let name=changes.name;
    this._name=this.name;
    this.firstChar=this._name[0];

  }

  nameClicked(){
    this.notify.emit(this._name);
  }  

}
