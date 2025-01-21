import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClient } from '@angular/common/http';
import { CountryChartComponent } from '../country-chart.component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-section-country',
  standalone: true,
  imports: [FormsModule, CommonModule, CheckboxModule,ButtonModule],
  templateUrl: './section-country.component.html',
  styleUrls: ['./section-country.component.css']
})
export class SectionCountryComponent {
  selectedCategories: any[] = [];
  categories: string[] = [];

  constructor(private http: HttpClient, private chartComponent: CountryChartComponent) {}

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
          this.chartComponent.updateChartData(this.selectedCategories, initialCounts);
        },
        error: (error) => {
          console.error('Error fetching countries:', error);
        }
      });
  }

  logSelected() {
    if (this.selectedCategories.length > 15) {
      alert('Chọn tối đa 15 nước');
      return; 
    }
    
    const requestBody = {
      countries: this.selectedCategories,
      year: "2024"
    };
  
    this.http.post('http://localhost:8080/api/data/search', requestBody)
      .subscribe({
        next: (response: any) => {
          console.log('Response from API:', response);
  
          if (response && response.countByCountry) {
            const counts = this.selectedCategories.map(category => response.countByCountry[category] || 0);
            this.chartComponent.updateChartData(this.selectedCategories, counts);
          } 
        }
      });
  }
  
  

  updateChartData(countries: string[], counts: number[]) {

  }
}
