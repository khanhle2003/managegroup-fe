import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '../router/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),provideClientHydration(), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(), provideAnimationsAsync(), importProvidersFrom(HttpClientModule)]
};
