import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  userService = inject(UserService);
  router = inject(Router);
  user = this.userService.getUser();

  ngOnInit() {
    if (!this.user) {
      this.router.navigate(['/']);
    }
  }
}
