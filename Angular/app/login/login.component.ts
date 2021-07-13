import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "../message.service";
import { UserService } from "../user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    userName: string;
    password: string;

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private router: Router,
        ) { }

    ngOnInit(): void {}

    LoginButtonOnclick(){
        this.userService.authenticateUser(this.userName, this.password).subscribe(
            result => {
                if(result){
                    this.userService.userPermission = true;
                    this.router.navigateByUrl('/users');
                } 
            },
            e => {
                this.messageService.addErrorResponse(e);
            }
        );
    }
}