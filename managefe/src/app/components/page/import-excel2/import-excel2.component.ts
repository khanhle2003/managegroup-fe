import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DoanvaoComponent } from '../doanvao/doanvao.component';

@Component({
  selector: 'app-excel-import2',
   imports: [DoanvaoComponent,ExcelImportComponent2 ],
  templateUrl: 'import-excel2.component.html',
  styleUrls: ['import-excel2.component.css'],
  standalone: true,
})
export class ExcelImportComponent2 {
  file: File | null = null;


  constructor(private readonly http: HttpClient) {}

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

    this.http.post('http://localhost:8080/import2', formData).subscribe({
      next: (response) => {
        console.log('Tệp đã được tải lên:', response);
        alert('Tệp đã được import thành công!');
        window.location.reload();
      },
      error: (err) => {
        console.error('Lỗi khi import file:', err);
        window.location.reload();
      },
    });
  }
}
