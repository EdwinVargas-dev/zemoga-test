import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.sass', '../home/home.component.sass']
})
export class LoginSignupComponent implements OnInit {
  errorLogin: string = ''
  errorSignUp: string = ''
  validateSignUp = false

  formLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  formSignUp = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    marriageStatus: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
  });

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private router:Router) { }

  ngOnInit(): void {
  }

  login(credentials: any) {
    this.errorLogin = ''
    this.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(result => {
      localStorage.setItem('email', btoa(credentials.email))
      this.router.navigate([''])
    }).catch(error => {
      if (error.message) this.errorLogin = error.message
    })
  }

  signUp(dataToAccount: any) {
    this.errorSignUp = ''
    this.auth.createUserWithEmailAndPassword(dataToAccount.email, dataToAccount.password).then(result => {
      delete dataToAccount.password
      this.db.collection('users').doc(dataToAccount.email).set(dataToAccount).then(resultUser => {
        this.formSignUp.reset()
        this.validateSignUp = false
      })
    })
  }

}
