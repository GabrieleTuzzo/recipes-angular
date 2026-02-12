import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-header-component',
  imports: [RouterModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  userService = inject(UserService);
}
