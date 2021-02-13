import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons/buttons.module';
import { DatepickerModule } from 'ngx-bootstrap/datepicker/datepicker.module';
import {TabsModule} from 'ngx-bootstrap/tabs/tabs.module';
import { TimepickerModule } from 'ngx-bootstrap/timepicker/timepicker.module';
import { ResourceEditComponent } from './resource/resource-edit/resource-edit.component';
import { ResourceIndexComponent } from './resource/resource-index/resource-index.component';


@NgModule({
  declarations: [ResourceEditComponent, ResourceIndexComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    DatepickerModule,
    TabsModule,
    TimepickerModule,
  ]
})
export class GeneralModule { }
