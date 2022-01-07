import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth} from '@angular/fire/auth'
import { Uye } from './models/uye';
import { FbServisService } from './services/fbServis.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sorucevapfirebase';

  private dbUye = '/Uyeler';


  uyeRef: AngularFireList<Uye> = null;
  constructor(
    public fbServis:FbServisService,
    public router:Router,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public servis: FbServisService
  ) { }

  ngOnInit(): void {
  }
  OturumKontrol(){
    if(localStorage.getItem("user")){
      return true;
    }
    else{
      return false;
    }
    }

    OturumKapat(){
      this.fbServis.OturumKapat().then(()=>{
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
      });
    }

}

