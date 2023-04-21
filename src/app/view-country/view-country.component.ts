import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../file.service';
import { Force } from '../models/force/force.model';
import { ViewItem } from '../models/force/view-item.model';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
  styleUrls: ['./view-country.component.css']
})
export class ViewCountryComponent implements OnInit {

  country_name: string;
  force: Force = new Force();
  add_force = false;
  db: any;
  country: any;
  viewItem: ViewItem = new ViewItem();
  @ViewChild('viewItemDialog') viewItemDialog: TemplateRef<any>;

  constructor(private route: ActivatedRoute, private fileService: FileService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.country_name = res.country_name;
    });

    this.country = this.fileService.getCountry(this.country_name);
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

  view(item) {
    console.log(item);
    for (var itemType in item) {
      if (itemType.includes('force_name')) {
        this.viewItem.id = item.id;
        this.viewItem.name = item.force_name;
        this.viewItem.description = item.description;
      }
      if (itemType.includes('weapon_name')) {
        this.viewItem.id = item.id;
        this.viewItem.name = item.weapon_name;
        this.viewItem.description = item.description;
        console.log(item)
      }
    }
    this.dialog.open(this.viewItemDialog);
  }
}
