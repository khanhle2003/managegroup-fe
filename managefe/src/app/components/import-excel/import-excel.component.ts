import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-excel',
  standalone: true,
  imports: [],
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
      };

      reader.readAsArrayBuffer(file);
    }
  }
}
