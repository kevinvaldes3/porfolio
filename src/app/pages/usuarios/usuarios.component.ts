import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogEditarComponent } from 'src/app/component/modales/dialog-editar/dialog-editar.component';
import { DialogEliminarComponent } from 'src/app/component/modales/dialog-eliminar/dialog-eliminar.component';
import { DialogUsuarioComponent } from 'src/app/component/modales/dialog-usuario/dialog-usuario.component';
import { Usuario } from 'src/app/interfaces/usuario';
import { LoginService } from 'src/app/service/login.service';
import { LoguotService } from 'src/app/service/loguot.service';
import { UsuarioLoginService } from 'src/app/service/usuarioLogin.service';
import { UsuariosService } from 'src/app/service/usuarios.service';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  private sort: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;
  
  isAdmin: boolean = false;
  displayedColumns: string[] = ['uid','rol', 'estado','nombre', 'correo','google','button' ];
  usaurioSesion:any;
  nombreUsuario:string='';
  rolUsuario:string='';
  correoUsuario:string='';

  dataSource: any;  
  constructor(private _logout: LoguotService,
    private _login: LoginService,
    public dialog: MatDialog,
    private _usuarioServices: UsuariosService,
    private cdref: ChangeDetectorRef) {
      
    }

  ngOnInit(): void {
    this.isAdmin = this._login.validarRolUser();  
    this.validarUsuario();
    this.traerUsuario();    
  }

 
  validarSesion() {
    const tokenSesion = localStorage.getItem("Token");
    if (tokenSesion != '') {
      this._logout.cerrarSesion$.emit(false);
    } else {
      this._logout.cerrarSesion$.emit(true);
    }
  }

  validarUsuario(){
    let valorUsuario:any = "{correo:'',estado:true, google:false,nombre:'',rol:'',uid:''}"
    if (localStorage.getItem("Usaurio") == '') {
       localStorage.setItem("Usaurio",valorUsuario);
    }else{
      valorUsuario = localStorage.getItem("Usaurio");
    }
    this.usaurioSesion = JSON.parse(valorUsuario)
    this.nombreUsuario = this.usaurioSesion.nombre;
    this.rolUsuario = this.usaurioSesion.rol;   
    this.correoUsuario = this.usaurioSesion.correo;
  }

  traerUsuario() {
    this._usuarioServices.getUsuarios().subscribe({
      next: (data) => { this.asiganarUsuario(data) },
      error: (error) => console.log(error)
    });
  }

  asiganarUsuario(data: Usuario) {
    const ELEMENT_DATA_USUARIO: any = data;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA_USUARIO.usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdref.detectChanges();

  }

  openDialog() {
    this.dialog.open(DialogUsuarioComponent, {
      width: '600px',
      height: '600px'
    });
  }

  editarUsuario(_id:string){
    //console.log(_id);
    const dataEditar ={
      id:_id,
      tipo:"usurio"
    }
    this.dialog.open(DialogEditarComponent,{
      width: '600px',
      height:'600px',
      data:dataEditar
    });
    
  }

  eliminarUsuario(_id:string){
    //console.log(_id);
    const dataEliminar ={
      id:_id,
      tipo:"usuario"
    }
    this.dialog.open(DialogEliminarComponent,{
      width: '569px',
      height:'400px',
      data:dataEliminar 
    });
  }
}
