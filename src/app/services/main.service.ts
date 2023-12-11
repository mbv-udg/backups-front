import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackupsResponse } from '../models/backupsResponse';
import { GenericResponse } from '../models/genericResponse';

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

  getFiles(bckp: string, dir: string = ''): Observable<BackupsResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    });
    return this.httpClient.get(this.server+'/backups/'+bckp+'/'+dir, { headers: headers}) as Observable<BackupsResponse>;
  }

  recoverDb(nameB: string): Observable<GenericResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    });    
    let body = {
      name: nameB
    }
    return this.httpClient.post(this.server+'/recover/db', body, {headers: headers}) as Observable<GenericResponse>;
  }

  recoverFiles(bckp: string, direct: string, file: string): Observable<GenericResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    });    
    let body = {
      backup: bckp,
      dir: direct,
      file: file
    }
    return this.httpClient.post(this.server+'/recover/files', body, {headers: headers}) as Observable<GenericResponse>;
  }
}
