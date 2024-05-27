import { Component , OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../views/services/auth.service';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule,HeaderComponent,NzLayoutModule,SidebarComponent,NzIconModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
 constructor(){}
}
