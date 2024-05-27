import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string="";
  password: string="";

  constructor(private AlertController: AlertController) { }

  ngOnInit() {
  }

  login() {
    if (this.usuario === "admin" && this.password === "1234") {
      alert("Login correcto");
      this.presentAlert("Login correcto", "Bienvenido al sistema");
    } else {
      this.presentAlert("Error", "Usuario o contraseña incorrectos");
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

