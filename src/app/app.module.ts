import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginSignupComponent } from './login-signup/login-signup.component';

var firebaseConfig = {
  apiKey: "AIzaSyBebxSLCsbeCESiYjwOoINvMN8MAJALf3c",
  authDomain: "zemoga-test-bb1e3.firebaseapp.com",
  projectId: "zemoga-test-bb1e3",
  storageBucket: "zemoga-test-bb1e3.appspot.com",
  messagingSenderId: "850130367954",
  appId: "1:850130367954:web:741d306f9de37ff45e440b"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginSignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
