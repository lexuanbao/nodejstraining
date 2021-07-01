import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MessageService } from "src/app/message.service";
import { User } from "src/app/user";
import { UserService } from "src/app/user.service";

@Component({
    selector: 'child-user-view',
    templateUrl: './userViewChild.component.html',
    styleUrls:['./userViewChild.component.css']
})

export class userViewChildComponent implements OnInit{

    @Input() user: User;
    @Output() deletedUserId = new EventEmitter<number>();

    users: User[];
    constructor(
        private userService: UserService,
        private messageService: MessageService
        ){}

    ngOnInit(){
    }

    EditButtonOnclick(user: User){
        user.editFlag = true;
    }

    DeleteButtonOnclick(id: number){
        this.deletedUserId.emit(id);
        this.userService.deleteUser(id).subscribe(
            msg => this.messageService.addMsg(msg),
            error => this.messageService.addError(error)
        );
    }
}