/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonStorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private ionStorage: IonStorageService
  ) {
    this.registerForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      username: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {
  }

  registerUser() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.auth.postRegister(this.registerForm.value)
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
  navigateToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
