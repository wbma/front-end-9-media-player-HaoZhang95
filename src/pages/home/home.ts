import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { ConfigProvider } from '../../providers/config/config';
import { ThumbnailPipe } from '../../pipes/thumbnail/thumbnail';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public list = [];
    constructor(public navCtrl: NavController, public config: ConfigProvider,
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
