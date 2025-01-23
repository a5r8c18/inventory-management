import { Component, OnInit, OnDestroy } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data.service'; // Importa el servicio compartido

Chart.register(...registerables);

@Component({
selector: 'app-inventory-chart',
standalone: true,
imports: [CommonModule],
templateUrl: './inventory-chart.component.html',
styleUrls: ['./inventory-chart.component.scss'],
})
export class InventoryChartComponent implements OnInit, OnDestroy {
private inventorySubscription: Subscription = new Subscription();
private chart: Chart | undefined;

constructor(private inventoryService: InventoryService, private router: Router, private dataService: DataService) {}

ngOnInit(): void {
this.initializeChart();
const data = this.dataService.getData();
console.log('Datos recibidos en el gráfico:', data);
if (data && data.length > 0) {
this.updateChart(data);
} else {
console.error('No se encontraron datos en el servicio compartido');
}
}

ngOnDestroy(): void {
if (this.inventorySubscription) {
this.inventorySubscription.unsubscribe();
}
}

private initializeChart(): void {
const ctx = document.getElementById('inventoryChart') as HTMLCanvasElement;
if (ctx) {
this.chart = new Chart(ctx, {
type: 'bar',
data: {
labels: [],
datasets: [{
label: 'Inventario Disponible',
data: [],
backgroundColor: [],
}]
},
options: {
responsive: true,
scales: {
x: {
beginAtZero: true,
ticks: {
font: {
weight: 'bold',
style: 'italic'
}
}
},
y: {
beginAtZero: true
}
},
plugins: {
legend: {
labels: {
font: {
weight: 'bold',
style: 'italic'
}
}
}
}
}
});
} else {
console.error('Elemento canvas no encontrado');
}
}

updateChart(products: any[]): void {
if (this.chart) {
console.log('Updating chart with products:', products);
const labels = products.map(product => product.name);
const values = products.map(product => product.availableInventory);
const colors = products.map(product => product.availableInventory < 100 ? '#FF0000' : product.availableInventory > 1000 ? '#008000' : '#FFFF00');

this.chart.data.labels = labels;
this.chart.data.datasets[0].data = values;
this.chart.data.datasets[0].backgroundColor = colors;
this.chart.update();
}
}
}