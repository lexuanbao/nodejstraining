import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user'
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  EditButtonOnclick(user: User){
    document.getElementById('userId').innerHTML = `<input value=${user.userId}>` ;
    document.getElementById('userFullName').innerHTML = `<input value=${user.fullNane}>`;
    document.getElementById('kanaName').innerHTML = `<input value=${user.kanaName}>`;
    document.getElementById('birthDay').innerHTML = `<input value=${user.birthDay}>`;
    document.getElementById('btnEdit').outerHTML = "<button id='btnSave' (click)='SaveButtonOnclick(user)'>Save</button>"
  }

  SaveButtonOnClick(user: User){
    this.userService.updateUser(user).subscribe();
  }

  getUser() {
    this.userService.getUser().subscribe(users => this.users = users);
  }

}
