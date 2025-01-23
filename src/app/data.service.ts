import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class DataService {
private data: any[] = [];

setData(data: any[]) {
console.log('Datos almacenados en el servicio:', data);
this.data = data;
}

getData(): any[] {
console.log('Datos recuperados del servicio:', this.data);
return this.data;
}
}