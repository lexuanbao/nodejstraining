import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "../message.service";
import { UserService } from "../user.service";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {

    constructor(
        private router: Router,
        private userService: UserService,
        private messageService: MessageService
        ) { }

    ngOnInit(): void {}

    LogoutButtonOnclick(){
        this.router.navigateByUrl('/login');
        this.userService.logoutUser().subscribe(res => {
            this.messageService.addMsg(res.msg + '');
        },
        e => {
            this.messageService.addError(e.error.error + '')
        });
    }
}