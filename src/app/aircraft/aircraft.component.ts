import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent implements OnInit {

  @Input() country;
  displayedColumns: string[] = ['aircraft_name', 'aircraft_type'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() viewAircraft: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.country.aircraft)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  view(item) {
    this.viewAircraft.emit(item);
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  search(event) {
    let results = this.country.aircraft.filter(function (a) {
      return a.aircraft_name.toLowerCase().includes(event.toLowerCase())
    });
    
    this.dataSource = new MatTableDataSource(results);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
