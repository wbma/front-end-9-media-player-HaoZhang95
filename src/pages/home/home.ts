import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ConfigProvider } from '../../providers/config/config';
import { ThumbnailPipe } from '../../pipes/thumbnail/thumbnail';
import { MediaInfoPage } from '../media-info/media-info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public list = [];
  public MediaInfoPage = MediaInfoPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public config: ConfigProvider,
    public httpService: HttpServiceProvider, public thumbnailPipe: ThumbnailPipe) {
  }

  ionViewWillEnter() {
    this.getMediaData();
  }

  getMediaData() {
    let api = '/media';
    this.httpService.doGet(api).subscribe((data) => {
      this.list = data;
      console.log(this.list);
    }, (err) => {
      alert(err);
    });
  }
}
