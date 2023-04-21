import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  @Input() country;
  displayedColumns: string[] = ['vehicle_name', 'vehicle_type'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() viewVehicle: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource(this.country.vehicles)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  view(item) {
    this.viewVehicle.emit(item);
  }

  search(event) {
    let results = this.country.vehicles.filter(function (v) {
      return v.vehicle_name.toLowerCase().includes(event.toLowerCase())
    });
    this.dataSource = new MatTableDataSource(results);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
