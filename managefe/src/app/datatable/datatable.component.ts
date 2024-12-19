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
startDateFilter: string = "";
endDateFilter : string = "";
showCheckbox :boolean = false;
selectdItem: any []= [];



hideCheckbox(){
this.showCheckbox =  !this.showCheckbox;
}


selectAll(event : any ){
  const checked = event.target.checked
  this.data.forEach(item => item.selected = checked)

}
ngOnInit(): void {  
   this.fetchData();
}
fetchData(){//fetch data
  this.httpClient.get('http://localhost:8080/main/datas')
  .subscribe((data:any) => {
   
    this.data=data;
    this.originalData = data;
    this.loadPage(1)
})
}
loadPage(page: number) {
  this.currentPage = page;
  this.pageInput = page; 
  const startIndex = (page - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  let filteredData = this. originalData;
  this.data = this.originalData.slice(startIndex, endIndex);
  this.totalItems = this.originalData.length;
  if (this.startDateFilter) {
    filteredData = filteredData.filter(item => 
     item.startDate && new Date(item.startDate) >= new Date(this.startDateFilter)//loai bo nhung o khong co ngay`
    );
  } 
  if (this.endDateFilter) {
    filteredData = filteredData.filter(item => 
     item.endDate && new Date(item.endDate) <= new Date(this.endDateFilter)
    );
  }

  
  this.data = filteredData.slice(startIndex, endIndex);
  this.totalItems = filteredData.length;
}
applyDateFilter(){
  this.loadPage(1);

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
clearDateFilter(){
  this.endDateFilter = '';
  this.startDateFilter = '';
  this.loadPage(1);
}
}
