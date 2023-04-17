import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewCountryComponent } from './view-country/view-country.component';

const routes: Routes = [
   {path: "", component: DashboardComponent },
   {path: "view-country/:country_name", component: ViewCountryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
