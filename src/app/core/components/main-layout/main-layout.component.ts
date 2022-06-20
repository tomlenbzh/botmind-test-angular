import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';

import { IUser } from '@auth/utils/interfaces';
import { ACCEPTED_LANGUAGES, LANG, SELECTED_LANGUAGE } from '@shared/constants/constants';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnChanges {
  @Input() profile!: IUser | null;

  @Output() loggedOut: EventEmitter<any> = new EventEmitter<any>();
  @Output() langChanged: EventEmitter<IUser> = new EventEmitter<IUser>();
  @ViewChild('drawer') drawer!: MatDrawer;

  mode: MatDrawerMode = 'side';
  hasBackdrop: boolean = false;
  opened: boolean = true;
  acceptedLangs = ACCEPTED_LANGUAGES;

  constructor(private translate: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('profile') && this.profile) {
      this.setCurrentLang();
    }
  }

  /**
   * Closes / Opens a MatDrawer child instance.
   */
  toggleDrawer(): void {
    this.drawer.toggle();
  }

  /**
   * Emits to the parent component that the user should logout.
   */
  logout(): void {
    this.loggedOut.emit();
  }

  /**
   * Emits the new profile configuration to the parent component when language is changed.
   *
   * @param     { LANG }      lang
   */
  changeLang(lang: LANG): void {
    const profile = { ...this.profile, lang };
    this.langChanged.emit(profile);
  }

  /**
   * Sets app's current languages and stores it in localstorage.
   */
  setCurrentLang(): void {
    if (this.profile?.lang && this.profile.lang !== this.translate.currentLang) {
      this.translate.setDefaultLang(this.profile.lang);
      this.translate.use(this.profile.lang);
      localStorage.removeItem(SELECTED_LANGUAGE);
      localStorage.setItem(SELECTED_LANGUAGE, this.profile.lang);
    }
  }
}
