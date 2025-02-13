import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YearService } from '../../../services/years.service';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  trips: any[] = [];
  averageDays: number | null = null;
  selectedYear: number | null = null;
  averageDaysByYear: { [key: number]: number | null } = {};

  constructor(private http: HttpClient, private yearService: YearService) {}

  ngOnInit(): void {

    this.http.get<any[]>('http://localhost:8080/auth/qldoan/columns').subscribe(data => {
      this.trips = data;
      this.calculateDaysDifference();
    });
  }

  calculateDaysDifference(): void {
    this.trips.forEach(trip => {

      if (!trip.notificationDate || !trip.ngayNghiPhep || trip.notificationDate === 'Không áp dụng' || trip.ngayNghiPhep === 'Không áp dụng') {
        trip.NgayTrungBinh = 1;
        return;
      }


      const notificationDate = this.convertToDate(trip.notificationDate);
      const ngayNghiPhep = this.convertToDate(trip.ngayNghiPhep);


      if (!notificationDate || !ngayNghiPhep) {
        trip.NgayTrungBinh = 1;
        return;
      }


      notificationDate.setHours(0, 0, 0, 0);
      ngayNghiPhep.setHours(0, 0, 0, 0);


      const timeDifference = ngayNghiPhep.getTime() - notificationDate.getTime();
      const NgayTrungBinh = timeDifference / (1000 * 3600 * 24);


      trip.NgayTrungBinh = NgayTrungBinh > 0 ? NgayTrungBinh : 1;
    });
  }


  private convertToDate(dateString: string): Date | null {
    if (!dateString) {

      return null; 
    }
    
    const parts = dateString.split('/'); 
    if (parts.length !== 3) {
      return null;
    }

    const [day, month, year] = parts.map(Number);
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return null;
    }

    return new Date(year, month - 1, day);
  }
  // calculateAverageDays(): void {
  //   const specificYear = 2024; // Năm cố định
  //   const validDays = this.trips
  //     .filter(trip => {
  //       if (!trip.notificationDate) return false;
  //       const year = new Date(this.convertToDate(trip.notificationDate)!).getFullYear();
  //       return year === specificYear; // Chỉ lọc dữ liệu cho năm 2024
  //     })
  //     .map(trip => trip.NgayTrungBinh);

  //   if (validDays.length > 0) {
  //     const total = validDays.reduce((sum, days) => sum + days, 0);
  //     this.averageDays = total / validDays.length;
  //   } else {
  //     this.averageDays = null;
  //   }
  // }


  onYearChange(): void {
    console.log(this.selectedYear);
    this.yearService.changeYear(this.selectedYear !== null ? this.selectedYear.toString() : '');

    if (this.selectedYear !== null) {
      this.http.get<number>(`http://localhost:8080/auth/qldoan/average-by-year?year=${this.selectedYear}`).subscribe(
        (data) => {
          this.averageDays = data;
        },
        (error) => {
          console.error('Error fetching average by year', error);
          this.averageDays = null;
        }
      );
    } else {
      this.averageDays = null;
    }
  }

  getUniqueYears(): number[] {
    const years = this.trips
      .map(trip => new Date(this.convertToDate(trip.notificationDate)!).getFullYear())
      .filter(year => !isNaN(year));
    return [...new Set(years)];
  }
}
