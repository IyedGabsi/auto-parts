import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule, NzSiderComponent } from 'ng-zorro-antd/layout';
import { MenuService, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../views/services/auth.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { UsersDataService } from '../../../views/services/users-data.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,NzLayoutModule,NzMenuModule, NzSiderComponent,NzIconModule,NzBreadCrumbModule ,NzButtonModule,NzIconModule,CommonModule],
  providers: [MenuService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  name:any
  constructor(public as:AuthService,private uds:UsersDataService){
    this.uds.getLoggedUserData().subscribe((data:any)=>{
      this.name=data.data.name
     })
  }
  
  isCollapsed = false;
  navigateToUsers() {
    // Your logic for navigating to the Users page
    console.log('User clicked'); // Example placeholder
  }

  navigateToTeams() {
    // Your logic for navigating to the Teams page
    console.log('Team clicked'); // Example placeholder
  }
  logout(){
    this.as.logout()
  }
}
