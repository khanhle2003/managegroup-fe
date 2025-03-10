import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DatatableComponent } from '../../../components/page/datatable/datatable.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-excel-import',
   imports: [DatatableComponent,ExcelImportComponent, MatMenuModule ],
  templateUrl: 'import-excel.component.html',
  styleUrls: ['import-excel.component.css'],
  standalone: true,
})
export class ExcelImportComponent {
  constructor(private http: HttpClient) {}

  importFile(apiUrl: string) {
    console.log('Gọi API:', apiUrl); // Debug
    this.http.post(apiUrl, {}).subscribe(response => {
      console.log('Import thành công', response);
    }, error => {
      console.error('Lỗi khi import', error);
    });
  }
}
