import { Injectable } from '@angular/core';
import { Force } from './models/force/force.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  db: any;

  constructor() {
    this.db = this.getDb();
   }

  getDb() {
    return JSON.parse(localStorage.getItem("db"));
  }

  updateDb(data) {
    localStorage.setItem("db", data);
  }

  addCountry(country_name: string) {
    let db = this.db;
    if (db == null || db.length == 0) {
      db = {
        countries: [{country_name : country_name}]
      };
      console.log(db)
    }
    else {
      if (db.countries) {
        db.countries.push({country_name: country_name})
      }
    }

    localStorage.setItem("db", JSON.stringify(db));
  }

  getCountry(country_name: string) {
    let country = {};
    this.db.countries.forEach(c=> {
      if (c.country_name == country_name) {
        country = c;
      }
    });
    return country;
  }

  addForce(country_name, force: Force) {
    this.db.countries.forEach(country => {
      if (country.country_name == country_name) {
        if (!country.forces) {
          country.forces = [];
          country.forces.push(force)
        }
        else {
          country.forces.push(force)
        }
      }
    });

    localStorage.setItem("db", JSON.stringify(this.db));
  }

  removeCountry(country) {
    this.db.countries = this.db.countries.filter(function(c) {
      return c.country_name !== country.country_name;
    });
   localStorage.setItem("db", JSON.stringify(this.db));
  }

  removeForce(country_name, force_name) {
    this.db.countries.forEach(c => {
      if (c.country_name == country_name) {
        c.forces = c.forces.filter(function (f) {
          return f.force_name !== force_name;
        });
      }
    });
    localStorage.setItem("db", JSON.stringify(this.db));
  }
}
