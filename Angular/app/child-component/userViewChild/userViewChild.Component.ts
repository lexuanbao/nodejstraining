import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/user";
import { UserService } from "src/app/user.service";

@Component({
    selector: 'child-user-view',
    templateUrl: './userViewChild.component.html',
    styleUrls:['./userViewChild.component.css']
})

export class userViewChildComponent implements OnInit{


    @Input() user: User;

    message: string
    users: User[];
    constructor(private userService: UserService){}

    ngOnInit(){
        this.getUsers();
    }

    getUsers(){
        this.userService.getUsers().subscribe(users => this.users = users);
    }

    EditButtonOnclick(user: User){
        user.editFlag = true;
    }

    DeleteButtonOnclick(id: number){
        // this.users.forEach((item, index) => {
        //   if(item.userId ==  id){
        //     this.users.splice(index, 1); //remove khỏi mảng vị trí index đến index + 1 ( trùng id vẫn đúng)
        //   }
        // })
        this.users = this.users.filter(user => user.userId != id);//Sai trong trường hợp trùng id
        this.userService.deleteUser(id).subscribe(msg => this.message = msg + ' record(s) deleted');
      }
}