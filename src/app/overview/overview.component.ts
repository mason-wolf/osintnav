import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @Input() country;

  constructor() { }

  ngOnInit(): void {
    console.log(this.country.news);
  }

}
