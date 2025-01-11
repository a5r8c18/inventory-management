import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { MenusComponent } from '../menus/menus.component'; 
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MenusComponent, NgxDatatableModule, MatCardModule, MatToolbarModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],

})
export class InventoryComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'initialInventory', 'receivedInventory', 'sentInventory', 'availableInventory'];
  dataSource: any[] = [];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    const params = { /* tus parámetros aquí */ };
    this.inventoryService.getProductList().subscribe(response => {
      this.dataSource = response;
    });
  }
}