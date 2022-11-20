import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import { Tarea } from '../models/Tarea.model';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareaValor: Tarea = {
    tareaId: 0,
    nombre: '',
    descripcion: '',
    fecha: new Date(),
    estado: false,
    usuario: {
      usuarioId: 0,
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      rol: ''
    }
  }


  @Input() TareaCreada: Tarea ={
    tareaId: 0,
    nombre: '',
    descripcion: '',
    fecha: new Date(),
    estado: false,
    usuario: {
      usuarioId: 0,
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      rol: ''
    }

  } ;  
  @Output() TareaCreadaOut = new EventEmitter<Tarea>();
  
  @Output() TareaEditarOut = new EventEmitter<Tarea>();

  constructor( private tareaService: TareaService) { }

  ngOnInit(): void {
  }

  nuevaTareaMetodo(TareaCreada: Tarea): void {
    this.TareaCreadaOut.emit(TareaCreada);
    this.tareaValor = TareaCreada;
    console.log("tareas.component " + TareaCreada);
  }

  editarTareaMetodo(TareaEditar: Tarea): void {
    this.TareaEditarOut.emit(TareaEditar);
    this.tareaValor = TareaEditar;
    console.log("tareas.component " + TareaEditar);
  }


}
