import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../components/models/Tarea.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl:string = `${environment.API_URL}/api/usuarios/`;

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get<Usuario[]>(this.apiUrl);
  }




}
