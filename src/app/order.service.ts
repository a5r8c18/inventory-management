import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class OrderService {
private apiUrl = 'http://localhost:3000/api/orders';

constructor(private http: HttpClient) {}

getOrders(): Observable<any[]> {
return this.http.get<any[]>(this.apiUrl);
}

addOrder(order: any): Observable<any> {
return this.http.post<any>(this.apiUrl, order);
}

updateOrder(id: number, order: any): Observable<any> {
return this.http.put<any>(`${this.apiUrl}/${id}`, order);
}

deleteOrder(id: number): Observable<any> {
return this.http.delete<any>(`${this.apiUrl}/${id}`);
}

getOrderById(id: number): Observable<any> {
return this.http.get<any>(`${this.apiUrl}/${id}`);
}
}