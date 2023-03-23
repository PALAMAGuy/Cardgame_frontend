import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../card';
import { StorageService } from 'src/app/_services/storage.service';

const API_URL = 'http://localhost:8080/api/card/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {

  cards:Array<Card>;
  isLoggedIn = false;
  card:Card;
  showCard = false;

  constructor(private storageService: StorageService, private http: HttpClient) {
    this.cards = new Array<Card>();
    this.card = new Card(0,"","","",0);
  }

  ngOnInit(): void {

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.http.get(API_URL + 'all').subscribe(data=>{

        let cardData = JSON.parse(JSON.stringify(data));
        for(let i=0 ; i < cardData.length ; i++){
          let faction = new Card(
            cardData[i]["id"],
            cardData[i]["name"],
            cardData[i]["description"],
            cardData[i]["image"],
            cardData[i]["power"]
          );
          this.cards.push(faction);
          
        }
        console.log(this.cards);
  
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

    for(let i=0 ; i < this.cards.length ; i++){

      if(this.cards[i].id == id){
        this.card = this.cards[i];
        this.showCard = true;
        break;
      }

    }

  }

}
