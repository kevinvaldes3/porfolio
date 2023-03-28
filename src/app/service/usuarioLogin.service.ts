import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLoginService {
  rolUsuario$= new EventEmitter<boolean>();  
  constructor() { }
}
