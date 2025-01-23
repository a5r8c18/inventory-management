import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class CategoryService {
private apiUrl = 'http://localhost:3000/categories'; // Replace with your actual API URL

constructor(private http: HttpClient) {}

getCategoryList(): Observable<any[]> {
return this.http.get<any[]>(this.apiUrl);
}

addCategory(category: any): Observable<any> {
return this.http.post<any>(this.apiUrl, category);
}

updateCategory(category: any): Observable<any> {
return this.http.put<any>(`${this.apiUrl}/${category.id}`, category);
}

deleteCategory(categoryId: number): Observable<any> {
return this.http.delete<any>(`${this.apiUrl}/${categoryId}`);
}

getCategoryById(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
}