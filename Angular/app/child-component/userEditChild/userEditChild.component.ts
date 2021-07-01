import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { MessageService } from 'src/app/message.service';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
    selector: 'child-user-edit',
    templateUrl: './userEditChild.component.html',
    styleUrls: ['./userEditChild.component.css']
})

export class UserEditChildComponent implements OnInit {
    @Input() user: User;
    @Output() userChange = new EventEmitter<User>(true);//Async phải true thì mới đúng thứ tự

    constructor(
        private userService: UserService,
        private messageService: MessageService
        ){}

    ngOnInit(){
    }

    Cancel(){
        this.user.editFlag = false;
    }

    SaveButtonOnclick(_userId, _fullNane, _kanaName, _birthDay){
        let user: User ={
            userId: _userId,
            fullNane: _fullNane,
            kanaName: _kanaName,
            birthDay: _birthDay,
        };
        this.user.editFlag = false;
        of<any>(this.userService.updateUser(user).subscribe(
            msg => this.messageService.addMsg(msg),
            e => this.messageService.addError(e)
        )).subscribe(() => this.userChange.emit(user));//Không thể dùng http để subcribe trực tiếp được
    }
}