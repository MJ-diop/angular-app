import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class I18nServiceService {
  private currentLangSubject: BehaviorSubject<string>;
  public currentLang: Observable<string>;

  constructor(private translate: TranslateService, private cookieService: CookieService) {
    if (cookieService.check('currentLang')) {
      this.currentLangSubject = new BehaviorSubject<string>(this.cookieService.get('currentLang'));
    } else {
      this.currentLangSubject = new BehaviorSubject<null>(null);
    }
    if (this.currentLangSubject.value === null) {
      this.translate.use('en');
    } else {
      this.translate.use(this.currentLangSubject.value);
    }
  }

  changeLocale(locale: string) {
    this.cookieService.set('currentLang', locale);
    this.currentLangSubject.next(locale);
    this.translate.use(locale);
  }

  public get currentLangValue(): String {
    return this.currentLangSubject.value;
  }
}
