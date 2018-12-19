import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private email: string = "";
  private password: any = null;

  constructor(public navCtrl: NavController, public toast: ToastController, public fire: AngularFireAuth, private fp: FirebaseProvider) {

  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(resp => {
        const recordSindicate = {
          uid: resp.user.uid,
          type: 'SYNDICATE'
        }
        this.fp.setSyndicate(recordSindicate).then(() => {
          this.toast.create({ message: 'Parabéns. Seu usuário foi criado com sucesso!', duration: 4000 }).present();
        });
      }).catch(err => {
        if (err.code == 'auth/email-already-in-use') {
          this.toast.create({ message: 'Email ja está em uso!', duration: 3000 }).present();
        } else if (err.code == 'auth/invalid-email') {
          this.toast.create({ message: 'Email não é valido!', duration: 3000 }).present();
        } else if (err.code == 'auth/operation-not-allowed') {
          this.toast.create({ message: 'Não esta habilitado para criar usuários!', duration: 3000 }).present();
        } else if (err.code == 'auth/weak-password') {
          this.toast.create({ message: 'Senha digitada muito fraca!', duration: 3000 }).present();
        }
      });
  }
}