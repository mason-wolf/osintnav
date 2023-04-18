import { Component, Input, OnInit } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-forces',
  templateUrl: './forces.component.html',
  styleUrls: ['./forces.component.css']
})
export class ForcesComponent implements OnInit {

  @Input() country;
  displayedColumns: string[] = ['force_name', 'location' ];
  dataSource: any;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.dataSource = this.country.forces;
  }

}
