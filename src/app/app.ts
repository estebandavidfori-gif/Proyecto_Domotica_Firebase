import {

  Component,
  signal,
  OnDestroy,
  ChangeDetectorRef,
  inject

} from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';

import { DomoticaService } from './services/domotica';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',

 imports: [

  RouterOutlet,

  CommonModule,

  FormsModule

],

  templateUrl: './app.html',

  styleUrl: './app.css'
})

export class App implements OnDestroy {

  protected readonly title = signal('domotica');

  domotica = inject(DomoticaService);

  cd = inject(ChangeDetectorRef);

  latitud:number = 0;

  longitud:number = 0;

  luz:boolean = false;

  alarma:boolean = false;

  puerta:string = 'cerrada';

  temperatura:number = 22;

  watchId:any;

  constructor(){

     this.domotica.escuchar((data:any)=>{

    if(data){

      this.luz = data.luz || false;

      this.alarma = data.alarma || false;

      this.puerta = data.puerta || 'cerrada';

      this.temperatura = data.temperatura || 22;

      this.latitud = data.latitud || 0;

      this.longitud = data.longitud || 0;

    }

  });

  }

  iniciarSeguimiento(){

    if(navigator.geolocation){

      this.watchId =
      navigator.geolocation.watchPosition(

        (position)=>{

          this.latitud =
          position.coords.latitude;

          this.longitud =
          position.coords.longitude;

          this.actualizar();

          this.cd.detectChanges();

        },

        (error)=>{
          console.log(error);
        },

        {

          enableHighAccuracy:true,

          maximumAge:0,

          timeout:5000

        }

      );

    }

  }

  detenerSeguimiento(){

    if(this.watchId){

      navigator.geolocation.clearWatch(this.watchId);

    }

  }

  toggleLuz(){

    this.luz = !this.luz;

    this.actualizar();

  }

  toggleAlarma(){

    this.alarma = !this.alarma;

    this.actualizar();

  }

  togglePuerta(){

    this.puerta =
    this.puerta === 'abierta'
    ? 'cerrada'
    : 'abierta';

    this.actualizar();

  }

  actualizar(){

   this.domotica.actualizarEstados({

    luz:this.luz,

    alarma:this.alarma,

    puerta:this.puerta,

    temperatura:this.temperatura,

    latitud:this.latitud,

    longitud:this.longitud

  });

  }

  ngOnDestroy(): void {

    this.detenerSeguimiento();

  }

}