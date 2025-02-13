import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InvtChartComponent } from '../invt-chart.component';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { forkJoin } from 'rxjs';
import { YearService } from '../../../../services/years.service';
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
   isDisabled: boolean = false;
   selectedYear:string = '2012';
   constructor(private http: HttpClient, private chartComponent: InvtChartComponent, private cdr: ChangeDetectorRef,    private yearService: YearService) {
    this.yearService.currentYear.subscribe(year => {
      this.selectedYear = year;
    });
   }
    ngOnInit() {
       this.fetchCountries();
       this.logSelected();
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
      if (this.selectedCategories.length === 0) {
        this.isDisabled = true;
        return; 
      } else if (this.selectedCategories.length > 15) {
        this.isDisabled = true;
        return; 
      } else {
        this.isDisabled = false;
      }

      this.cdr.detectChanges();

      const requestBody = {
        invitationUnits: this.selectedCategories,
        year: this.selectedYear,
      };

      console.log('Request Body:', requestBody);
    
      forkJoin({
        firstAPI: this.http.post('http://localhost:8080/api/search/invitation/doanra', requestBody),
      }).subscribe({
        next: (results: any) => {
          const firstCounts = this.selectedCategories.map(category => 
            results.firstAPI.countByUnit[category] || 0
          );
         
          this.chartComponent.updateChartData(this.selectedCategories, firstCounts);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
    }
    updateChartData(invitationUnits: string[], counts: number[]) {

    }
}
