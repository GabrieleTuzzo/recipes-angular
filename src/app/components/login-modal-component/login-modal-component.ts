import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-modal-component',
  imports: [FormsModule],
  templateUrl: './login-modal-component.html',
  styleUrl: './login-modal-component.css',
})
export class LoginModalComponent {
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isModalOpen = signal(false);
  error = '';

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.isModalOpen.set(params['login'] === 'true');
    });
  }

  handleCloseModal() {
    this.isModalOpen.set(false);
    this.router.navigate(['./'], { queryParams: { login: null }, queryParamsHandling: 'merge' });
  }

  handleLogin(formData: NgForm) {
    if (formData.invalid) return;

    if (this.userService.login(formData.value)) {
      this.isModalOpen.set(false);
      this.router.navigate(['./'], { queryParams: { login: null }, queryParamsHandling: 'merge' });
      formData.reset();
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
