import { Uye } from '../../models/uye';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sonuc } from 'src/app/models/sonuc';
import { FbServisService } from 'src/app/services/fbServis.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  sonuc:Sonuc =new Sonuc();
  secUye:Uye =new Uye();

  constructor(
    public  fbservis: FbServisService,
    public router:Router 
  ) { }

   

  ngOnInit() {

  }
  KayitYap(){
    this.fbservis.UyeOl(this.secUye).then(d=>{
      d.user.updateProfile({
        displayName: this.secUye.adsoyad
      }).then() ;
      this.secUye.uid = d.user.uid;
      localStorage.setItem("user", JSON.stringify(d.user));
      this.UyeEkle();
    },err=>{
      this.sonuc.islem=false;
      this.sonuc.mesaj="E-posta Adresi veya Parola Geçersizdir!";
    });
  }
  UyeEkle(){
    this.fbservis.UyeEkle(this.secUye).then(d=>{
      this.router.navigate(['/']);
    });
  }
}
  


