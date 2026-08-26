import { Injectable } from '@angular/core';

import {

  initializeApp

} from 'firebase/app';

import {

  getFirestore,
  doc,
  setDoc,
  onSnapshot

} from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyArPXwSlyn3q9BsONFdkObMAIClierdKSQ",

  authDomain: "domotica-ce0bd.firebaseapp.com",

  projectId: "domotica-ce0bd",

  storageBucket: "domotica-ce0bd.firebasestorage.app",

  messagingSenderId: "740642240034",

  appId: "1:740642240034:web:530aec3610c958b68bbc7b"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})

export class DomoticaService {

  dispositivoRef = doc(
    db,
    'domotica',
    'dispositivos'
  );

  escuchar(callback:any){

    onSnapshot(this.dispositivoRef,(docu)=>{

      callback(docu.data());

    });

  }

  actualizarEstados(data:any){
      return setDoc(
    this.dispositivoRef,
    data
  );

  }

}