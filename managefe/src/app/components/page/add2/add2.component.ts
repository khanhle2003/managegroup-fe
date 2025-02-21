import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add2',
  templateUrl: './add2.component.html',
  styleUrls: ['./add2.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
  ]
})
export class Add2Component implements OnInit {
  dataAdd: any = {
    hoVaTen: '',
    ngaySinh: '',
    gioiTinh: '',
    quocTich: '',
    sdt: '',
    email: '',
    chucDanh: '',
    chucVu: '',
    donViCongTac: '',
    tuNgay: '',
    denNgay: '',
    mucDich: '',
    thuNgoNumber: '',
    thuNgoDate: '',
    taiTro: '',
    tuTuc: '',
    benhVien: '',
    giaTri: '',
    soLanToi: 0,
    baoCaoSauChuyenCongTac: '',
    ngayGhiTrenTT: '',
    ngayPHTQTnhan: '',
    bqdpheDuyet: '',
    ghiChu: '',
    quaTang: ''
  };

  message: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveData() {
    this.http.post('http://localhost:8080/api/table2/doanvao/add', this.dataAdd)
      .subscribe({
        next: (response) => {
          this.message = 'Dữ liệu đã được lưu thành công!';
          setTimeout(() => {
            this.router.navigate(['/doanvao']);
          }, 2000);
        },
        error: (error) => {
          this.message = 'Có lỗi xảy ra khi lưu dữ liệu!';
          console.error('Lỗi:', error);
        }
      });
  }
}
