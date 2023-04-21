import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FileService } from '../file.service';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Force } from '../models/force/force.model';
import { MatDialog } from '@angular/material/dialog';
import { ViewItem } from '../models/force/view-item.model';


@Component({
  selector: 'app-forces',
  templateUrl: './forces.component.html',
  styleUrls: ['./forces.component.css']
})
export class ForcesComponent implements OnInit {

  @Input() country;
  @Output() viewForce: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['force_name', 'description'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.country.forces)
    this.sort.sort(({ id: 'force_name', start: 'asc'}) as MatSortable);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  view(item) {
    this.viewForce.emit(item);
  }

  search(event) {
    let results = this.country.forces.filter(function (f) {
      return f.force_name.toLowerCase().includes(event.toLowerCase())
    });
    this.dataSource = new MatTableDataSource(results);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
