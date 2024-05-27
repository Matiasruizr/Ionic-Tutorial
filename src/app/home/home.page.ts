import {Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';


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

  private titleAnimaton: Animation = {} as Animation;
  private inputsAnimation: Animation = {} as Animation;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private AlertController: AlertController,
    private animationCtrl: AnimationController,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.["user"];
        this.password = this.router.getCurrentNavigation()?.extras?.state?.["password"];
      }
    });
  }

  ngAfterViewInit() {
    // Initialize the animations
    const element = document.querySelector('#welcome_text') as HTMLElement;
    this.titleAnimaton =  this.leftToRightAnimation(element)

    const inputsAnimated = document.querySelectorAll('.animated_inputs') as NodeListOf<HTMLElement>;
    this.inputsAnimation = this.leftToRightAnimation(inputsAnimated)

    // Play title animation when the view is ready
    this.titleAnimaton.play();
  }


  clean() {
    this.name = "";
    this.lastName = "";
    this.education = "";
    this.bithday = "";


    this.inputsAnimation.play();
  }

  show() {
    if (this.name.trim() === "" && this.lastName.trim() === "") {
      this.presentAlert("Error", "Debe llenar nombre y apellido");
    } else {
      this.presentAlert("Datos", `Su nombre es: ${this.name} ${this.lastName} fecha de nacimiento ${this.bithday.toString()} y su nivel de educación es: ${this.education}`);
    }
  }

  
  leftToRightAnimation = (
    element: HTMLElement | NodeListOf<HTMLElement>,
    duration=1000,
    iterations=1
  ): Animation => {
    return this.animationCtrl
      .create()
      .addElement(element)
      .duration(duration)
      .iterations(iterations)
      .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
      .fromTo('opacity', '0.2', '1');
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
