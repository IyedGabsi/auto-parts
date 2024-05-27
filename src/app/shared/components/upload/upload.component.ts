import { Component,EventEmitter, Output} from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';



@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [NzUploadModule ,NzIconModule,CommonModule,NzSpinModule],
  
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
  loading = false;
  avatarUrl?: string;     

  constructor(private msg: NzMessageService) {}
  beforeUpload = (file: NzUploadFile): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.msg.error('You can only upload JPG/PNG file!');
      return false;
    }
    return true;
  };
    private getBase64(img: File, callback: (img: string) => void): void {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result!.toString()));
      reader.readAsDataURL(img);
    }


  handleChange(info: { file: NzUploadFile }): void {
    if (info.file.status === 'uploading') {
      this.loading = true;
    } else if (info.file.status === 'done') {
      this.loading = false;
      this.fileSelected.emit(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      this.loading = false;
    }
  }
 

 
}
