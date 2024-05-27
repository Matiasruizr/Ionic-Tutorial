import {Component} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  user: string = ""
  password: string = ""
  name: string = ""
  lastName: string = ""
  education: string = ""
  bithday: string = ""

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private AlertController: AlertController) {

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.["user"];
        this.password = this.router.getCurrentNavigation()?.extras?.state?.["password"];
      }
    });
  }

  clean() {
    this.user = "";
    this.password = "";
    this.name = "";
    this.lastName = "";
    this.education = "";
    this.bithday = "";
  }

  show() {
    if (this.name.trim() === "" && this.lastName.trim() === "") {
      this.presentAlert("Error", "Debe llenar nombre y apellido");
    } else {
      this.presentAlert("Datos", `Su nombre es: ${this.name} ${this.lastName}`);
    }
  }

  async presentAlert(header:string, message: string) {
    const alert = await this.AlertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}

