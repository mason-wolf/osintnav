import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  @Input() country;
  add_weapon = false;
  displayedColumns: string[] = ['weapon_name', 'weapon_type'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() viewWeapon: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource(this.country.weapons)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  showWeaponForm() {
    if (!this.add_weapon) {
      this.add_weapon = true;
    }
    else {
      this.add_weapon = false;
    }
  }

  view(item) {
    this.viewWeapon.emit(item);
  }

  search(event) {
    let results = this.country.weapons.filter(function (w) {
      return w.weapon_name.toLowerCase().includes(event.toLowerCase())
    });
    this.dataSource = new MatTableDataSource(results);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
