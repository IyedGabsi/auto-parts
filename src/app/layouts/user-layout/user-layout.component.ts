import { Component,EventEmitter,Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuService, NzIsMenuInsideDropDownToken, NzMenuModule, NzMenuServiceLocalToken } from 'ng-zorro-antd/menu';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterModule,HeaderComponent,SidebarComponent,NzLayoutModule,NzIconModule,NzMenuModule],
  providers: [MenuService],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {
 

}
