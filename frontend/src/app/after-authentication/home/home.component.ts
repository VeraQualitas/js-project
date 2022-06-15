import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../after-authentication.scss', './home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  panelOpenState = true;

  ngOnInit(): void {
  }

}
