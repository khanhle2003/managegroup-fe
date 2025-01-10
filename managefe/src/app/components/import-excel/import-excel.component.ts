import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-excel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import-excel.component.html',
  styleUrl: './import-excel.component.css'
})
export class ImportExcelComponent {
  onImportExcel() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // Mở hộp thoại chọn file
    }
  }
  excelData: any[] = []
  constructor(private http: HttpClient) {}
  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Lấy tên sheet đầu tiên
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet); // Chuyển sheet thành JSON
        console.log('Excel Data:', jsonData);
        this.excelData = jsonData; 
        this.saveToDatabase();
      };

      reader.readAsArrayBuffer(file);
    }
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