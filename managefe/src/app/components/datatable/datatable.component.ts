import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';

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
  totalItems = 2;
  pageInput = 1;
  // Filters
  searchTerm = '';
  startDate = '';
  endDate = '';
  showCheckbox: boolean = false;
  router = inject(Router);

  ngOnInit(): void {
    this.fetchData();
  }

  goToDetailPage(id: number) {
    this.router.navigate(['/user-detail', id]);
  }

  fetchData() {
    this.httpClient.get('http://localhost:8080/auth/qldoan').subscribe((data: any) => {
      this.originalData = data;
      this.filteredData = [...this.originalData];
      this.loadPage(1);
    });
  }

  hideCheckbox() {
    this.showCheckbox = !this.showCheckbox;
    if (!this.showCheckbox) {
      this.originalData.forEach(item => item.selected = false);
      this.data.forEach(item => item.selected = false);
    }
  }

  selectAll(event: any) {
    const checked = event.target.checked;
    this.data.forEach(item => item.selected = checked);
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.pageInput = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredData.sort((a: any, b: any) => {
      const parseDate = (date: string | null | undefined) => {
        if (!date) return 0;
        if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
          const [day, month, year] = date.split('/').map(Number);
          return new Date(year, month - 1, day).getTime();
        }
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return new Date(date).getTime();
        }
        if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) {
          return new Date(date).getTime();
        }
        console.warn(`Invalid date format: ${date}`);
        return 0;
      };

      const dateA = parseDate(a.notificationDate);
      const dateB = parseDate(b.notificationDate);
      return dateB - dateA;
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
      alert('Vui lòng chọn dữ liệu');
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

  exportAllExcel() {
    if (this.originalData.length === 0) {
      alert('Không có dữ liệu để xuất');
      return;
    }

    const dataWithoutId = this.originalData.map(({ id, ...rest }) => rest);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataWithoutId);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dữ liệu');

    const fileName = `danh_sach_du_lieu_${new Date().toLocaleDateString()}.xlsx`;

    XLSX.writeFile(wb, fileName);
  }
}
