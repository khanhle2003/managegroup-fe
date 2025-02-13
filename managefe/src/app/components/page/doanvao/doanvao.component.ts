import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ExcelImportComponent2 } from '../import-excel2/import-excel2.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-doanvao',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ExcelImportComponent2],
  templateUrl: './doanvao.component.html',
  styleUrls: ['./doanvao.component.css']
})
export class DoanvaoComponent implements OnInit {
  httpClient = inject(HttpClient);
  router = inject(Router);

  originalData: any[] = [];
  filteredData: any[] = [];
  data: any[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 2;
  pageInput = 1;

  // Filters
  searchTerm = '';
  tuNgay = '';
  denNgay = '';
  backupStatus: boolean = false;
  isBackupSuccess: boolean = false;
  showCheckbox: boolean = false;
  isDropdownOpen: boolean = false;
  headerChecked: boolean = false;

  constructor() {
    this.fetchData();
  }


  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.httpClient.get<any[]>('http://localhost:8080/doanvao').subscribe(
      (data) => {
        this.originalData = data;
        this.filteredData = [...this.originalData];
        this.loadPage(1);
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    );
  }
  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen
  }
  selectAll(event: any)
  {
    this.headerChecked = event.target.checked;
    this.data.forEach(item => {
      if (item) {
        item.selected = this.headerChecked;
      }
    })
  }
  filterData() {
    const term = this.searchTerm.toLowerCase() || '';
    const start = this.tuNgay ? new Date(this.tuNgay).getTime() : null;
    const end = this.denNgay ? new Date(this.denNgay).getTime() : null;
    this.filteredData = this.originalData.filter((item) => {
      const nameMatch = item.hoVaTen?.toLowerCase().includes(term) || false;
      const countryMatch = item.quocTich?.toLowerCase().includes(term) || false;
      const unitMatch = item.donViCongTac?.toLowerCase().includes(term) || false;
      const notidateMatch = item.notificationDate?.toLowerCase().includes(term) || false;
      const phoneMatch = item.sdt?.toLowerCase().includes(term) || false;
      const emailMatch = item.email?.toLowerCase().includes(term) || false;
      const tripmatch = item.mucDich?.toLowerCase().includes(term) || false;
      const notinumbermatch = item.thungoNumber?.toLowerCase().includes(term) || false;
      const itemStartDate = item.tuNgay ? new Date(item.tuNgay).getTime() : null;
      const itemEndDate = item.denNgay ? new Date(item.denNgay).getTime() : null;
      const dateInRange =
        (!start || (itemStartDate && itemStartDate >= start)) &&
        (!end || (itemEndDate && itemEndDate <= end));
      return (nameMatch || countryMatch || unitMatch || notidateMatch || phoneMatch || emailMatch || notinumbermatch || tripmatch) && dateInRange;
    });
    this.loadPage(1);
  }
  exportExcel() {
    const selectedData = this.originalData.filter(item => item.selected);
    if (selectedData.length === 0) {
      alert('Vui lòng chọn dữ liệu');
      return;
    }

    this.httpClient.post('http://localhost:8080/api/export/doanvao', selectedData, {
      responseType: 'blob'
    }).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'exported_data.xlsx';
        link.click();
        this.loadPage(1);
      },
      error => {
        console.error('Export failed:', error);
        alert('Xuất file thất bại');
      }
    );
    this.loadPage(1);
  }
  goToDetailPage(id: number) {
    this.router.navigate(['/user-detail', id]);
  }
  hideCheckbox() {
    this.showCheckbox = !this.showCheckbox;
    if (!this.showCheckbox) {
      this.originalData.forEach(item => item.selected = false);
      this.data.forEach(item => item.selected = false);
      this.headerChecked = false;
    }
  }
  checkPageCheckboxState() {
    const currentPageItems = this.data.filter(item => item !== null);
    this.headerChecked = currentPageItems.length > 0 &&
                        currentPageItems.every(item => item.selected);
  }
  resetFilters() {
    this.searchTerm = '';
    this.tuNgay = '';
    this.denNgay = '';
    this.filteredData = [...this.originalData];
    this.loadPage(1);
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

        return 0;
      };

      const dateA = parseDate(a.thuNgoDate);
      const dateB = parseDate(b.thuNgoDate);
      return dateB - dateA;
    });

    this.data = this.filteredData.slice(startIndex, endIndex);
    this.totalItems = this.filteredData.length;
    this.checkPageCheckboxState();
  }
  deleteSelected() {
    const confirmed = confirm('Bạn có chắc chắn muốn xóa các mục đã chọn không?');

    if (confirmed) {
      const selectedItems = this.data.filter(item => item.selected);

      if (selectedItems.length === 0) {
        alert('Vui lòng chọn ít nhất một mục để xóa');
        return;
      }

      selectedItems.forEach(item => {
        this.httpClient
          .delete(`http://localhost:8080/delete/${item.id}`)
          .subscribe(
            (response: any) => {
              this.data = this.data.filter(i => i.id !== item.id);
              this.headerChecked = false;
              return this.fetchData();
            },
            error => {
              console.error('Error deleting data:', error);
              return this.fetchData();
            }
          );
      });
    }
  }
  exportAllExcel() {
    if (this.originalData.length === 0) {
      alert('Không có dữ liệu để xuất');
      return;
    }

    // Định nghĩa tiêu đề mong muốn
    const headers = {
      hoVaTen: 'Họ và Tên',
      ngaySinh: 'Ngày sinh',
      gioiTinh: 'Giới tính',
      chucDanh: 'Chức danh',
      chucVu: 'Chức vụ',
      donViCongTac: 'Đơn vị công tác',
      sdt: 'Số điện thoại',
      email: 'Email',
      quocTich: 'Quốc Tịch',
      mucDich: 'Mục đích chuyến đi',
      tuNgay: 'Từ ngày',
      denNgay: 'Đến ngày',
      tuTuc: 'Tự túc',
      taiTro: 'Tài trợ',
      benhVien: 'Bệnh viện',
      giaTri: 'Giá trị',
      soLanToi: 'Số lần tới bệnh viện',
      ngayGhiTrenTT: 'Ngày ghi trên TT',
      ngayPHTQTnhan: 'Ngày PHQT nhận',
      bqdpheDuyet: 'BGD phê duyệt',

      thuNgoNumber: 'Số thư mời',
      thuNgoDate: 'Ngày thư mời',
      baoCaoSauChuyenCongTac: 'Báo cáo sau chuyến công tác',
      ghiChu: 'Ghi chú',
      quaTang: 'Quà tặng',
    };

    // Chuyển đổi dữ liệu theo tiêu đề
    const dataFormatted = this.originalData.map(item => {
      return {
        'Họ và Tên': item.hoVaTen,
        'Ngày sinh': item.ngaySinh,
        'Giới tính': item.gioiTinh,
        'Chức danh': item.chucDanh,
        'Chức vụ': item.chucVu,
        'Đơn vị công tác': item.donViCongTac,
        'Số điện thoại': item.sdt,
        'Email': item.email,
        'Quốc Tịch': item.quocTich,
        'Mục đích chuyến đi': item.mucDich,
        'Từ ngày': item.tuNgay,
        'Đến ngày': item.denNgay,
        'Tự túc': item.tuTuc,
        'Tài trợ': item.taiTro,
        'Bệnh viện': item.benhVien,
        'Giá trị': item.giaTri,
        'Số lần tới bệnh viện': item.soLanToi,
        'Ngày ghi trên TT': item.ngayGhiTrenTT,
        'Ngày PHQT nhận': item.ngayPHTQTnhan,
        'BGD phê duyệt': item.bqdpheDuyet,
        'Số thư mời': item.thuNgoNumber,
        'Ngày thư mời': item.thuNgoDate,
        'Báo cáo sau chuyến công tác': item.baoCaoSauChuyenCongTac,
        'Ghi chú': item.ghiChu,
        'Quà tặng': item.quaTang,

      };
    });

      // Tạo trang tính Excel
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataFormatted);

      // Chèn tiêu đề cột
      const range = XLSX.utils.decode_range(ws['!ref'] as string);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_col(C) + "1";
        ws[cellAddress].s = { font: { bold: true } };
      }

      // Tạo workbook và thêm sheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Danh sách');

      // Xuất file với tên có định dạng ngày
      const fileName = `danh_sach_du_lieu_${new Date().toLocaleDateString()}.xlsx`;
      XLSX.writeFile(wb, fileName);
    }
}
