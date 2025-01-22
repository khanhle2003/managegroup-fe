import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent implements OnInit {
  trips: any[] = [];
  averageDays: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
    this.http.get<any[]>('http://localhost:8080/auth/qldoan/columns').subscribe(data => {
      this.trips = data;
      this.calculateDaysDifference(); 
      this.calculateAverageDays();
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

  calculateAverageDays(): void {
    // Lọc các giá trị hợp lệ (có số ngày)
    const validDays = this.trips
      .filter(trip => trip.NgayTrungBinh !== undefined && trip.NgayTrungBinh !== null)
      .map(trip => trip.NgayTrungBinh);

    if (validDays.length > 0) {
      // Tính trung bình
      const total = validDays.reduce((sum, days) => sum + days, 0);
      this.averageDays = total / validDays.length;
    } else {
      this.averageDays = null; // Không có giá trị hợp lệ
    }
  }
}
