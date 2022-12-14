import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TareaService } from 'src/app/services/tarea.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
import { Tarea, Usuario } from '../models/Tarea.model';

@Component({
  selector: 'app-crea-tarea',
  templateUrl: './crea-tarea.component.html',
  styleUrls: ['./crea-tarea.component.css']
})
export class CreaTareaComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(private fb: FormBuilder, private tareaService: TareaService, private usuarioService: UsuarioService ) { }
  
  Usuario: Usuario[] = [];

  @Output() nuevaTarea = new EventEmitter<Tarea>();
  @Input() tarea : Tarea = {
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

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(){
    this.usuarioService.getUsuarios().subscribe(
      res => {
        this.Usuario = res;
      }    
    );
  }

  tareaForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    fecha: ['', Validators.required],
    estado: [false, Validators.required],
    usuarioId: ['', Validators.required],
  });
  
  onSubmit() {
    this.tareaForm.value.UsuarioId = 1;
    var nuevaTarea: Tarea = this.tareaForm.value;
    var date = new Date();
    date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    nuevaTarea.fecha = date;
    nuevaTarea.estado = this.tareaForm.value.estado == 'true' ? true : false;
    this.tareaService.createTarea(nuevaTarea).subscribe(
      res => {
        this.nuevaTarea.emit(nuevaTarea);        
        this.tareaForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Tarea creada con ??xito',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err => 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo sali?? mal!',
          footer: 'Int??ntalo de nuevo'
        }
      )
    )
  }

  nuevaTareaEditar(tareaId: number) {    
    this.tareaService.getTarea(tareaId).subscribe(
      res => {        
        this.tareaForm.patchValue(res);
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tarea.currentValue.id !== 0) {
      console.log(changes);
      var datePipe = new DatePipe("en-US");
      var fecha = datePipe.transform(changes.tarea.currentValue.Fecha, 'dd-MM-yyyy');
      this.tareaForm.value.nombre = changes.tarea.currentValue.nombre;
      this.tareaForm.value.descripcion = changes.tarea.currentValue.descripcion;
      this.tareaForm.value.fecha = fecha;
      this.tareaForm.value.estado = changes.tarea.currentValue.estado == true ? 'true' : 'false';
      this.tareaForm.value.usuarioId = changes.tarea.currentValue.usuarioId;
      this.tareaForm.patchValue(this.tareaForm.value);
    }
  }
}
