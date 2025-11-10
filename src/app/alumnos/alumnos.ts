import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface CrudAlumnos {
  id: number;
  nombre: string;
  apellido: string;
  representante: string;
  telefono: string;
  email: string;
  direccion: string;
  nivel: string;
  colegio: string;
}

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css',
})

export class Alumnos  implements OnInit{
  
  form: FormGroup;
  alumnos: Alumnos[] = [];
  editMode = false;
  editAlumnoId: number | null = null;


 constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      representante: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      nivel: ['', Validators.required],
      colegio: ['', Validators.required],
      
    });
  }

 ngOnInit() {
    this.loadAlumnos();
  }

  loadAlumnos() {
    this.http.get<Alumnos[]>('http://localhost:8080/api/alumnos').subscribe(data => {
      this.alumnos = data;
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.editMode && this.editAlumnoId !== null) {
        this.http.patch(`http://localhost:8080/api/alumnos/${this.editAlumnoId}`, this.form.value)
          .subscribe(() => {
            this.loadAlumnos();
            this.resetForm();
          });
      } else {
        this.http.post('http://localhost:8080/api/alumnos', this.form.value)
          .subscribe(() => {
            this.loadAlumnos();
            this.resetForm();
          });
      }
    }
  }

  editAlumno(alumno: Alumnos) {
    this.editMode = true;
    this.editAlumnoId = alumno.id;
    this.form.patchValue({
      id: alumno.id,
      email: alumno.email,
    
    });
  }

  deleteAlumno(id: number) {
    this.http.delete(`http://localhost:8080/api/alumnos/${id}`)
      .subscribe(() => {
        this.loadAlumnos();
      });
  }

  resetForm() {
    this.editMode = false;
    this.editAlumnoId = null;
    this.form.reset();
  }
}
