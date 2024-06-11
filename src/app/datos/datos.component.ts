import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss'],
})
export class DatosComponent  implements OnInit {

  user: string = ""
  password: string = ""
  name: string = ""
  lastName: string = ""
  education: string = ""
  bithday: string = ""

  constructor() { }

  ngOnInit() {}

  clean() {
    this.name = "";
    this.lastName = "";
    this.education = "";
    this.bithday = "";
  }

  show() {
    console.log("User: ", this.user);
  }
}
