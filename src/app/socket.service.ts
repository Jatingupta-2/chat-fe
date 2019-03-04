import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import{Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import{Cookie} from 'ng2-cookies/ng2-cookies';
import{HttpHeaders,HttpErrorResponse,HttpParams,HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url='https://chatapi.edwisor.com';
  private socket;

  constructor(private http:HttpClient) {
    this.socket=io(this.url)
   }
   public verifyUser=()=>{
     return Observable.create((Observer)=>{
       this.socket.on('verifyUser',(data)=>{
         Observer.next(data);
       })
     })
   };

   public OnlineUser=()=>{
     return Observable.create((Observer)=>{
       this.socket.on('online-user-list',(data)=>{
         Observer.next(data);
       })
     })
   };

   public disconnected=()=>{
     return Observable.create((Observer)=>{
       this.socket.on('disconnected',()=>{
         Observer.next();
       })
     })
   };

   public setUser=(authToken)=>{
     this.socket.emit('set-user',authToken);
   }

   public markChatAsSeen=(userDetails)=>{
     this.socket.emit('mark-chat-as-seen',userDetails);
   }

   public getChat(senderId,receiverId,skip):Observable<any>{
     return this.http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get('authToken')}`)
    .do(data=>console.log('Data received'))
    .catch(this.handleError);

   }

   public chatByUserId=(userId)=>{
     return Observable.create((Observer)=>{
       this.socket.on(userId,(data)=>{
         Observer.next(data);
       })
     })
   };

   public sendChatMessage=(chatMsgObj)=>{
     this.socket.emit('chat-msg',chatMsgObj);
   }
   public exitSocket=()=>{
     this.socket.disconnect();
   }

   public handleError=(err:HttpErrorResponse)=>{
let eM='';
if(err.error instanceof Error){
  eM=`${err.error.message}`;
}
else{
  eM=`${err.message}`;
}
console.log(eM);
return Observable.throw(eM);
   }
}
