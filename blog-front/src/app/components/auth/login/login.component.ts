import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('token') && localStorage.getItem('id'))
      this.route.navigate(['liste-articles'])
  }
  onSubmit(): void {
    if (this.loginForm.valid)
      this.authService.login(this.loginForm.value).subscribe((data) => {
        if (data && data._id) {
          localStorage.setItem('id', data._id);
          localStorage.setItem('token', data.access_token);
          dispatchEvent(new Event("storage"));
          this.route.navigate(['/mes-articles']);
        }
      });
  }
}
