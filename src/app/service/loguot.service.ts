import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoguotService {
  cerrarSesion$= new EventEmitter<boolean>();  
  constructor() { }  
}
