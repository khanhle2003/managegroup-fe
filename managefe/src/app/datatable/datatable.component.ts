import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FormsModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent implements OnInit {
  httpClient = inject(HttpClient);
  data:any[]= []
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  pageInput=1;
  originalData: any[] = [];


ngOnInit(): void {  
   this.fetchData();
}
fetchData(){
  this.httpClient.get('http://localhost:8080/main/trips')
  .subscribe((data:any) => {
    console.log(data); 
    this.data=data;
    this.originalData = data;
    this.loadPage(1)
})
}
loadPage(page: number) {
  this.currentPage = page;
  this.pageInput = page; // Đồng bộ giá trị input với trang hiện tại
  const startIndex = (page - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  
  this.data = this.originalData.slice(startIndex, endIndex);
  this.totalItems = this.originalData.length;
}

goToPage() {

  if (this.pageInput > 0 && this.pageInput <= this.getTotalPages()) {
    this.loadPage(this.pageInput);
  } else {
   
    alert(`so trang k qua' ${this.getTotalPages()}`);
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
}
