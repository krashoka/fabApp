import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-floating-chat',
  templateUrl: './floating-chat.page.html',
  styleUrls: ['./floating-chat.page.scss'],
})
export class FloatingChatPage implements OnInit {
  chatCount: number = 0;
  chats: any = [];
  chatMsg: any;

  constructor(
    private router: Router,
    private storage: Storage,
    private _apiService: ApiService
  ) {
    this.storage.create();
  }

  ngOnInit() {
    this.storage.get('admin').then((value) => {
      let userid = value.userid;

      let data = {
        uid: value.userid,
      };
      this._apiService.getChats(data).subscribe((res: any) => {
        console.log('Chat Data:', res);

        this.chats = res;

        for (let i = 0; i < res.length; i++) {
          if (res[i].sender == 'admin' && res[i].status == 'unseen') {
            this.chatCount++;
          }
        }
      });
    });
  }

  @ViewChild('content', { static: false }) content: any = ElementRef;

  sendChat() {
    this.storage.get('admin').then((value) => {
      let data = {
        uid: value.userid,
        msg: this.chatMsg,
      };

      console.log('sendClick:', data);
      this._apiService.sendChat(data).subscribe((res: any) => {
        console.log('chat response msg:', res);
        if (res == 'sent') {
          let uid = {
            uid: value.userid,
          };
          this._apiService.getChats(uid).subscribe((res: any) => {
            console.log('Chat Data:', res);

            this.chats = res;

            for (let i = 0; i < res.length; i++) {
              if (res[i].sender == 'admin' && res[i].status == 'unseen') {
                this.chatCount++;
              }
            }

            setTimeout(() => {
              this.content.nativeElement.scrollTo({
                top: this.content.nativeElement.scrollHeight,
                behavior: 'smooth',
              });
            }, 100);
          });
        }
        this.chatMsg = '';
      });
    });
  }

  onDropdownSelect = false;
  openFloatingChat() {
    this.storage.get('admin').then((value) => {
      if (value != null) this.onDropdownSelect = !this.onDropdownSelect;
      else this.router.navigate(['login']);

      let data = {
        uid: value.userid,
      };
      this._apiService.openChat(data).subscribe((res: any) => {
        this.chatCount = 0;
      });

      setTimeout(() => {
        this.content.nativeElement.scrollTo({
          top: this.content.nativeElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    });
  }

  dismissSideMenu() {
    this.onDropdownSelect = !this.onDropdownSelect;
  }
}
