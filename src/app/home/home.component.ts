import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetaServiceService } from '../services/meta-service.service';
import { Meta } from '../models/Metas/meta';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // Usamos un Observable para leer los datos en tiempo real desde Firestore
  metas$!: Observable<Meta[]>;
  
  // Variable para capturar lo que el usuario escribe en el input
  nuevaMeta: string = '';
  constructor(private metaService: MetaServiceService) {}
  ngOnInit(): void {
    // Al iniciar el componente, cargamos las metas
    this.metas$ = this.metaService.getMetas();
  }
  agregarMeta(): void {
    if (this.nuevaMeta.trim().length > 0) {
      this.metaService.addMeta(this.nuevaMeta).then(() => {
        this.nuevaMeta = ''; // Limpiamos el input después de guardar
      }).catch(error => console.error("Error al agregar:", error));
    }
  }

  eliminarMeta(id: string | undefined): void {
    if (id) {
      this.metaService.deleteMeta(id)
        .catch(error => console.error("Error al eliminar:", error));
    }
  }
}
