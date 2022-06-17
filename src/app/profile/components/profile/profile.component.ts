import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/authentication/utils/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() profile!: IUser | null;

  constructor() {}

  ngOnInit(): void {}
}
