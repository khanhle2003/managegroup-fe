import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trip2',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  templateUrl: './trip2.component.html',
  styleUrls: ['./trip2.component.css']
})
export class Trip2Component implements OnInit {
  trips: any[] = [];
  averageDays: number | null = null;
  selectedYear: number | null = null;
  averageDaysByYear: { [key: number]: number | null } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/auth/qldoan/columns2').subscribe(data => {
      this.trips = data.map(item => ({
        TuNgay: item.notificationDate,
        DenNgay: item.ngayNghiPhep
      }));
      this.calculateDaysDifference();
    });
  }

  calculateDaysDifference(): void {
    this.trips.forEach(trip => {
      if (!trip.TuNgay || !trip.DenNgay || trip.TuNgay === 'Không áp dụng' || trip.DenNgay === 'Không áp dụng') {
        trip.NgayTrungBinh = 1;
        return;
      }

      const TuNgay = this.convertToDate(trip.TuNgay);
      const DenNgay = this.convertToDate(trip.DenNgay);

      if (!TuNgay || !DenNgay) {
        trip.NgayTrungBinh = 1;
        return;
      }

      TuNgay.setHours(0, 0, 0, 0);
      DenNgay.setHours(0, 0, 0, 0);

      const timeDifference = DenNgay.getTime() - TuNgay.getTime();
      const NgayTrungBinh = timeDifference / (1000 * 3600 * 24);

      trip.NgayTrungBinh = NgayTrungBinh > 0 ? NgayTrungBinh : 1;
    });
  }

  private convertToDate(dateString: string): Date | null {
    if (!dateString || dateString === 'Không áp dụng') {
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

  onYearChange(): void {
    console.log('Selected Year:', this.selectedYear);
    if (this.selectedYear !== null) {
      this.http.get<number>(`http://localhost:8080/auth/qldoan/average-by-year2?year=${this.selectedYear}`).subscribe(
        (data) => {
          console.log('Average Days:', data);
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
    return this.trips
      .filter(trip => trip.TuNgay && trip.TuNgay !== 'Không áp dụng') // Lọc các giá trị null và không hợp lệ
      .map(trip => {
        const date = this.convertToDate(trip.TuNgay);
        return date ? date.getFullYear() : null;
      })
      .filter((year): year is number => year !== null) // Lọc bỏ các giá trị null
      .filter((year, index, self) => self.indexOf(year) === index) // Loại bỏ các giá trị trùng lặp
      .sort((a, b) => a - b); // Sắp xếp tăng dần
  }
}
