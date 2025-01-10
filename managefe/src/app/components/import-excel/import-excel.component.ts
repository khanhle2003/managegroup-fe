import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({

  selector: 'app-excel-import',
  templateUrl: 'import-excel.component.html',
  styleUrls: ['import-excel.component.css'],
  standalone: true
})
export class ExcelImportComponent {
  file: File | null = null;

  constructor(private http: HttpClient) {}

  // Handle file change event
  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0];
    }
  }


  onSubmit(): void {
    if (!this.file) {
      alert('Please select a file!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);

    this.http.post('http://localhost:8080/api/import', formData).subscribe({
      next: (response) => {
        alert('File uploaded successfully!');
        console.log(response);
      },
      error: (err) => {
        console.error('Error uploading file:', err);
        alert('Error uploading file. Please try again.');
      },
    });
  }




  saveToDatabase() {
    if (this.excelData.length === 0) {
      console.error('Không có dữ liệu để lưu');
      return;
    }

    const apiUrl = 'http://localhost:8080/api/excel/upload'; // Thay đổi endpoint phù hợp với backend của bạn
    this.http.post(apiUrl, this.excelData).subscribe({
      next: (response) => {
        console.log('Dữ liệu đã được lưu thành công:', response);
        alert('Lưu dữ liệu thành công!');
      },
      error: (error) => {
        console.error('Lỗi khi lưu dữ liệu:', error);
        alert('Có lỗi xảy ra khi lưu dữ liệu!');
      },
    });
}
}