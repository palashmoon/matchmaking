import { BasicInfo } from './basic-info/basic-info';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {

  private post_url = 'http://localhost:8095/api/v1/uploadFile/';
  private get_url = 'https://matchmaker-zuul.stackroute.in/uploadpic-service/api/v1/downloadFile/';
  private getFileName_url = 'https://matchmaker-zuul.stackroute.in/uploadpic-service/api/v1/downloadFileType/';
  private getFileExists_url = 'https://matchmaker-zuul.stackroute.in/uploadpic-service/api/v1/fileExists/';
  private basic_url = 'https://matchmaker-zuul.stackroute.in/downstream-service/matchmaker/v1/employees/';

  constructor(private http: HttpClient) {}

  uploadFile(fd: FormData, userId: String) {
    console.log('service component working');
    return this.http.post(this.basic_url + userId, fd, {
      reportProgress: true,
      responseType: 'text'
    });
  }

  downloadFile(userId: String) {
    console.log('download service component working');
    return this.http.get(this.get_url + userId, {responseType: 'arraybuffer'});
  }

  downloadFileName(userId: String) {
    console.log('download service component working');
    return this.http.get(this.getFileName_url + userId, {responseType: 'text'});
  }

  fileExists(userId: String) {
    return this.http.get<boolean>(this.getFileExists_url + userId);
  }

  basicInfoSending(userId: String, basicInfo: BasicInfo) {
    return this.http.post(this.basic_url + userId, basicInfo);
  }
}
