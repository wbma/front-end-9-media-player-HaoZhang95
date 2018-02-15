import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ConfigProvider } from '../../providers/config/config';
import { EXIF } from 'exif-js';
/**
 * Generated class for the MediaInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-media-info',
  templateUrl: 'media-info.html',
})
export class MediaInfoPage {

  public userinfo;
  public authorInfo = [];
  public mediaItem = [];
  public likesBy = [];
  public userId;
  public fileId;
  public isLiked;
  public lat;
  public lon;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider,
    public httpService: HttpServiceProvider, public config: ConfigProvider, ) {

    this.userinfo = this.storage.getItem('userinfo');
    this.fileId = this.navParams.get('fileId');
    this.userId = this.navParams.get('userId');

    if (this.userinfo) {
      this.getMediaById();
      this.getUserInfoByUserId(this.userId);

      this.validateIsLiked();
      this.getLikesData();
    } else {
      console.log("You have to login to get further info about this image.");
    }

  }

  getMediaById() {
    let api = '/media/' + this.fileId;
    this.httpService.doGet(api).subscribe((data) => {
      console.log(data);
      this.mediaItem = data;
    }, (err) => {
      alert(err);
    });
  }

  getUserInfoByUserId(userId) {
    const api = '/users/' + userId;
    this.httpService.doGetWithToken(api).subscribe((data) => {
      console.log(data);
      this.authorInfo = data;
    }, (err) => {
      console.log(err);
    });
  }

  getLikesData() {
    const api = '/favourites/file/' + this.fileId;
    this.httpService.doGet(api).subscribe((data) => {
      this.likesBy = [];
      for (let item of data) {
        let api = '/users/' + item.user_id;
        this.httpService.doGetWithToken(api).subscribe((data) => {
          this.likesBy.push(data);
        }, (err) => {
          console.log(err);
        });
      }
      console.log(this.likesBy);

    }, (err) => {
      console.log(err);
    });
  }

  addToFavourite() {
    const api = '/favourites';
    this.httpService.doPostWithToken(api, { 'file_id': this.fileId }).subscribe((data) => {
      console.log(data);
      this.isLiked = true;
      this.getLikesData();
    }, (err) => {
      console.log(err);
      this.isLiked = false;
    });
  }

  cancelFavourite() {
    const api = '/favourites/file/' + this.fileId;
    this.httpService.doDeleteWithToken(api).subscribe((data) => {
      console.log(data);
      this.isLiked = false;
      this.getLikesData();
    }, (err) => {
      console.log(err);
    });
  }

  validateIsLiked() {
    const api = '/favourites';
    this.httpService.doGetWithToken(api).subscribe((data) => {
      console.log(data);
      let list = data;
      for (let item of list) {
        if (item.file_id == this.fileId) {
          this.isLiked = true;
          return;
        }
      }
      this.isLiked = false;
    }, (err) => {
      console.log(err);
    });
  }

  // getExif(evt) {
  //   try {
  //     EXIF.getData(evt.target, () => {
  //       // console.log(EXIF.getAllTags(evt.target));
  //       if (EXIF.getTag(evt.target, 'GPSLatitude')) {
  //         this.lat = this.degreesToDecimals(
  //           EXIF.getTag(evt.target, 'GPSLatitude'));
  //         this.lon = this.degreesToDecimals(
  //           EXIF.getTag(evt.target, 'GPSLongitude'));
  //       } else {
  //         this.message = 'No GPS data';
  //       }
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

}
