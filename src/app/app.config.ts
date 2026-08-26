import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {

  providers: [

    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideFirebaseApp(() =>
      initializeApp({

        apiKey: "AIzaSyArPXwSlyn3q9BsONFdkObMAIClierdKSQ",

        authDomain: "domotica-ce0bd.firebaseapp.com",

        projectId: "domotica-ce0bd",

        storageBucket: "domotica-ce0bd.firebasestorage.app",

        messagingSenderId: "740642240034",

        appId: "1:740642240034:web:530aec3610c958b68bbc7b"

      })
    ),

    provideFirestore(() => getFirestore())

  ]

};