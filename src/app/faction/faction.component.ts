import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Faction } from '../faction';
import { StorageService } from 'src/app/_services/storage.service';

const API_URL = 'http://localhost:8080/api/faction/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-faction',
  templateUrl: './faction.component.html',
  styleUrls: ['./faction.component.scss']
})
export class FactionComponent {

  factions:Array<Faction>;
  isLoggedIn = false;
  faction:Faction;

  constructor(private storageService: StorageService, private http: HttpClient) {
    this.factions = new Array<Faction>();
    this.faction = new Faction(0,"","","");
  }

  ngOnInit(): void {

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.http.get(API_URL + 'all').subscribe(data=>{

        let factionData = JSON.parse(JSON.stringify(data));
        for(let i=0 ; i < factionData.length ; i++){
          let faction = new Faction(
            factionData[i]["id"],
            factionData[i]["description"],
            factionData[i]["name"],
            factionData[i]["image"]
          );
          this.factions.push(faction);
          
        }
        console.log(this.factions);
  
      },
      error => {
          console.log(error);
      });
    }
    else{
      window.location.href = "/login";
    }
   
  }

  showDetails(id:number){

    for(let i=0 ; i < this.factions.length ; i++){

      if(this.factions[i].id == id){
        this.faction = this.factions[i];
        break;
      }

    }


  }



}
