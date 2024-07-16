import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// declare var googleTranslateElementInit: any;

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private translateService : TranslateService) {
    this.translateService.setDefaultLang('en')
    this.translateService.use(localStorage.getItem('lang')|| 'en')
  }
  ngOnInit(): void {
    // googleTranslateElementInit();
    this.loadGoogleTranslate();
  }

  title = 'ToyamaMotors';

  loadGoogleTranslate() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
  }

  googleTranslateElementInit() {
    new google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        autoDisplay: false
      },
      'google_translate_element'
    );
  }
}

// Ensure the callback function is in the global scope
(window as any).googleTranslateElementInit = () => {
  if (typeof google !== 'undefined' && typeof google.translate !== 'undefined') {
    new google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        autoDisplay: false
      },
      'google_translate_element'
    );
  }
};
  

