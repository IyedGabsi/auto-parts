import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MenuService, NzIsMenuInsideDropDownToken, NzMenuModule } from 'ng-zorro-antd/menu';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    NzMenuModule
  ],
  providers: [MenuService]
})
export class LayoutsModule { }
