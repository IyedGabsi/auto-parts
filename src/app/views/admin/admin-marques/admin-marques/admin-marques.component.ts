import { Component,ViewChild ,EventEmitter} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button'; 
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UploadComponent } from '../../../../shared/components/upload/upload.component';
import { CommonModule } from '@angular/common';
import { MarquesDataService } from '../../../services/marques-data.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { Console } from 'console';


@Component({
  selector: 'app-admin-marques',
  standalone: true,
  imports: [NzButtonModule,UploadComponent,CommonModule,NzEmptyModule,ModalComponent],
  templateUrl: './admin-marques.component.html',
  styleUrl: './admin-marques.component.scss'
})
export class AdminMarquesComponent {
  itemData={
    id:'',
    name:''
  }
  index=0
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;
  showModalClicked: EventEmitter<void> = new EventEmitter<void>();
  showUpdateModalClicked: EventEmitter<void> = new EventEmitter<void>();
  value?: string;
  isVisible = false;
  listOfData: any=[]
  results: number = 0;

  constructor(private mds:MarquesDataService ,private messageService: NzMessageService) {
    this.mds.getAllMarques().subscribe((data:any)=>{
      this.listOfData=data.data
      console.log(this.listOfData)
      this.results=data.results
      
    })
  }
  onShowModalClicked(): void {
    this.modalComponent.showAddModal();
  }
  onShowUpdateModalClicked(id:string,name: string,i:number):void{
    this.itemData.name=name
    this.itemData.id=id
    this.index=i
    this.modalComponent.showUpdateModal(this.itemData);
    
  }
  onMarqueAdded(newMarque: any): void {
    this.listOfData.push(newMarque.data)
    this.results++; 
    this.messageService.success('Marque added successfully!');
  }
  onMarqueUpdated(newMarque:any):void{
    this.listOfData.splice(this.index,1,newMarque.data)
    
    this.messageService.success('marque updated successfuly')
  }
  delete(id: any, i: number) {
    this.mds.deleteMarque(id).subscribe(response => {
      
      if (response==null) {
        this.listOfData.splice(i,1) 
        this.results--; 
        this.messageService.success('Marque deleted successfully!');
      } else {
        console.error('Deletion failed:', response); 
      }
    });
  }
  add(){}
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
}
}
