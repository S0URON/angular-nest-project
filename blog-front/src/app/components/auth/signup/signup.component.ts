import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem('id'))
      this.route.navigate(['liste-articles']);
  }
  onSubmit(): void {
    if (
      this.signupForm.valid &&
      this.signupForm.value.confirmPassword === this.signupForm.value.password
    )
      this.authService.signUp(this.signupForm.value).subscribe(() => {
        this.route.navigate(['/login']);
      });
  }
}
