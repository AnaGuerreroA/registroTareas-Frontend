export interface Tarea {
    TareaId: number;
    Nombre: string;
    Descripcion: string;
    Fecha: Date;
    Estado: boolean;
    UsuarioId: number;
}

export interface Usuario {
    usuarioId: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    rol: string;
    Tareas: Tarea[];
}
