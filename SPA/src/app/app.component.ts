import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { IUser } from './_models/iuser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Citas App';
  //users: any;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void{
    //this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser(): void{
    const userString = localStorage.getItem("user");
    if(!userString) return;
    const user: IUser = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

}

