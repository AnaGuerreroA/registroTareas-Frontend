import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from  '@angular/common/http';
import {  Tarea } from '../components/models/Tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl:string = `${environment.API_URL}/api/tareas/`;

  constructor(private http: HttpClient) { }

  getTareas(){
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  getByUsuario(usuarioId: string, limit?: string, offset?: string){
    let params = new HttpParams();
    if(limit && offset != null){
      params = params.append('limit', limit);
      params = params.append('offset', offset);
    }
    return this.http.get<Tarea[]>( `${this.apiUrl}usuario/${usuarioId}/tareas/` , {params})
  }  
  getTarea(id:number){
    return this.http.get<Tarea>(`${this.apiUrl}${id}`);
  }  
  createTarea(tarea:Tarea){
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }  
  updateTarea(tarea:any){
    return this.http.put<Tarea>(this.apiUrl, tarea);
  }  
  deleteTarea(id:number){
    return this.http.delete(`${this.apiUrl}${id}`);
   } 

}
