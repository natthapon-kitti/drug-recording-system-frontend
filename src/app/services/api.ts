import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`)
  }

  getMeds(): Observable<any> {
    return this.http.get(`${this.baseUrl}/medications`)
  }

  getRecords(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/records?page=${page}&limit=${limit}`)
  }

  getRecordById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/records/${id}`)
  }

  addRecord(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/records/create`, data)
  }

  updateRecord(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/records/edit`, data)
  }

  deleteRecord(data: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/records/delete`, data)
  }




}
