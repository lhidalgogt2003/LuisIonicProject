import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonStorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  authErrorsMessage;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private ionStorage: IonStorageService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {
  }

  loginUser() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.auth.postLogin(this.loginForm.value)
        .subscribe((response: any) => {
          console.log(response);
          if (response.jwt != null) {
            this.ionStorage.storageSet('token', response.jwt);
            this.ionStorage.storageSet('user', response.user);
            this.router.navigateByUrl('/home');
          }
        });
    }
  }
  navigateToRegisterPage() {
    this.router.navigateByUrl('/register');
  }

}
