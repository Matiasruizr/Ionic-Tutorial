import {Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { DbTaskService } from '../services/db-task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedSegment = "work-experience";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private AlertController: AlertController,
    private animationCtrl: AnimationController,
    private dbService: DbTaskService
  ) {

  }

  ngAfterViewInit() {
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  logout() {
    localStorage.setItem('active_session', 'no');
    localStorage.setItem('user', '');
    const user_name = localStorage.getItem('user') || '';
    this.dbService.updateSession(user_name, 0);
    this.router.navigate(['/login']);
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
