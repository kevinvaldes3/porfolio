export interface Usuario {
    rol: string,
    estado: boolean,
    google: boolean,
    nombre: string,
    correo: string,
    uid: string
}

export interface UsaurioSesion {
    correo?: string, 
    estado?: boolean, 
    google?: boolean, 
    nombre?: string, 
    rol?: string, 
    uid?: string
}

