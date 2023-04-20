import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource(this.country.weapons)
   // this.sort.sort(({ id: 'force_name', start: 'asc'}) as MatSortable);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    // this.country.weapons.forEach(weapon => {
    //   console.log(weapon);
    // })
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
}
