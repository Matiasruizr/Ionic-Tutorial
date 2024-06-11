import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-certifications',
  standalone: true,
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class CertificationsComponent  implements OnInit {
  nombre_certificado: string = "";
  fecha_obtencion: string = "";
  certificado_vencimiento: boolean = false;
  fecha_vencimiento: string = "";

  constructor() { }

  ngOnInit() {}

  addCertification() {
    console.log("Nombre del certificado: ", this.nombre_certificado);
    console.log("Fecha de obtención: ", this.fecha_obtencion);
    console.log("Certificado vencido: ", this.certificado_vencimiento);
    console.log("Fecha de vencimiento: ", this.fecha_vencimiento);
    // Add to DB
  }

}
