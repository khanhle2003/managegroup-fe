import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
})
export class DatatableComponent implements OnInit {
  httpClient = inject(HttpClient);

  //Variables
  originalData: any[] = [];
  filteredData: any[] = [];
  data: any[] = [];
  currentPage = 1;
  itemsPerPage = 14;
  totalItems = 0;
  pageInput = 1;

  // Filters
  searchTerm = '';
  startDate = '';
  endDate = '';

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient.get('http://localhost:8080/qldoan').subscribe((data: any) => {
      this.originalData = data;
      this.filteredData = [...this.originalData];
      this.loadPage(1);
    });
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.pageInput = page; // Đồng bộ giá trị input với trang hiện tại
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

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

  // Search and Reset Logic

  filterData() {
    const term = this.searchTerm.toLowerCase();
    const start = this.startDate ? new Date(this.startDate).getTime() : null;
    const end = this.endDate ? new Date(this.endDate).getTime() : null;

    this.filteredData = this.originalData.filter((item) => {
      const nameMatch = item.fullName.toLowerCase().includes(term);
      const itemStartDate = new Date(item.startDate).getTime();
      const itemEndDate = new Date(item.endDate).getTime();
      const dateInRange =
        (!start || itemStartDate >= start) &&
        (!end || itemEndDate <= end);

      return nameMatch && dateInRange;
    });

    this.loadPage(1); // Quay về trang đầu sau khi lọc
  }

  resetFilters() {
    this.searchTerm = '';
    this.startDate = '';
    this.endDate = '';
    this.filteredData = [...this.originalData];
    this.loadPage(1); // Tải lại trang đầu tiên
  }
}

