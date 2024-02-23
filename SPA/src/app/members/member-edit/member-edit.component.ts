import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IMember } from 'src/app/_models/imember';
import { IUser } from 'src/app/_models/iuser';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit{
  member: IMember | undefined;
  user: IUser | null = null;

  constructor(private accoundService: AccountService,
    private memberService: MembersService){
      this.accoundService.currentUser$.pipe(take(1)).subscribe({
        next: user => this.user = user
      })
    }

  ngOnInit(): void {
    
  }

}
