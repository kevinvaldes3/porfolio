import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { LoguotService } from 'src/app/service/loguot.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private _logout:LoguotService,private _login:LoginService ) { }

  ngOnInit(): void {

    this._login.logout();
    //localStorage.setItem('Token', '')
    //localStorage.setItem('Usaurio','');
    this._logout.cerrarSesion$.emit(true); 
    this.router.navigate(['/categorias']); 
  }

}
