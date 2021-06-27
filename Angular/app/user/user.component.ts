import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user'
import { Router } from '@angular/router'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userEdited: User;
  users: User[] = [];
  message: any;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  AddButtonOnclick(){
    this.router.navigateByUrl(`users/detail`);
  }

  setUserEdit(_user){
    this.userEdited = _user;
    this.getUser();
  }

  getUser() {
    this.userService.getUsers().subscribe(users => this.users = users)
  }

  deleteUserFromArray(id: number){
  // this.users.forEach((item, index) => {
      //   if(item.userId ==  id){
      //     this.users.splice(index, 1); //remove khỏi mảng vị trí index đến index + 1 ( trùng id vẫn đúng)
      //   }
      // })
    this.users = this.users.filter(user => user.userId != id); //Sai trong trường hợp trùng id
  }
}
