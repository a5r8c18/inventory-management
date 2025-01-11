import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
selector: 'app-menus',
standalone: true,
imports: [
CommonModule,
RouterModule, 
MatToolbarModule,
MatIconModule,
MatButtonModule,
MatMenuModule
],
templateUrl: './menus.component.html',
styleUrls: ['./menus.component.css']
})
export class MenusComponent {
isNavbarCollapsed = true; // Agregar esta propiedad

userName: string = 'Nombre del Usuario'; // Reemplaza esto con la lógica real

constructor(private router: Router) {}

toggleNav() {
this.isNavbarCollapsed = !this.isNavbarCollapsed;
}

logout(): void {
// Lógica para cerrar sesión
// Por ejemplo, puedes llamar a un servicio de autenticación para cerrar sesión
this.router.navigate(['/login']);
}
}
