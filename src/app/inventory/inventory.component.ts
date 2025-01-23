import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { MenusComponent } from '../menus/menus.component'; 
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { InventoryChartComponent } from '../inventory-chart/inventory-chart.component'; // Importa el componente
import { DataService } from '../data.service'; // Importa el servicio compartido

@Component({
selector: 'app-inventory',
imports: [MenusComponent, NgxDatatableModule, MatCardModule, MatToolbarModule, CommonModule, MatIcon],
templateUrl: './inventory.component.html',
styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
dataSource: any[] = [];

constructor(private inventoryService: InventoryService, private router: Router, private dataService: DataService) {}

ngOnInit(): void {
this.loadInventoryData();
}

loadInventoryData(): void {
this.inventoryService.getProductList().subscribe(products => {
console.log('Products:', products);
const updatedDataSource: { position: number, name: string, initialInventory: number, receivedInventory: number, sentInventory: number, availableInventory: number }[] = [];
products.forEach(product => {
this.inventoryService.getPurchaseDetailsByProductId(product.id).subscribe(purchases => {
console.log('Purchases:', purchases);
this.inventoryService.getOrderDetailsByProductId(product.id).subscribe(orders => {
console.log('Orders:', orders);
const initialInventory = Number(product.quantity);
const receivedInventory = purchases.reduce((sum, purchase) => sum + Number(purchase.quantity), 0);
const sentInventory = orders.reduce((sum, order) => sum + Number(order.quantity), 0);
const availableInventory = initialInventory + receivedInventory - sentInventory;

console.log(`Product: ${product.name}, Initial: ${initialInventory}, Received: ${receivedInventory}, Sent: ${sentInventory}, Available: ${availableInventory}`);

updatedDataSource.push({
position: product.id,
name: product.name,
initialInventory,
receivedInventory,
sentInventory,
availableInventory
});

// Asegúrate de que Angular detecte los cambios
this.dataSource = [...updatedDataSource];
});
});
});
});
}

navigateToChart() {
console.log('Datos que se pasan al gráfico:', this.dataSource);
this.dataService.setData(this.dataSource);
this.router.navigate(['/inventory-chart']);
}
}
