import { Component,  AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Tarea, Usuario, TareaTabla } from '../models/Tarea.model';

import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla-tareas',
  templateUrl: './tabla-tareas.component.html',
  styleUrls: ['./tabla-tareas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class TablaTareasComponent implements AfterViewInit, OnChanges {

  constructor(private tareaService: TareaService, private usuarioService: UsuarioService) { }

  tablaTareas: Tarea[] = []  
  columnsToDisplay: string[] = ['TareaId', 'Nombre', 'Descripcion', 'Fecha', 'Estado',  'Usuario', 'acciones'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource = new MatTableDataSource(this.tablaTareas);
  
  @Input() TareaCreada: Tarea = { 
    tareaId: 0,
    nombre: '',
    descripcion: '',
    fecha:  new Date(),
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

  @Output() nuevaTareaEditar = new EventEmitter<Tarea>();

  ngAfterViewInit(): void {
    this.tareaService.getTareas().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
      }
    );
  }

  eliminarTarea(id: number) {
    console.log(id);
    this.tareaService.deleteTarea(id).subscribe(
      res => {       
        this.tareaService.getTareas().subscribe(
          res => {
            this.dataSource = new MatTableDataSource(res);
          }
        );
      }
    )
  }

  editarTarea(id: number) {
    this.tareaService.getTarea(id).subscribe(
      res => {
        this.nuevaTareaEditar.emit(res);  
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {    
    if (changes.TareaCreada.currentValue.id !== 0) {
     //reload data
      this.tareaService.getTareas().subscribe(
        res => {
          this.dataSource = new MatTableDataSource(res);
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
