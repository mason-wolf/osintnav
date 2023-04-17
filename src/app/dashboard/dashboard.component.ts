import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  country_name: string;
  db: any;
  countries: any[] = [];
  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.loadDb();
  }

  exportData() {
    let data = JSON.stringify(this.db);
    console.log(data);

    let blob = new Blob([data], {type: 'text/json'});
    const a = document.createElement('a');
    a.setAttribute('type', 'hidden');
    a.href = URL.createObjectURL(blob);
    a.download = 'db.json';
    a.click();
    a.remove();
  }
  
  loadDb() {
    this.db = this.fileService.getDb();
    this.countries = [];
    if (this.db && this.db.countries) {
      this.db.countries.forEach(country => {
        this.countries.push(country);
      });
    }
  }

  addCountry() {
    this.fileService.addCountry(this.country_name);
    this.loadDb();
  }

  removeCountry(country) {
    this.fileService.removeCountry(country);
    this.loadDb();
  }
}
