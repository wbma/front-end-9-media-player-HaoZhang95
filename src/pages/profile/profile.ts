import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// -----------------------------------------------
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { StorageProvider } from '../../providers/storage/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public LoginPage = LoginPage;
  public RegisterPage = RegisterPage;
  public userinfo = null;

  public likesNum = 0;
  public uploadsNum = 0;
  public ratingNum = 0;
  public ratingList = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, public httpService: HttpServiceProvider) {
  }

  ionViewWillEnter() {
    let userinfo = this.storage.getItem('userinfo');
    this.userinfo = ((userinfo && userinfo.user.username) ? userinfo : null);
  }
}
