import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Kayit } from '../models/kayit';
import {AngularFireAuth} from'@angular/fire/auth';
import { Ders } from '../models/ders';
import { Register } from '../models/register';
import { Uye } from '../models/uye';

@Injectable({
  providedIn: 'root'
})
export class FbServisService {
  private dbDers = '/Dersler';

  dersRef: AngularFireList<Ders> = null;

  private dbKayit = '/Kayitlar';

  kayitRef: AngularFireList<Kayit> = null;
  
  private dbRegister = '/Register';
  

  registerRef: AngularFireList<Register> = null;
  

  private dbUye = '/Uyeler';
  uyeRef: AngularFireList<Uye> = null;
  
  
  constructor(
  
  public db: AngularFireDatabase,
  public afAuth: AngularFireAuth
  
  )
  
  {
  
  this.kayitRef = db.list(this.dbKayit);
  this.dersRef = db.list(this.dbDers);
  this.registerRef = db.list(this.dbRegister);
  this.uyeRef = db.list(this.dbUye);

  }

  RegisterListele(){
    return this.registerRef;
  }
  RegisterEkle(register: Register){
    return this.registerRef.push(register);
  }
  RegisterDuzenle(register: Register){
    return this.registerRef.update(register.key,register)
  }

  RegisterSil(key:string){
    return this.registerRef.remove(key);
  }






  /*Oturum aç başla */
  
  OturumAc(mail:string, parola:string){
return this.afAuth.signInWithEmailAndPassword(mail,parola)

}
  OturumKapat(){
    return this.afAuth.signOut()
  }
  OturumKontrol(){
    if (localStorage.getItem("user")){
      return true;
    } else{
      return false;
    }
  }

  UyeOl(uye:Uye){
return this.afAuth.createUserWithEmailAndPassword(uye.mail,uye.parola);
  }

  UyeEkle(uye:Uye){
return this.uyeRef.push(uye);
  }




/*Oturum aç bitir */


  /*kayıtlar firebase servis başlangıç */
KayitListele(){
  return this.kayitRef;

}
KayitEkle(kayit:Kayit){
return this.kayitRef.push(kayit);
}
KayitDuzenle(kayit:Kayit){
  return this.kayitRef.update(kayit.key, kayit);
  }
  KayitSil(key: string) {
    return this.kayitRef.remove(key);
    }
    
  /*kayıtlar firebase servis bitiş */



  
  DersListele(){
    return this.dersRef;
      }
      DersEkle(d:Ders){
        return this.dersRef.push(d)
      }
      DersDuzenle(d:Ders){
        return this.dersRef.update(d.key, d)
        
      }
      DersSil(key: string){
        return this.dersRef.remove(key);
        
      }
      
};
