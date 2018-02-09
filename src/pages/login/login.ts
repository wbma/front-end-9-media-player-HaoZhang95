import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { StorageProvider } from '../../providers/storage/storage';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public userinfo = {
        username: '',
        password: ''
    }
    public comeFrom = '';

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public httpService: HttpServiceProvider, public storage: StorageProvider) {
        this.comeFrom = this.navParams.get('comeFrom');
    }

    launchSignup() {
        this.navCtrl.push(RegisterPage);
    }

    doLogin() {
        if (this.userinfo.username.length < 6) {
            alert('账户格式不对.');
        } else {
            let api = '/login';
            this.httpService.doPost(api, this.userinfo).subscribe((data) => {
                this.storage.setItem('userinfo', data);
                this.navCtrl.popToRoot();
            }, (err) => {
                alert(err);
            })
        }
    }

}

