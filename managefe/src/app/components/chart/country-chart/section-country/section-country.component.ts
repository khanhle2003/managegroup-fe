import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClient } from '@angular/common/http';
import { CountryChartComponent } from '../country-chart.component';
import { ButtonModule } from 'primeng/button';
import { forkJoin } from 'rxjs';
import { YearService } from '../../../../services/year.service';



@Component({
  selector: 'app-section-country',
  standalone: true,
  imports: [FormsModule, CommonModule, CheckboxModule, ButtonModule],
  templateUrl: './section-country.component.html',
  styleUrls: ['./section-country.component.css']
})
export class SectionCountryComponent {
  selectedCategories: any[] = [];
  categories: string[] = [];

  selectedYear: string = "2012";
  
  constructor(
    private http: HttpClient, 
    private chartComponent: CountryChartComponent, 
    private yearService: YearService
  ) {
    this.yearService.currentYear.subscribe(year => {
      this.selectedYear = year;
    });
  }

  ngOnInit() {
    this.fetchCountries();

  }
  fetchCountries() {
    this.http.get<string[]>('http://localhost:8080/api/data/countries')
      .subscribe({
        next: (data: string[]) => {
          this.categories = data;
          this.selectedCategories = this.categories.slice(0, 10);

          const initialCounts = new Array(this.selectedCategories.length).fill(0);
          this.chartComponent.updateChartData(this.selectedCategories, initialCounts, []);
        },
        error: (error) => {
          console.error('Error fetching countries:', error);
        }
      });
  }

  onSelectionChange() {
    if (this.selectedCategories.length > 15) {
      alert('Chọn tối đa 15 nước');

      // Revert the last selection by removing the last added item
      this.selectedCategories = this.selectedCategories.slice(0, 15);
      return;
    }
    this.logSelected();
  }

  logSelected() {
    const requestBody = {
      countries: this.selectedCategories,
      year: this.selectedYear
    };
    
    forkJoin({
      firstAPI: this.http.post('http://localhost:8080/api/search/country', requestBody),
      secondAPI: this.http.post('http://localhost:8080/api/search/countrydoanra', requestBody)
    }).subscribe({
      next: (results: any) => {
        const firstCounts = this.selectedCategories.map(category => 
          results.firstAPI.countByCountry[category] || 0
        );
        const secondCounts = this.selectedCategories.map(category => 
          results.secondAPI.countByCountry[category] || 0
        );
        
        this.chartComponent.updateChartData(this.selectedCategories, firstCounts, secondCounts);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  updateChartData(countries: string[], counts: number[], countsFromSecondAPI: number[]) {
  }
}

