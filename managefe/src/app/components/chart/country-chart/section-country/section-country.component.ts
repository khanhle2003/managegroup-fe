import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-section-country',
  standalone: true,
  imports: [FormsModule,CommonModule, CheckboxModule],
  templateUrl: './section-country.component.html',
  styleUrl: './section-country.component.css'
})
export class SectionCountryComponent {
  selectedCategories: any[] = [];
  categories: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCountries();
  }

  fetchCountries() {
    this.http.get<string[]>('http://localhost:8080/api/data/countries')
      .subscribe({
        next: (data: string[]) => {
          this.categories = data;
          this.selectedCategories = [this.categories[0]];
        },
        error: (error) => {
          console.error('Error fetching countries:', error);
        }
      });
  }
}
