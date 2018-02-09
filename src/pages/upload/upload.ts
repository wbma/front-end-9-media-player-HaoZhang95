import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  file: File;
  media = {
    title: '',
    description: '',
  };
  public uploadStatus: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServiceProvider) {
  }

  setFile(evt) {
    this.file = evt.target.files[0];
    console.log(evt.target.files[0]);
  }

  doUpload() {
    console.log(this.media);
    // create FormData-object
    const formData = new FormData();
    // add title and description to FormData object
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);

    // add file to FormData object
    formData.append('file', this.file);

    // send FormData object to API
    this.httpService.uploadMedia(formData).subscribe(response => {
      console.log(response);
      this.uploadStatus = response.message;
    }, (err => {
      this.navCtrl.push(LoginPage);
    }));

  }

}
