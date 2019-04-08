import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';


import { AppService } from '../../app.service';
import { SocketService } from '../../socket.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
  providers: [SocketService]
})
export class ChatboxComponent implements OnInit {

  @ViewChild('scrollMe', { read: ElementRef })

  public scrollMe: ElementRef;

  public authToken: any;
  public userInfo: any;
  public receiverId;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;
  public scrollToChatTop: boolean = false;
  public previousChatList: any = [];
  public messageText: any;
  public messageList: any = [];
  public pageValue: number = 0;
  public loadingPreviousChat: boolean = false;

  constructor(private apps: AppService, private socket: SocketService,
    private toastr: ToastrService, public router: Router) {
    this.receiverId = Cookie.get('receiverId');
    
  }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.receiverId = Cookie.get('receiverId');
    
    this.userInfo = this.apps.getUserInfo();
    
    console.log(this.authToken, this.receiverId, this.receiverName);
    if (this.receiverId != null || this.receiverId != undefined || this.receiverId != '') {
      
    }
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getOnlineUserList();
    Array.isArray(this.messageList);
    this.getMessageFromAUser();

  


  }
  

  

  public checkStatus: any = () => {
    if (Cookie.get('authToken') == undefined || Cookie.get('authToken') == '' || Cookie.get('authToken') == null) {
      console.log("checking status")
      this.router.navigate(['/']);
      return false;
    }
    else {
      return true;
    }
  }


  public verifyUserConfirmation: any = () => {
    this.socket.verifyUser().subscribe((data) => {
      this.disconnectedSocket = false;
      this.socket.setUser(this.authToken);
      this.getOnlineUserList();

    })
  }


  public getOnlineUserList: any = () => {

    this.socket.OnlineUser().subscribe((userlist) => {
      this.userList = [];

      for (let x in userlist) {

        let temp = { 'userId': x, 'userName': userlist[x], 'unread': '0' , 'chatting': false };

        this.userList.push(temp);
      }

      console.log(this.userList);
    });
  }


  public getPreviousChatWithAUser: any = () => {

    let previousData = (this.messageList.length > 0 ? this.messageList.slice() : '')
    console.log(this.userInfo, this.receiverId, this.pageValue * 10);
    this.socket.getChat(this.userInfo.userId, this.receiverId, this.pageValue * 10)
      .subscribe((apiResponse) => {
        console.log(apiResponse);
        if (apiResponse.status == 200) {
          this.messageList = apiResponse.data.concat(previousData);

        }
        else {
          this.messageList = previousData;
          this.toastr.warning(apiResponse.message);
        }
        this.loadingPreviousChat = false;
      }
        , (err) => {
          this.toastr.error('Some Error');
        });
  }

  public loadEarlierPageOfChat:any=()=>{
    console.log("Loading Previous Chat")
    this.loadingPreviousChat=true;
    this.pageValue++;
    this.scrollToChatTop=true;
    this.getPreviousChatWithAUser();
  }

  public userSelectedToChat:any=(id,name)=>{
    console.log("setting user Active");
    console.log(name);
    this.userList.map((user)=>{
      if(user.userId==id){
        user.chatting=true;
      }
      else{
        user.chatting=false;

      }
    });
    Cookie.set('receiverId',id);
    Cookie.set('receiverName',name);
    
    this.receiverId=id;
    this.receiverName=name;
    this.messageList=[];
    this.pageValue=0;


    let chatDetails={
      userId:this.userInfo.userId,
      senderId:id
    }

    this.socket.markChatAsSeen(chatDetails);
    this.getPreviousChatWithAUser();
  }

  

  public sendMessageUsingKeyPress:any=(event:any)=>{
    
    
    
    if(event.keyCode===13){
      this.sendMessage();
    }
  }

  public sendMessage:any=()=>{

    if(this.messageText){
      let chatMsgObject={
        senderName:this.userInfo.firstName+' '+this.userInfo.lastName,
        senderId:this.userInfo.userId,
        receiverName:Cookie.get('receiverName'),
        receiverId:Cookie.get('receiverId'),
        message:this.messageText,
        createdOn: new Date()
      }

      console.log(chatMsgObject);
      this.socket.sendChatMessage(chatMsgObject);
      this.pushToChatWindow(chatMsgObject);
    }
    else{
      
      this.toastr.warning("Text is empty");
      this.messageText="";
    }
  }


  public pushToChatWindow:any=(data)=>{
    this.messageText="";
    this.messageList.push(data);
    this.scrollToChatTop=false;
  }


  public getMessageFromAUser:any=()=>{
    this.socket.chatByUserId(this.userInfo.userId)
    .subscribe((data)=>{
      (this.receiverId==data.senderId)?this.messageList.push(data):'';
      this.toastr.success(`${data.senderName} says ${data.message}`);
      this.scrollToChatTop=false;
    })
  }


  public logout:any=()=>{
    this.apps.logout().subscribe((myResponse)=>{
      if(myResponse.status==200){
        console.log("Logging Out");
        Cookie.delete('receiverId');
        Cookie.delete('receiverName');
        Cookie.delete('authToken');
        this.socket.exitSocket();
        this.router.navigate(['/']);

      }
      else{
        this.toastr.error(myResponse.message)
      }
    },
  (err)=>{
    this.toastr.error("Error");
  }
  )
  }


  showUserName =(name:string)=>{

    this.toastr.success("You are chatting with "+name)

  }









    


}
