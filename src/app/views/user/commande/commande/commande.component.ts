import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [CommonModule,NzPaginationModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.scss'
})
export class CommandeComponent implements OnInit {
 
  commandes: any[] = [];
  paginatedData: any[] = []; 
  totalItems = 0; 
  currentPage = 1; 
  pageSize = 1
  constructor(private os:OrdersService){}
  ngOnInit() {
    this.getCommandesData()
  }
  getCommandesData(pageNumber = 1){
    this.os.getAllOrders().subscribe((data:any)=>{
      this.commandes=data.data
      this.totalItems = data.results; 
      this.updatePaginatedData(pageNumber);
    })
  }
  updatePaginatedData(pageNumber: number) {
    
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.commandes.slice(startIndex, endIndex);
    
  }
  changePage(pageNumber: number) {
    
    this.currentPage = pageNumber;
    this.updatePaginatedData(pageNumber);
  }
}
