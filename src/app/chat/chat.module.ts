import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox/chatbox.component';
import {RouterModule,Routes} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketService } from '../socket.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ ChatboxComponent],
  imports: [
    CommonModule,
    
    
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forChild([
      {path:'chat',component:ChatboxComponent}
    ])
  ],
  providers:[SocketService]
})
export class ChatModule { }
