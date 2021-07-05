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

    result: boolean;
    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private router: Router,
        ) { }

    ngOnInit(): void {}

    LoginButtonOnclick(userName: string, password: string){
        this.userService.authenticateUser(userName, password).subscribe(result => {
            this.result = result;
            if(result){
                this.router.navigateByUrl('/users')
            }
        });
    }
}