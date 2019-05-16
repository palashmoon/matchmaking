import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthLoginInfo } from 'src/app/login/service/login-info';
import { AuthService } from 'src/app/login/service/auth.service';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: AuthLoginInfo = new AuthLoginInfo();
  loginForm: FormGroup;
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';


  constructor(private formBuilder: FormBuilder,
         private authService: AuthService,
         private tokenStorageService: TokenStorageService,
         private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]]
    });
    if (this.tokenStorageService.getToken()) {
      if (this.tokenStorageService.getRole() === 'consumer' ) {
        this.router.navigate([`/home/user`]);
        } else {
          this.router.navigate([`/search`]);
        }
    }
  }

  onLoginSubmit() {
    console.log(this.loginForm.value);
    this.authService.submit(this.loginForm.value).subscribe( data => {
      if (data.token != null || data.token !== '') {
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveEmail(data.email);
        this.tokenStorageService.saveRole(data.role);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        if (data.role === 'consumer' ) {
        this.router.navigate([`/home/user`]);
        } else {
          this.router.navigate([`/search`]);
        }
      }
      }
      ,
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  logout() {
    this.tokenStorageService.signOut();
  }
  reloadPage() {
    window.location.reload();
  }
}
