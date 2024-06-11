import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { HomePage } from './home.page';
import { DatosComponent } from '../datos/datos.component';
import { CertificationsComponent } from '../certifications/certifications.component';
import { WorkExperienceComponent } from '../work-experience/work-experience.component';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    DatosComponent,
    CertificationsComponent,
    WorkExperienceComponent,
  ],
  providers: [provideNativeDateAdapter()],
  declarations: [HomePage]
})
export class HomePageModule {}
