import { Component } from '@angular/core';

import { RouterModule, RouterOutlet } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { CountryChartComponent } from '../../chart/country-chart/country-chart.component';
import { InvtChartComponent } from '../../chart/invt-chart/invt-chart.component';
import { TripComponent } from '../../chart/trip/trip.component';
import { Trip2Component } from '../../chart/trip2/trip2.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, ChartModule, CountryChartComponent, InvtChartComponent, TripComponent, Trip2Component],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  {

}
