import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-detail.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  userId!: number;
  userData: any = {
    fullName: '',
    birthDate: '',
    gender: '',
    partyBranch: '',
    partyPosition: '',
    JobTitle: '',
    jobName: '',
    Unit: '',
    phoneNumber: '',
    email: '',
    Country: '',
    InvitationUnit: '',
    MoiDichDanh: '',
    TripPurpose: '',
    StartDate: '',
    monthBegon: '',
    EndDate: '',
    Thoigiandichuyen: '',
    SelfFunded: '',
    Sponsor: '',
    Hospital: '',
    giaTri: '',
    ForeignTripCount: '',
    ngayXindi: '',
    ngayPnhanHS: '',
    notificationNumber: '',
    notificationDate: '',
    ngaychuyenHSsangP: '',
    alternative: '',
    SoNghiPhep: '',
    NgayNghiPhep: '',
    submitDay: '',
    PhotoHochieu: '',
    NoiDung: '',
    TenBaoCao: '',
    HoanHuy: '',
    Khac: '',
    Employee: ''
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
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.userData = data;
   
        if (this.userData.partyBranch === 'V') {
          this.userData.partyBranch = true;
        }

        this.convertDates();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    );
  }

  private convertDates() {
    const dateFields = [
      'birthDate', 'StartDate', 'EndDate', 'notificationDate',
      'submitDay', 'PhotoHochieu', 'ngayXindi', 'ngayPnhanHS',
      'ngaychuyenHSsangP'
    ];

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


    if (typeof dataToSubmit.partyBranch === 'boolean') {
      dataToSubmit.partyBranch = dataToSubmit.partyBranch ? 'V' : '';
    }

    // Kiểm tra validate trước khi submit
    // if (!this.validateForm(dataToSubmit)) {
    //   return;
    // }

    this.userService.updateUser(this.userId, dataToSubmit).subscribe(
      (response) => {
        console.log('Dữ liệu đã được cập nhật:', response);
        alert('Cập nhật thành công!');
        this.router.navigate(['/data-table']);
      },
      (error) => {
        console.error('Lỗi khi cập nhật dữ liệu:', error);
        alert('Có lỗi xảy ra khi cập nhật. Vui lòng thử lại!');
      }
    );
  }

  private validateForm(data: any): boolean {

    const requiredFields = ['fullName', 'birthDate', 'phoneNumber', 'email', 'Unit'];
    for (const field of requiredFields) {
      if (!data[field]) {
        alert(`Vui lòng điền ${field}`);
        return false;
      }
    }


    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(data.email)) {
      alert('Email không hợp lệ');
      return false;
    }


    const phonePattern = /^[0-9]{10,11}$/;
    if (!phonePattern.test(data.phoneNumber)) {
      alert('Số điện thoại không hợp lệ');
      return false;
    }


    if (data.StartDate && data.EndDate) {
      const startDate = new Date(data.StartDate);
      const endDate = new Date(data.EndDate);
      if (startDate > endDate) {
        alert('Ngày kết thúc phải sau ngày bắt đầu');
        return false;
      }
    }

    return true;
  }

  resetForm() {
    this.getUserData();
  }

  goBack() {
    this.router.navigate(['/detail-user']);
  }
}