import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//* Firebase imports:
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//* NGRX Redux:
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//* Project imports:
import { environment } from '../environments/environment';
import { firebaseAppConfig } from './configs/firebase-app.config';
import { appReducers } from './app.reducer';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //* Firebase configs:
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    //* NgRx configs:
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({ 
      projectId: firebaseAppConfig.projectId,
      appId: firebaseAppConfig.appId,
      storageBucket: firebaseAppConfig.storageBucket,
      apiKey: firebaseAppConfig.apiKey,
      authDomain: firebaseAppConfig.authDomain,
      messagingSenderId: firebaseAppConfig.messagingSenderId,
      measurementId: firebaseAppConfig.measurementId,
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
