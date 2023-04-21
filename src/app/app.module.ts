import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewCountryComponent } from './view-country/view-country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ForcesComponent } from './forces/forces.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WeaponsComponent } from './weapons/weapons.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AircraftComponent } from './aircraft/aircraft.component';
import { ShipsComponent } from './ships/ships.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ViewCountryComponent,
    ForcesComponent,
    WeaponsComponent,
    VehiclesComponent,
    AircraftComponent,
    ShipsComponent,
    MapComponent,
    SearchComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
