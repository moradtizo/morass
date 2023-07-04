import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Morass, ResMorass, ResMorasses, ResOneMorass } from '../models/morass';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as saveAs from 'file-saver';
import { query } from '@angular/animations';


@Injectable({
  providedIn: 'root'
})
export class MorassService {

  // apiUrl: 'http://localhost:4000/api/v1/budgetaire'
  baseUrl:'http://localhost:4000/api/v1/budgetaire' | undefined
  constructor(private http: HttpClient) { }


// getAllmorass() {
//   return this.http.get<Morass[]>(this.apiUrl);
// }
// getAllMorass():Observable<ResMorass> {
//   return this.http.get<ResMorass>('http://localhost:4000/api/v1/budgetaire')
// }
getAllMorass(page: number, pageSize: number): Observable<ResMorass> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());

  return this.http.get<ResMorass>('http://localhost:4000/api/v1/budgetaire', { params });
}
addMorass(data: Morass): Observable<Morass> {
  return this.http.post<Morass>('http://localhost:4000/api/v1/budgetaire', data);
}

getMorasses():Observable<ResMorass>{
  return this.http.get<ResMorass>('http://localhost:4000/api/v1/budgetaire');
}



  downloadExcel(): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return this.http.get('http://localhost:4000/api/v1/budgetaire/sample/templateExcel', {
      headers: headers,
      responseType: 'blob'
    });
  }

  saveExcelFile(blob: Blob, filename: string): void {
    saveAs(blob, filename);
  }

  searchMorasse(search:string):Observable<ResMorasses>{
    return this.http.get<ResMorasses>(`http://localhost:4000/api/v1/budgetaire/search/by?query=${search}`)
  }
  deleteMorass(id:string):Observable<ResMorass>{
    return this.http.delete<ResMorass>(`http://localhost:4000/api/v1/budgetaire/${id}`)
  }
  editmorass(id:string|undefined,data:Morass):Observable<ResOneMorass>{
    return this.http.put<ResOneMorass>(`http://localhost:4000/api/v1/budgetaire/${id}`,data)
  }
  getOneMorass(id:string| undefined ):Observable<ResOneMorass> {
    return this.http.get<ResOneMorass>(`http://localhost:4000/api/v1/budgetaire/${id}`)
  }
}

