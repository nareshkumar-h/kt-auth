import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule, MaterialModule } from '@nareshkumarh/kt-theme';
import { AuthModule as KtAuthModule } from 'projects/auth/src/public-api';
import { environment } from 'src/environments/environment';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThemeModule,
    MaterialModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'nareshkumarh.auth0.com',
      clientId: 'VWQyYuSibVNtlpdjWe4J5dZWNTWccjHE',
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
    }),
    KtAuthModule.forRoot({
      API_ENDPOINT: environment.API_URL,
      USER_TYPE: 'U',
      ORG_ID: environment.ORG_ID,
      REDIRECT_URI: environment.REDIRECT_URI,
      ALLOW_SIGNUP: false,
      ENVIRONMENT: environment.ENV,
      APPLICATION: 'KnowledgeTracker',
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
