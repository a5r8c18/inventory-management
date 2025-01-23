import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class PurchaseService {
private apiUrl = 'http://localhost:3000/purchases';

constructor(private http: HttpClient) {}

getPurchases(): Observable<any[]> {
return this.http.get<any[]>(this.apiUrl);
}

addPurchase(purchase: any): Observable<any> {
return this.http.post<any>(this.apiUrl, purchase);
}

updatePurchase(id: number, purchase: any): Observable<any> {
return this.http.put<any>(`${this.apiUrl}/${id}`, purchase);
}

deletePurchase(id: number): Observable<any> {
return this.http.delete<any>(`${this.apiUrl}/${id}`);
}

getPurchaseById(id: number): Observable<any> {
return this.http.get<any>(`${this.apiUrl}/${id}`);
}

getPurchasesByProductId(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?productId=${productId}`);
}
}

// Interface for Purchase
export interface Purchase {
id: number;
productId: number; // Llave foránea que relaciona con Product
quantity: number;
purchaseDate: string;
// otros campos...
}
