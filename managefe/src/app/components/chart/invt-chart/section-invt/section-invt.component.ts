import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InvtChartComponent } from '../invt-chart.component';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-section-invt',
  standalone: true,
  imports: [FormsModule,CommonModule, CheckboxModule,ButtonModule],
  templateUrl: './section-invt.component.html',
  styleUrl: './section-invt.component.css'
})
export class SectionInvtComponent {
  selectedCategories: any[] = [];
   categories: any[] = [];
   constructor(private http: HttpClient, private chartComponent: InvtChartComponent) {}
    ngOnInit() {
       this.fetchCountries();
       this.logSelected;
    }


    fetchCountries() {
      this.http.get<string[]>('http://localhost:8080/api/data/invitation')
        .subscribe({
          next: (data: string[]) => {
            this.categories = data;
            this.selectedCategories = this.categories.slice(0, 10);
            
        
        
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
        invitationUnits: this.selectedCategories,
        year: "2024"
      };
    
      this.http.post('http://localhost:8080/api/search/invitation', requestBody, {
          headers: { 'Content-Type': 'application/json' }
      })
        .subscribe({
          next: (response: any) => {
            console.log('Response from API:', response);
    
            if (response && response.countByUnit) {
              const counts = this.selectedCategories.map(category => response.countByUnit[category] || 0);
              this.chartComponent.updateChartData(this.selectedCategories, counts);
            } 
          }
        });
    }
    updateChartData(invitationUnits: string[], counts: number[]) {

    }
}
