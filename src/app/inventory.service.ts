import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
providedIn: 'root'
})
export class InventoryService {
private apiUrl = 'http://localhost:3000'; // Asegúrate de que esta URL apunte a tu servidor backend

constructor(private http: HttpClient) {}

getCustomerList(): Observable<any[]> {
return this.http.get<any[]>(`${this.apiUrl}/customers`);
}

saveCustomer(customer: any): Observable<any> {
return this.http.post(`${this.apiUrl}/api/customers`, customer);
}

updateCustomer(customer: any): Observable<any> {
return this.http.put(`${this.apiUrl}/api/customers/${customer.id}`, customer);
}

deleteCustomer(id: number): Observable<any> {
return this.http.delete(`${this.apiUrl}/api/customers/${id}`);
}

getCategoryList(): Observable<any[]> {
return this.http.get<any[]>(`${this.apiUrl}/api/categories`);
}

saveCategory(category: any): Observable<any> {
return this.http.post(`${this.apiUrl}/api/categories`, category);
}

updateCategory(category: any): Observable<any> {
return this.http.put(`${this.apiUrl}/api/categories/${category.id}`, category);
}

deleteCategory(id: number): Observable<any> {
return this.http.delete(`${this.apiUrl}/api/categories/${id}`);
}

saveBrand(brand: any): Observable<any> {
return this.http.post(`${this.apiUrl}/api/brands`, brand);
}

updateBrand(brand: any): Observable<any> {
return this.http.put(`${this.apiUrl}/api/brands/${brand.id}`, brand);
}

deleteBrand(brandId: number): Observable<any> {
return this.http.delete(`${this.apiUrl}/api/brands/${brandId}`);
}

getOrderDetails(): Observable<any[]> {
return this.http.get<any[]>(`${this.apiUrl}/orders`);
}

saveOrder(order: any): Observable<any> {
return this.http.post(`${this.apiUrl}/orders`, order);
}

updateOrder(order: any): Observable<any> {
return this.http.put(`${this.apiUrl}/orders/${order.id}`, order);
}

deleteOrder(orderId: number): Observable<any> {
return this.http.delete(`${this.apiUrl}/orders/${orderId}`);
}

getPurchaseDetails(): Observable<any[]> {
return this.http.get<any[]>(`${this.apiUrl}/purchases`);
}

addPurchase(purchase: any): Observable<any> {
return this.http.post<any>(`${this.apiUrl}/purchases`, purchase);
}

updatePurchase(id: number, purchase: any): Observable<any> {
return this.http.put<any>(`${this.apiUrl}/purchases/${id}`, purchase);
}

deletePurchase(id: number): Observable<any> {
return this.http.delete<any>(`${this.apiUrl}/purchases/${id}`);
}

getPurchaseDetailsByProductId(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/purchases?productId=${productId}`);
}

getOrderDetailsByProductId(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders?productId=${productId}`);
}

getProductList(): Observable<any[]> {
return this.http.get<any[]>(`${this.apiUrl}/api/products`);
}

getSupplierList(): Observable<any[]> {
return this.http.get<any[]>(`${this.apiUrl}/api/suppliers`);
}

saveSupplier(supplier: any): Observable<any> {
return this.http.post(`${this.apiUrl}/api/suppliers`, supplier);
}

updateSupplier(supplier: any): Observable<any> {
return this.http.put(`${this.apiUrl}/api/suppliers/${supplier.id}`, supplier);
}

deleteSupplier(id: number): Observable<any> {
return this.http.delete(`${this.apiUrl}/api/suppliers/${id}`);
}

updateProduct(product: any): Observable<any> {
return this.http.put(`${this.apiUrl}/api/products/${product.id}`, product);
}

saveProduct(product: any): Observable<any> {
return this.http.post(`${this.apiUrl}/api/products`, product);
}

deleteProduct(productId: number): Observable<any> {
return this.http.delete(`${this.apiUrl}/api/products/${productId}`);
}

getBrandList(): Observable<any[]> {
return this.http.get<any[]>(`${this.apiUrl}/api/brands`);
}


}