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
        this.message = 'User added successfully!';
        console.log(this.dataAdd);
      this.saveToNotepad
      },
      (error) => {
        console.error('Error adding user:', error);
        this.message = 'Failed to add user.';
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
  fullname: string = "";                // Họ và tên
  gender: string = "";                  // Giới tính
  birthDate: string = "";               // Ngày sinh
  partyBranch: string = "";             // Chi bộ
  partyPosition: string = "";           // Chức vụ Đảng
  jobTitle: string = "";                // Chức danh nghề nghiệp
  jobName: string = "";                 // Tên công việc
  unit: string = "";                    // Đơn vị công tác
  phoneNumber: number = 0;              // Số điện thoại
  email: string = "";                   // Email
  country: string = "";                 // Quốc gia
  invitationUnit: string = "";          // Tên cơ quan/Tổ chức/Cá nhân mời
  moiDichDanh: string = "";             // Mời đi
  tripPurpose: string = "";             // Mục đích chuyến đi
  startDate: string = "";               // Ngày bắt đầu
  monthBegin: string = "";              // Tháng bắt đầu
  endDate: string = "";                 // Ngày kết thúc
  thoigiandichuyen: string = "";        // Thời gian đi chuyến
  notificationNumber: string = "";      // Số thông báo
  notificationDate: string = "";        // Ngày thông báo
  foreignTripCount: number = 0;         // Số lần xin đi nước ngoài trong năm
  selfFunded: string = "";              // Cá nhân tự túc
  sponsor: string = "";                 // Bên mời
  hospital: string = "";                // Bệnh viện tài trợ
  giaTri: string = "";                  // Giá trị
  restCount: string = "";               // Số ngày đã nghỉ phép trong năm
  alternative: string = "";             // Người được ủy quyền
  submitDay: string = "";               // Ngày nộp báo cáo kết quả
  ngayXindi: string = "";               // Ngày xin đi
  ngayPnhanHS: string = "";             // Ngày nhận hồ sơ
  ngaychuyenHSsangP: string = "";       // Ngày chuyển hồ sơ sang phòng
  photoHochieu: string = "";            // Ngày hết hạn hộ chiếu
  noiDung: string = "";                 // Nội dung
  tenBaoCao: string = "";               // Tên báo cáo
  hoanHuy: string = "";                 // Hoãn/hủy
  Khac: string = "";                    // Khác
  Employee:string ="";
}
