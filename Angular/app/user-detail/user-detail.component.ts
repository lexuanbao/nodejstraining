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
  
  constructor(
    private location: Location,
    private userService: UserService,
    private route: ActivatedRoute,
    private message: MessageService
    ){}

  ngOnInit(): void {
    this.getUserById();
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

  SaveButtonOnclick(_userId: string, _fullNane: string, _kanaName: string, _birthDay: string ){
    this.user = {
      userId: parseInt(_userId),
      fullNane: _fullNane,
      kanaName: _kanaName,
      birthDay: _birthDay
    }
    //Nếu id truyền từ list user qua ko phải 1 số thì sẽ là insert
    if(isNaN(this.id)){
      this.userService.insertUser(this.user).subscribe(
        msg => this.message.addMsg(msg),
        e => this.message.addError(e)
      );
    } else {
      this.userService.updateUser(this.user).subscribe(
        msg => this.message.addMsg(msg),
        e => this.message.addError(e)
      );
    }
  }
}
