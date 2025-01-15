import { Component, OnInit } from '@angular/core';
import { MenusComponent } from '../menus/menus.component';
import { Chart, registerables } from 'chart.js';

@Component({
selector: 'app-home',
imports: [MenusComponent],
templateUrl: './home.component.html',
styleUrls: ['./home.component.css'] // Corrige styleUrl a styleUrls
})
export class HomeComponent implements OnInit {

constructor() { }

ngOnInit(): void {
Chart.register(...registerables); // Registra los componentes de Chart.js
this.initializeCarousel();
this.initializeChart();
}

initializeCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 0;
  
  setInterval(() => {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
  }, 3000);
  }

initializeChart() {
const ctx = document.getElementById('inventoryChart') as HTMLCanvasElement;
new Chart(ctx, {
type: 'bar',
data: {
labels: ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4'],
datasets: [{
label: 'Cantidad en Inventario',
data: [12, 19, 3, 5],
backgroundColor: [
'rgba(20, 212, 212, 0.79)',
'rgb(38, 167, 16)',
'rgb(223, 12, 12)',
'rgba(201, 204, 7, 0.88)'
],
borderColor: [
'rgba(75, 192, 192, 1)',
'rgb(33, 180, 14)',
'rgb(214, 10, 10)',
'rgb(252, 255, 102)'
],
borderWidth: 1
}]
},
options: {
scales: {
y: {
beginAtZero: true
}
}
}
});
}

navigateTo(route: string) {
// Implementa la lógica de navegación aquí
}
}