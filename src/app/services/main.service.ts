import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackupsResponse } from '../models/backupsResponse';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  server = environment.baseUrl+'/backups';

  constructor(private httpClient: HttpClient) { }

  getFileBackups(): Observable<BackupsResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.get(this.server+'/files', { headers: headers}) as Observable<BackupsResponse>;
  }

  getDbBackups(): Observable<BackupsResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.get(this.server+'/db', { headers: headers}) as Observable<BackupsResponse>;
  }
}
