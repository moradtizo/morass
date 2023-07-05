import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement, ResDepar, ResDepars, ResOneDepar } from '../models/departement';
import * as saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  // baseUrl:'http://localhost:4000/api/v1/departement' | undefined

  baseUrl: string = 'http://localhost:4000/api/v1/departement';

  constructor(private http: HttpClient) { }

  getAllDepar(page: number, pageSize: number): Observable<ResDepar> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ResDepar>('http://localhost:4000/api/v1/departement', { params });
  }
  addDepart(data: Departement): Observable<Departement> {
    return this.http.post<Departement>('http://localhost:4000/api/v1/departement', data);
  }

  getDeparts():Observable<ResDepar>{
    return this.http.get<ResDepar>(`${this.baseUrl}`);
  }



  downloadExcel(): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return this.http.get('http://localhost:4000/api/v1/departement/sample/templateExcel', {
      headers: headers,
      responseType: 'blob'
    });
  }

  saveExcelFile(blob: Blob, filename: string): void {
    saveAs(blob, filename);
  }

  searchDepart(search:string):Observable<ResDepars>{
    return this.http.get<ResDepars>(`http://localhost:4000/api/v1/departement/search/by?query=${search}`)
  }
  deleteDepart(id:string):Observable<ResDepar>{
    return this.http.delete<ResDepar>(`${this.baseUrl}/${id}`)
  }
  editDepart(id:string|undefined,data:Departement):Observable<ResOneDepar>{
    return this.http.put<ResOneDepar>(`http://localhost:4000/api/v1/departement/${id}`,data)
  }
  getOneDepart(id:string| undefined ):Observable<ResOneDepar> {
    return this.http.get<ResOneDepar>(`http://localhost:4000/api/v1/departement/${id}`)
  }

}
