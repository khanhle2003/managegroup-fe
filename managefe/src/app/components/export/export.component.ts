import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-export',
  standalone: true,
  template: '', // Không cần HTML hiển thị
})
export class ExportComponent {
  httpClient = inject(HttpClient);

  exportExcel(data: any[]) {
    const selectedData = data.filter(item => item.selected);
    if (selectedData.length === 0) {
      alert('Vui lòng chọn');
      return;
    }

    this.httpClient.post('http://localhost:8080/api/export', selectedData, {
      responseType: 'blob',
    }).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'exported_data.xlsx';
        link.click();
      },
      (error) => {
        console.error('Export failed:', error);
        alert('Xuất file thất bại');
      }
    );
  }
}
