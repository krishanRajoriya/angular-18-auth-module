import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Login, User } from '../../../interface/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg: String = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
    email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(){
  }

  onSubmit() {
    this.errorMsg = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payLoad: Login = {
      username:this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    console.log('payload', payLoad);

    this.authService.login(payLoad).subscribe((response:User) => {
      // console.log('Login successful:', response);
      const token = response.accessToken  || ''; 
      this.authService.setToken(token);
      localStorage.setItem("user",JSON.stringify(response));
      this.router.navigate(['/home']);
    });
  }


}
