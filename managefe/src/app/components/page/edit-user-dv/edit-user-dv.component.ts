import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-detail.service';
@Component({
  selector: 'app-edit-user-dv',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './edit-user-dv.component.html',
  styleUrl: './edit-user-dv.component.css'
})
export class EditUserDvComponent {
    userId!: number;
    userData: any = {
      hoVaTen: '',
      ngaySinh: '',
      gioiTinh: '',
      chucDanh: '',
      chucVu: '',
      hoChieu: '',
      DonViCongTac: '',
      SDT: '',
      Email: '',
      QuocTich: '',
      MucDich: '',
      TuNgay: '',
      DenNgay: '',
      TuTuc: '',
      TaiTro: '',
      BenhVien: '',
      GiaTri: '',
      SoLanToi: '',
      NgayGhiTrenTT: '',
      NgayPHTQTnhan: '',
      BGDpheDuyet: '',
      ThuNgoNumber: '',
      ThuNgoDate: '',
      BaoCaoSauChuyenCongTac: '',
      GhiChu: '',
      QuaTang: ''
    };
  
    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private router: Router
    ) {}
  
    ngOnInit() {
      this.userId = +this.route.snapshot.paramMap.get('id')!;
      this.getUserData();
    }
  
    getUserData() {
      this.userService.getUserById2(this.userId).subscribe(
        (data) => {
          this.userData = data;
          console.log('Dữ liệu người dùng:', this.userData);
          this.convertDates();
        },
        (error: any) => {
          console.error('Lỗi khi lấy dữ liệu:', error);
        }
      );
    }
  
    private convertDates() {
      const dateFields = ['NgaySinh', 'TuNgay', 'DenNgay', 'NgayGhiTrenTT', 'NgayPHTQTnhan', 'ThuNgoDate'];
      dateFields.forEach(field => {
        if (this.userData[field]) {
          this.userData[field] = this.formatDate(this.userData[field]);
        }
      });
    }
  
    private formatDate(dateString: string): string {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    }
  
    onSubmit() {
      const dataToSubmit = { ...this.userData };
     
  
      this.userService.updateUser2(this.userId, dataToSubmit).subscribe(
        (response) => {
          console.log('Dữ liệu đã được cập nhật:', response);
          alert('Cập nhật thành công!');
          this.router.navigate(['/user-detail2', this.userId]);
        },
        (error) => {
          console.error('Lỗi khi cập nhật dữ liệu:', error);
          alert('Có lỗi xảy ra khi cập nhật. Vui lòng thử lại!');
        }
      );
    }
  
    resetForm() {
      this.getUserData();
    }
  
    goBack(event: MouseEvent) {
      event.preventDefault();
      this.router.navigate(['/user-detail2', this.userId]);
    }
  
  
}
