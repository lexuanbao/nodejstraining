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

  EditButtonOnclick(user: User){
    user.showFlag = true;
    // //field
    // document.getElementById(`userId${user.userId}`).innerHTML = `<input value=${user.userId}>` ;
    // document.getElementById(`fullName${user.userId}`).innerHTML = `<input value=${user.fullNane}>`;
    // document.getElementById(`kanaName${user.userId}`).innerHTML = `<input value=${user.kanaName}>`;
    // document.getElementById(`birthDay${user.userId}`).innerHTML = `<input value=${user.birthDay}>`;
    // //button
    // document.getElementById(`btnEdit${user.userId}`).hidden = true;
    // document.getElementById(`btnSave${user.userId}`).hidden = false;
    // document.getElementById(`btnCance${user.userId}`).hidden = false;
  }

  getUser() {
    this.userService.getUser().subscribe(users => this.users = users);
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

  AddButtonOnclick(){
    this.router.navigateByUrl(`users/detail`);
  }

  setUserEdit(_user){
     this.userEdited = _user;
  }
}
