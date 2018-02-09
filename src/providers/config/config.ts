import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  public baseUrl = 'http://media.mw.metropolia.fi/wbma';
  public apiUrl = 'http://media.mw.metropolia.fi/wbma/media';
  public fileUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor() { }

}
