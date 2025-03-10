import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule,],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit{
  httpClient = inject(HttpClient);
  dataAdd: DataAdd = new DataAdd();
  message: string = '';
  private apiUrl = "http://localhost:8080/add"
    private fileApiUrl = "http://localhost:8080/savedata";
  constructor(private router : Router){

  }


  saveToNotepad() {
    this.httpClient.post(this.fileApiUrl, this.dataAdd).subscribe({
      next: (response) => {
        console.log('Notepad saved successfully');
        this.message += ' and Notepad file created!';
      },
      error: (error) => {
        console.error('Error saving notepad:', error);
        this.message += ' but failed to create Notepad file.';
      }
    });
  }

  ngOnInit(): void {

  }

  saveData(){
    this.addData(this.dataAdd).subscribe(
      (response) => {
     alert("add success");
        console.log(this.dataAdd);
      this.goToList();
      this.saveToNotepad
      },
      (error) => {
        console.error('Error adding user:', error);
        alert("add fail");
      }
    );
  }
  goToList(){
    this.router.navigate(['/data-table']);
  }
  addData(dataAdd : DataAdd): Observable<Object>{
      return this.httpClient.post(this.apiUrl, dataAdd);
    }
}

export class ButtonBasicDemo { }
export class DataAdd {
[x: string]: any;
  // Thông tin cá nhân
  fullName: string = ""; // Họ và tên
  gender: string = ""; // Giới tính
  birthDate: string = ""; // Ngày sinh
  cccd: string = ""; // Số CCCD
  partyBranch: string = ""; // Đảng viên
  partyPosition: string = ""; // Chức vụ Đảng
  jobTitle: string = ""; // Chức danh nghề nghiệp
  jobName: string = ""; // Chức vụ chính quyền
  unit: string = ""; // Đơn vị công tác
  phoneNumber: string = ""; // Số điện thoại
  email: string = ""; // Email
  oral: string = ""; // Chứng nhận báo cáo viên
  certificate: string = ""; // Bằng cấp/chứng chỉ
  restCount: string = ""; // số ngày nghỉ trong năm

  // Thông tin chuyến đi
  invitationUnit: string = ""; // Đơn vị mời
  moiDichDanh: string = ""; // Mời đích danh
  tentcmoi: string = ""; // Tên tổ chức/cá nhân mời
  tripPurpose: string = ""; // Mục đích chuyến đi
  ndhoinghi: string = ""; // Nội dung hội nghị
  ndviecrieng: string = ""; // Nội dung việc riêng
  startDate: string = ""; // Ngày bắt đầu
  monthBegon: string = ""; // Tháng bắt đầu
  endDate: string = ""; // Ngày kết thúc
  thoigiandichuyen: string = ""; // Thời gian di chuyển
  ngaydithucte: string = ""; // Ngày đi thực tế
  ngaydenthucte: string = ""; // Ngày đến thực tế
  tinhtrangchuyendi: string = ""; // Tình trạng chuyến đi
  qddinuocngoai: string = ""; // Quyết định đi nước ngoài
  baocaotomtat: string = ""; // Báo cáo tóm tắt
  country: string = ""; // Quốc gia đến
  mployee: string = ""; // loại nhân viên

  // Thông tin tài chính
  selfFunded: string = ""; // Tự túc
  sponsor: string = ""; // Nhà tài trợ
  hospital: string = ""; // Bệnh viện
  giaTri: string = ""; // Giá trị
  tcngoaiBvtaitro: string = ""; // Tổ chức ngoài bệnh viện tài trợ

  // Thông tin quản lý
  emailLD: string = ""; // Email lãnh đạo
  foreignTripCount: number = 0; // Số chuyến đi nước ngoài
  ngayXindi: string = ""; // Ngày xin đi
  ngayPnhanHS: string = ""; // Ngày chuyển hồ sơ sang phòng
  notificationNumber: string = ""; // Số thông báo
  notificationDate: string = ""; // Ngày thông báo
  alternative: string = ""; // Người tiếp nhận
  soNghiPhep: string = ""; // Số nghỉ phép
  ngayNghiPhep: string = ""; // Ngày nghỉ phép
  submitDay: string = ""; // Ngày nộp
  photoHochieu: string = ""; // Hộ chiếu
  noiDung: string = ""; // Nội dung
  tenBaoCao: string = ""; // Tên báo cáo
  hoanHuy: string = ""; // Hoãn/Huỷ
  khac: string = ""; // Khác
  ngaychuyenHSsangP: string = ""; // Ngày chuyển hồ sơ sang phòng

  // Thông tin bổ sung
  tiepxuccoquan: string = ""; // Tiếp xúc cơ quan
  viechaphanhbaovebimatnn: string = ""; // Chấp hành bảo vệ bí mật nhà nước
  vdelienquandenchinhtrinoibo: string = ""; // Vấn đề chính trị nội bộ
  ttquyetdinh: string = ""; // Tình trạng quyết định
  lydohoan: string = ""; // Lý do hoãn
  ndchuyendibihoan: string = ""; // Nội dung chuyến đi bị hoãn
  dexuatkiennghi: string = ""; // Đề xuất kiến nghị
  ndynghiaapdungvatrienkhaibenhvien: string = ""; // Nội dung ý nghĩa áp dụng tại bệnh viện
  mayte: string = ""; // Mã y tế
  editURL: string = ""; // URL chỉnh sửa
  docURL: string = ""; // URL tài liệu
  increment: string = ""; // Tăng
  pdfURL: string = ""; // URL PDF
}
