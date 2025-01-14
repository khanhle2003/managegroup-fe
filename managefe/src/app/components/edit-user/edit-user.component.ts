import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-detail.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
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
        this.convertDates();
      },
      (error: any) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    );
  }

  private convertDates() {
    const dateFields = ['birthDate', 'StartDate', 'EndDate', 'notificationDate', 'submitDay', 'PhotoHochieu', 'ngayXindi', 'ngayPnhanHS', 'ngaychuyenHSsangP'];
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

  resetForm() {
    this.getUserData();
  }

  goBack(event: MouseEvent) {
    event.preventDefault();
    this.router.navigate(['/user-detail', this.userId]);
  }
}
