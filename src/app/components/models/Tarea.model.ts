export interface Usuario {
    usuarioId: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol: string;
}


export interface Tarea {
    tareaId: number;
    nombre: string;
    descripcion: string;
    fecha: Date;
    estado: boolean;
    usuario: Usuario;
}

export interface TareaTabla {
    TareaId: number;
    Nombre: string;
    Descripcion: string;
    Fecha: Date;
    Estado: boolean;
    UsuarioNombre: string;
    UsuarioApellido: string;
    UsuarioEmail: string;
    UsuarioPassword: string;
    UsuarioRol: string;
}

//export interface createTareaDTO  extends Omit <Tarea  >{

//}

