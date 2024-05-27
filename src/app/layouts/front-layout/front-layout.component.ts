import { Component,EventEmitter,Input,Output, ViewChild} from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../views/services/search.service';

@Component({
  selector: 'app-front-layout',
  standalone: true,
  imports: [HeaderComponent,RouterModule],
  templateUrl: './front-layout.component.html',
  styleUrl: './front-layout.component.scss'
})
export class FrontLayoutComponent {
  
  constructor(private ss:SearchService){}
 

 
  onApplySearch(keyword: any): void {
    this.ss.setSearchKeyword(keyword);
  }
}
