import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interface/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userData: User | null = null;
  userList: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUsers();
    let user = localStorage.getItem("user") || "";
    this.userData = JSON.parse(user);
    // console.log(JSON.parse(user))
  }

  logout() {
    this.authService.logout();
  }

  getUsers() {
    this.authService.getAllUsers().subscribe((res) => {
      // console.log('user', res);
      this.userList = res
    })
  }

}
