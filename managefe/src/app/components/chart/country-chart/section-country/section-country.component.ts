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
  imports: [FormsModule, CommonModule, CheckboxModule, ButtonModule],
  templateUrl: './section-country.component.html',
  styleUrls: ['./section-country.component.css']
})
export class SectionCountryComponent {
  selectedCategories: any[] = [];
  categories: string[] = [];
  years: number[] = [];
  selectedYear: number = new Date().getFullYear(); // Mặc định là năm hiện tại

  constructor(private http: HttpClient, private chartComponent: CountryChartComponent) {
    this.generateYears();
  }

  ngOnInit() {
    this.fetchCountries();
  }

  generateYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 2000; i--) {
      this.years.push(i);
    }
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
      year: this.selectedYear // Lấy năm từ dropdown
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

    this.http.post('http://localhost:8080/api/data/countrydoanra', requestBody)
      .subscribe({
        next: (data: any) => {
          console.log('Dữ liệu từ API countrydoanra:', data);
          if (data && data.countByCountry) {
            const countsFromSecondAPI = this.selectedCategories.map(category => data.countByCountry[category] || 0);
            this.chartComponent.updateChartData(this.selectedCategories, countsFromSecondAPI);
          }
        },
        error: (error) => {
          console.error('Lỗi khi lấy dữ liệu từ API countrydoanra:', error);
        }
      });
  }
}
