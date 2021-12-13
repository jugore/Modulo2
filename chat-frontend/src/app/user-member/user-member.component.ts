import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-user-member',
  templateUrl: './user-member.component.html',
  styleUrls: ['./user-member.component.css']
})
export class UserMemberComponent implements OnInit {
  
  @Input() imageUrl: string | undefined 
  @Input() userName: string | undefined
  correctUrl:boolean=true 
  constructor() { }

  ngOnInit(): void {
    if(this.imageUrl==null){
      this.imageUrl="https://www.drnitinborse.com/wp-content/uploads/2018/02/user-icon.png"
    }
    this.checkImage("https://firebasestorage.googleapis.com/v0/b/chatapp-df8a1.appspot.com/o/New%20Project%202.jpg?alt=media&token=7e76sdsdsdsds80bd-1c29-427a-aaef-e4ff0514dafa")

  }

  checkImage(imageSrc:any) {
    let correctUrlImg=true
    var img = new Image();
    img.oninvalid
    let correct= img.onload = function(){
      correctUrlImg=true
    }; 
    img.onerror = function(){
      return correctUrlImg=false
    }; ;
    img.src = imageSrc;
    console.log("EL NEGRO LA CGHUPA:",correctUrlImg)
    return correctUrlImg
  }


}
