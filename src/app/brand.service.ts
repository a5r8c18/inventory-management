import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class BrandService {
private apiUrl = 'http://localhost:3000/brands'; // URL de la API

constructor(private http: HttpClient) {}

getBrandList(): Observable<any[]> {
return this.http.get<any[]>(this.apiUrl);
}

addBrand(brand: any): Observable<any> {
return this.http.post<any>(this.apiUrl, brand);
}

updateBrand(brand: any): Observable<any> {
return this.http.put<any>(`${this.apiUrl}/${brand.id}`, brand);
}

deleteBrand(id: number): Observable<void> {
return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}