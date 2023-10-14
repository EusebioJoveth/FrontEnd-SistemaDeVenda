import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  userDados:any = {};
  imgDefault = "assets/images/user.png";
  constructor() { }

  ngOnInit(): void {
  }

  logout(){

  }

  openProfileDialog(){

  }

}
