import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
})
export class DatatableComponent implements OnInit {
  httpClient = inject(HttpClient);
  originalData: any[] = [];
  filteredData: any[] = [];
  data: any[] = [];
  currentPage = 1;
  itemsPerPage = 12;
  totalItems = 0;
  pageInput = 1;
  // Filters
  searchTerm = '';
  startDate = '';
  endDate = '';
  showCheckbox :boolean = false;
  router = inject(Router);
  ngOnInit(): void {
    this.fetchData();
  }

  goToDetailPage(id: number) {
    this.router.navigate(['/user-detail', id]); }
  fetchData() {
    this.httpClient.get('http://localhost:8080/auth/qldoan').subscribe((data: any) => {
      this.originalData = data;
      this.filteredData = [...this.originalData];
      this.loadPage(1);
    });
  }
  hideCheckbox(){
    this.showCheckbox =  !this.showCheckbox;
    if (!this.showCheckbox) {
      this.originalData.forEach(item => item.selected = false);
      this.data.forEach(item => item.selected = false);}
  }


  selectAll(event : any ){
    const checked = event.target.checked
    this.data.forEach(item => item.selected = checked)

  }
  loadPage(page: number) {
    this.currentPage = page;
    this.pageInput = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredData.sort((a: any, b: any) => {
      const parseDate = (date: string | null | undefined) => {
        // Kiểm tra nếu giá trị null hoặc undefined
        if (!date) {
          return 0; // Giá trị null hoặc undefined sẽ được xử lý như ngày cũ nhất
        }
        // Kiểm tra nếu ngày có định dạng dd/MM/yyyy
        if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
          const [day, month, year] = date.split('/').map(Number);
          return new Date(year, month - 1, day).getTime();
        }
        // Kiểm tra nếu ngày có định dạng yyyy-MM-dd
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return new Date(date).getTime();
        }
        // Kiểm tra nếu ngày có định dạng yyyy-MM-dd HH:mm:ss
        if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) {
          return new Date(date).getTime();
        }
        // Trường hợp không khớp định dạng nào (xử lý lỗi nhẹ)
        console.warn(`Invalid date format: ${date}`);
        return 0; // Giá trị không hợp lệ sẽ được xử lý như ngày cũ nhất
      };

      const dateA = parseDate(a.notificationDate);
      const dateB = parseDate(b.notificationDate);

      return dateB - dateA; // Sắp xếp từ mới đến cũ
    });



    this.data = this.filteredData.slice(startIndex, endIndex);
    this.totalItems = this.filteredData.length;
  }

  goToPage() {
    if (this.pageInput > 0 && this.pageInput <= this.getTotalPages()) {
      this.loadPage(this.pageInput);
    } else {
      alert(`Số trang không vượt quá ${this.getTotalPages()}`);
    }
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.loadPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1);
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  filterData() {
    const term = this.searchTerm.toLowerCase() || '';
    const start = this.startDate ? new Date(this.startDate).getTime() : null;
    const end = this.endDate ? new Date(this.endDate).getTime() : null;
    this.filteredData = this.originalData.filter((item) => {
      const nameMatch = item.fullName?.toLowerCase().includes(term) || false;
      const countryMatch = item.country?.toLowerCase().includes(term) || false;
      const unitMatch = item.unit?.toLowerCase().includes(term) || false;
      const notiMatch = item.notificationDate?.toLowerCase().includes(term) || false;
      const itemStartDate = item.startDate ? new Date(item.startDate).getTime() : null;
      const itemEndDate = item.endDate ? new Date(item.endDate).getTime() : null;
      const dateInRange =
        (!start || (itemStartDate && itemStartDate >= start)) &&
        (!end || (itemEndDate && itemEndDate <= end));
      return (nameMatch || countryMatch || unitMatch || notiMatch) && dateInRange;
    });
    this.loadPage(1);
  }


  resetFilters() {
    this.searchTerm = '';
    this.startDate = '';
    this.endDate = '';
    this.filteredData = [...this.originalData];
    this.loadPage(1);
  }

  exportExcel() {
    const selectedData = this.originalData.filter(item => item.selected);
    if (selectedData.length === 0) {
      alert('Vui long chọn');
      return;
    }

    this.httpClient.post('http://localhost:8080/api/export', selectedData, {
      responseType: 'blob'
    }).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'exported_data.xlsx';
        link.click();
      },
      error => {
        console.error('Export failed:', error);
        alert('Xuất file thất bại');
      }
    );
  }
}

