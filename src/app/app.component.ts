import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NzIconModule,HttpClientModule,FormsModule,NzMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Auto_Parts';
  suffixIconSearch: any;
}
