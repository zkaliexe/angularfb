import { Router } from '@angular/router';
import { Sonuc } from './../../models/sonuc';

import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { Ders } from 'src/app/models/ders';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
dersler
secDers:Ders =new Ders();
sonuc:Sonuc =new Sonuc();
ekleduzenle: boolean=false;
detay: boolean=false;
silme: boolean=false;
adsoyad:string;
uid:string;
  constructor( 
    
    public fbServis : FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
    this.DersListele();
    var user= JSON.parse(localStorage.getItem("user"));
    this.uid=user.uid;
    this.adsoyad=user.displayName;
  }
DersListele(){
  this.fbServis.DersListele().snapshotChanges().pipe(
    map(changes =>
    changes.map(c =>
    ({ key: c.payload.key, ...c.payload.val() })    
    )
    )   
    ).subscribe(data => {
    this.dersler = data;
    });
}
Kaydet(){
  var tarih=new Date ();
  if(this.secDers.key == null){
this.secDers.kayTarih = tarih.getTime().toString(); 
this.secDers.duzTarih = tarih.getTime().toString(); 
this.secDers.islem=false;
this.fbServis.DersEkle(this.secDers).then(d=>{
  this.sonuc.islem=true;
this.sonuc.mesaj="Kayıt Eklendi"
});
  } else{
    this.secDers.duzTarih = tarih.getTime().toString(); 
this.secDers.islem=false;
this.fbServis.DersDuzenle(this.secDers).then(d=>{
  this.sonuc.islem=true;
this.sonuc.mesaj="Kayıt Güncellendi"
});

  }
}
DersSec(d:Ders){
Object.assign(this.secDers, d);
}
Sil(){
 
this.fbServis.DersSil(this.secDers.key).then(d=>{
  this.sonuc.islem=true;
this.sonuc.mesaj="Kayıt Silindi"
this.silme = false;
});
}
TamamlaIptal(d:Ders,islem:boolean){
  d.islem=islem;
  this.fbServis.DersDuzenle(d).then(d=>{
    this.sonuc.islem=true;
  this.sonuc.mesaj="Kayıt Güncellendi"
  });
}

}
