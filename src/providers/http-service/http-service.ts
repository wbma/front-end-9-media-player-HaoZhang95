import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigProvider } from './../config/config';
import { StorageProvider } from '../../providers/storage/storage';
import "rxjs/Rx";


/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(public http: Http, public config: ConfigProvider, public storage: StorageProvider) {

  }

  // Upload a media file
  uploadMedia = (formData: any) => {
    const token = this.storage.getItem('userinfo').token;
    if (token) {
      const headers = new Headers({ 'x-access-token': token })
      const options = new RequestOptions({ headers: headers })

      return this.http.post(this.config.baseUrl + '/media', formData, options)
        .map(
        resp => resp.json()
        )
    }
  }

  doGet(api) {
    const URL = this.config.baseUrl + api;
    return this.http.get(URL).map((resp) => resp.json());
  }

  doGetWithToken(api) {
    const apiUrl = this.config.baseUrl + api;
    const headers = new Headers({ 'x-access-token': this.storage.getItem('userinfo').token })
    const options = new RequestOptions({ headers: headers })
    return this.http.get(apiUrl, options).map(
      (res) => res.json()
    );
  }

  doPost(api, json) {
    const apiUrl = this.config.baseUrl + api;
    return this.http.post(apiUrl, JSON.stringify(json), { headers: this.headers }).map((resp) => resp.json());
  }

  doPostWithToken(api, json) {
    const apiUrl = this.config.baseUrl + api;
    const headers = new Headers({ 'x-access-token': this.storage.getItem('userinfo').token })
    const options = new RequestOptions({ headers: headers })
    return this.http.post(apiUrl, json, options).map((resp) => resp.json());
  }

  doDeleteWithToken(api) {
    const apiUrl = this.config.baseUrl + api;
    const headers = new Headers({ 'x-access-token': this.storage.getItem('userinfo').token })
    const options = new RequestOptions({ headers: headers })
    return this.http.delete(apiUrl, options)
      .map((res) => res.json()
      )
  }

}
