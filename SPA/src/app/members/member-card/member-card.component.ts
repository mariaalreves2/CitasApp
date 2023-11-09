import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {IMember} from 'src/app/_models/imember'

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit{
  @Input() member: IMember | undefined;

  constructor(){}

  ngOnInit(): void {
    
  }
}
