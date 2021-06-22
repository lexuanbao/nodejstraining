import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
    selector: 'child-user-edit',
    templateUrl: './userEditChild.component.html',
    styleUrls: ['./userEditChild.component.css']
})

export class UserEditChildComponent implements OnInit {
    @Input() user: User;
    @Output() userChange = new EventEmitter<User>();

    constructor(private userService: UserService){}

    ngOnInit(){
    }

    Cancel(){
        this.user.showFlag = false;
    }

    SaveButtonOnclick(_userId, _fullNane, _kanaName, _birthDay){
        let user: User ={
            userId: _userId,
            fullNane: _fullNane,
            kanaName: _kanaName,
            birthDay: _birthDay,
        };
        this.user.showFlag = false;
        this.userChange.emit(user);
        this.userService.updateUser(user).subscribe();
    }
}