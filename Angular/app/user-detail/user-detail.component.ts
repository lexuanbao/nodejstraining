import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  id: number;
  user: User | undefined;
  userEditFlag: boolean;
  
  constructor(
    private location: Location,
    private userService: UserService,
    private route: ActivatedRoute,
    private message: MessageService
    ){}

  ngOnInit(): void {
    this.getUserById();
    this.checkEditFlag();
  }

  goBack(){
    this.location.back();
  }

  getUserById(){
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if(!isNaN(this.id)){
      this.userService.getUserById(this.id).subscribe(user => this.user = user);
    }
  }

  checkEditFlag(){
    //Nếu id truyền qua là undefine hoặc null thì sẽ là mode add new, ngược lại sẽ là mode edit
    if(isNaN(this.id)){
      //Add new
      this.userEditFlag = false;
    } else {
      //Edit
      this.userEditFlag = true;
    }
  }

  SaveButtonOnclick(_userId: string, _fullNane: string, _kanaName: string, _birthDay: string ){
    this.user = {
      userId: isNaN(parseInt(_userId)) ? "" : parseInt(_userId),
      fullNane: _fullNane,
      kanaName: _kanaName,
      birthDay: _birthDay
    }
    this.checkEditFlag();
    //Nếu userEditFlag là false thì sẽ vào mode insert
    if(!this.userEditFlag){
      this.userService.insertUser(this.user).subscribe(
        msg => this.message.addMsg(msg),
        e => this.message.addErrorResponse(e)
      );
    } else {
      this.userService.updateUser(this.user).subscribe(
        msg => this.message.addMsg(msg),
        e => this.message.addErrorResponse(e)
      );
    }
  }
}
