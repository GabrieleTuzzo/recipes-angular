import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { LoginStateService } from '../../services/login-state-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-modal-component',
  imports: [FormsModule],
  templateUrl: './login-modal-component.html',
  styleUrl: './login-modal-component.css',
})
export class LoginModalComponent {
  userService = inject(UserService);
  loginState = inject(LoginStateService);
  error = '';

  handleLogin(formData: NgForm) {
    if (formData.invalid) return;

    if (this.userService.login(formData.value)) {
      this.loginState.closeModal();
    } else {
      formData.reset();
      this.error = 'Invalid credentials';
    }
  }
}
