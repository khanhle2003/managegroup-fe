import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DatatableComponent } from '../../layout2/main-layout/datatable/datatable.component';

@Component({
  selector: 'app-excel-import',
   imports: [DatatableComponent,ExcelImportComponent ],
  templateUrl: 'import-excel.component.html',
  styleUrls: ['import-excel.component.css'],
  standalone: true,
})
export class ExcelImportComponent {
  file: File | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Khi nhấn nút Upload
   * @param fileInput - Tham chiếu đến input file
   */
  onUploadClick(fileInput: HTMLInputElement): void {

    fileInput.click();
  }


  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0];
      console.log('File đã chọn:', this.file.name);


      this.uploadFile();
    }
  }


  uploadFile(): void {
    if (!this.file) {
      alert('Vui lòng chọn tệp trước!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);

    this.http.post('http://localhost:8080/api/import', formData).subscribe({
      next: (response) => {
        console.log('Tệp đã được tải lên:', response);
        alert('Tệp đã được import thành công!');
        
      },
      error: (err) => {
        console.error('Lỗi khi import file:', err);
      },
    });
  }
}
