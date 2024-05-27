import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { ModalComponent } from './components/modal/modal.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    RouterModule,
    UploadComponent,
    ModalComponent,
    NzUploadModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    UploadComponent,
    ModalComponent,
    NzUploadModule
  ]
})
export class SharedModule { }
