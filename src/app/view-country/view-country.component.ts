import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../file.service';
import { Force } from '../models/force/force.model';


@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
  styleUrls: ['./view-country.component.css']
})
export class ViewCountryComponent implements OnInit {

  displayedColumns: string[] = ['force_name', 'type', 'location' , 'notes'];
  dataSource: any;
  country_name: string;
  force: Force = new Force();
  add_force = false;
  db: any;
  country: any;

  constructor(private route: ActivatedRoute, private fileService: FileService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.country_name = res.country_name;
    });

    this.country = this.fileService.getCountry(this.country_name);
    this.dataSource = this.country.forces;
    console.log(this.country.forces)
  }

  addForce() {
    this.fileService.addForce(this.country_name, this.force);
    this.force = new Force();
  }

  removeForce(force_name) {
    this.fileService.removeForce(this.country_name, force_name);
  }

  showForceForm() {
    if (this.add_force == false) {
      this.add_force = true;
    }
    else {
      this.add_force = false;
    }
  }

}
