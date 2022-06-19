import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ACCEPTED_LANGUAGES, SELECTED_LANGUAGE } from './shared/constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'botmind-test-angular';

  constructor(private translate: TranslateService) {
    this.setAppLanguage();
  }

  private setAppLanguage(): void {
    const currentLang = localStorage.getItem(SELECTED_LANGUAGE);

    if (currentLang) {
      this.translate.setDefaultLang(currentLang);
      this.translate.use(currentLang);
    } else {
      const browserLang = navigator.language;
      if ((ACCEPTED_LANGUAGES as string[]).includes(browserLang)) {
        this.translate.setDefaultLang(browserLang);
        this.translate.use(browserLang);
      } else {
        this.translate.setDefaultLang('fr');
        this.translate.use('fr');
      }
    }
  }
}
