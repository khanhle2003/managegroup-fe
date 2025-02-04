import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  trips: any[] = [];
  averageDaysByYear: { [key: number]: number | null } = {}; // Object to store average by year
  selectedYear: number | null = null; // Selected year
  averageDays: number | null = null; // Trung bình số ngày cho năm được chọn

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/auth/qldoan/columns').subscribe(data => {
      this.trips = data;
    });
  }

  onYearChange(): void {
    if (this.selectedYear !== null) {
      // Gọi API của backend để tính trung bình cho năm được chọn
      this.http.get<number>(`http://localhost:8080/auth/qldoan/average-by-year?year=${this.selectedYear}`).subscribe(
        (data) => {
          this.averageDays = data; // Gán giá trị trung bình cho biến
        },
        (error) => {
          console.error('Error fetching average by year', error);
          this.averageDays = null;
        }
      );
    } else {
      this.averageDays = null; // Nếu không chọn năm, gán trung bình là null
    }
  }
  getUniqueYears(): number[] {
    const years = this.trips.map(trip => new Date(trip.notificationDate).getFullYear());
    return [...new Set(years)]; // Lấy ra các năm duy nhất
  }
}
