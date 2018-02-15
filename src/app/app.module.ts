
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// ----------------------------------------------------
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { UploadPage } from '../pages/upload/upload';
import { StorageProvider } from '../providers/storage/storage';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { ConfigProvider } from '../providers/config/config';
import { HttpModule, JsonpModule } from '@angular/http';
import { ThumbnailPipe } from '../pipes/thumbnail/thumbnail';
import { MediaInfoPage } from '../pages/media-info/media-info';

// 自定义的pipe既需要写在declaration中,也需要声明在provider中
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    MediaInfoPage,
    UploadPage,
    ThumbnailPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    UploadPage,
    MediaInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    HttpServiceProvider,
    ConfigProvider,
    ThumbnailPipe
  ]
})
export class AppModule {}
