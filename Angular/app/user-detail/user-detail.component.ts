import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User | undefined;
  message: any; 
  constructor(
    private location: Location,
    private userService: UserService,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.getUserById();
  }

  goBack(){
    this.location.back();
  }

  getUserById(){
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.userService.getUserById(id).subscribe(user => this.user = user);
  }

  SaveButtonOnclick(_userId: string, _fullNane: string, _kanaName: string, _birthDay: string ){
    this.user = {
      userId: parseInt(_userId),
      fullNane: _fullNane,
      kanaName: _kanaName,
      birthDay: _birthDay
    }
    this.userService.insertUser(this.user).subscribe(msg => this.message = msg + ' record(s) inserted');
  }
}
