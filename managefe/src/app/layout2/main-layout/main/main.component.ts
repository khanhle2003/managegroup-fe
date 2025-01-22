import { Component } from '@angular/core';

import { RouterModule, RouterOutlet } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { CountryChartComponent } from '../../../components/chart/country-chart/country-chart.component';
import { InvtChartComponent } from '../../../components/chart/invt-chart/invt-chart.component';
import { ChooseyearComponent } from "../../../components/chart/chooseyear/chooseyear.component";
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, ChartModule, CountryChartComponent, InvtChartComponent, ChooseyearComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  {

}
