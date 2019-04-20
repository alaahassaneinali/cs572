import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { JWTInterceptorService } from './jwtinterceptor.service';

@Component({
  selector: 'data-driven',
  templateUrl: 'data-driven.component.html'
})
export class DataDrivenComponent {
  myForm: FormGroup;
  loginForm: FormGroup;

  genders = [
    'male',
    'female'
  ];

  constructor(private formBuilder: FormBuilder, public http: HttpClient, private ser: JWTInterceptorService) {
    this.myForm = formBuilder.group({
      'userData': formBuilder.group({
        'firstName': ['', Validators.required],
        'lastName': ['', Validators.required],
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
        'password': ['', Validators.required],
      }),
      'confirmPassword': ['', Validators.required],
    });

    this.loginForm = formBuilder.group({
      'userLogin': formBuilder.group({
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],

        'password': ['', Validators.required],
      })
    });
  }

  onSubmit() {
    this.http.post('http://localhost:3000/users/signup', this.myForm.value.userData)
      .subscribe(result => {
        console.log(result['token']);
        localStorage.setItem('jwt', result['token']);
      })
  }

  onLogin() {
    this.http.post('http://localhost:3000/users/login', this.loginForm.value.userLogin)
      .subscribe(result => {
       
        localStorage.setItem('jwt', result['token']);
      })
  }

  submitSapmleRequest() {
    this.http.post('http://localhost:3000/protected', {});
  }

}
