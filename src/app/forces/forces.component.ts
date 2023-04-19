import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../file.service';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-forces',
  templateUrl: './forces.component.html',
  styleUrls: ['./forces.component.css']
})
export class ForcesComponent implements OnInit {

  @Input() country;
  displayedColumns: string[] = ['force_name', 'description'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.country.forces)
    this.sort.sort(({ id: 'description', start: 'desc'}) as MatSortable);
    this.dataSource.sort = this.sort;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
}
}
