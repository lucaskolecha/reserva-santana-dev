import { HttpClient } from '@angular/common/http';
import { firestore } from 'firebase';
import { Injectable } from '@angular/core';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  private db;

  constructor(public http: HttpClient) {
    this.db = firestore();
    this.db.settings({ timestampsInSnapshots: true });
  }

  setSyndicate(record) {
    return new Promise((resp, rej) => {
      this.db.collection('syndicates').add(record).then((data) => {
        console.log('Síndico Registrado! ');
        resp(data);
      });
    });
  }

}
