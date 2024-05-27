import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClient } from '@angular/common/http';
import { UsersDataService } from '../../../services/users-data.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [NzTableModule,NzDividerModule, CommonModule,NzButtonModule,NzPaginationModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})

export class AdminUsersComponent {
  
  listOfData: any=[]
  results: number = 0;
  constructor(private uds:UsersDataService,private messageService: NzMessageService){
    this.uds.getAllUsers().subscribe((data:any)=>{
      this.listOfData=data.data
      
      this.results=data.results
      
    })
    
 }

delete(id: any, i: number) {
  this.uds.deleteUser(id).subscribe(response => {
    
    if (response==null) {
      this.listOfData = [
        ...this.listOfData.slice(0, i),
        ...this.listOfData.slice(i + 1)
      ];
      this.results--; 
      this.messageService.success('User deleted successfully!');
    } else {
      console.error('Deletion failed:', response);
    }
  });
}


  
    
  }