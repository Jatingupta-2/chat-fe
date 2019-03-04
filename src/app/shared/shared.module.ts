import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstCharComponent } from './first-char/first-char.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import{FormsModule} from '@angular/forms';

@NgModule({
  declarations: [FirstCharComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    FormsModule,CommonModule,FirstCharComponent,UserDetailsComponent
  ]
})
export class SharedModule { }
