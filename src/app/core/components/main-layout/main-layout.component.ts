import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  @Input() mode: MatDrawerMode = 'side';
  @Input() hasBackdrop: boolean = false;
  @Input() opened: boolean = true;

  @Output() loggedOut: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('drawer') drawer!: MatDrawer;

  toggleDrawer(): void {
    this.drawer.toggle();
  }

  logout(): void {
    this.loggedOut.emit();
  }
}
