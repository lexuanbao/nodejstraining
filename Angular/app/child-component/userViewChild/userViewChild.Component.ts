import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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

    message: string
    users: User[];
    constructor(private userService: UserService){}

    ngOnInit(){
    }

    EditButtonOnclick(user: User){
        user.editFlag = true;
    }

    DeleteButtonOnclick(id: number){
        this.deletedUserId.emit(id);
        this.userService.deleteUser(id).subscribe(msg => this.message = msg + ' record(s) deleted');
      }
}