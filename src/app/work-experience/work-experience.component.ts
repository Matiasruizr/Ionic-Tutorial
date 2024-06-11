import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
})
export class WorkExperienceComponent  implements OnInit {
  empresa: string = "";
  anio_inicio: string = "";
  anio_termino: string = "";
  trabajo_actual: boolean = false;

  constructor() { }

  ngOnInit() {}

  addWorkExperience() {
    console.log("Empresa: ", this.empresa);
    console.log("Año de inicio: ", this.anio_inicio);
    console.log("Año de término: ", this.anio_termino);
    console.log("Trabajo actual: ", this.trabajo_actual);
    // Add to DB
  }

}
