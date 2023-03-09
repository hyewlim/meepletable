import { Component } from '@angular/core';
import {Boardgame} from "../shared/models";
import {BglookupService} from "../shared/bglookup.service";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {

  boardgameSelected!: Boardgame;
  boardgames: Boardgame[] = [];
  Delete: any;
  selectedProducts: any | boolean;
  products: any;

  constructor(private bglookup: BglookupService) {
  }

  addBoardgame(newBg: Boardgame){

    //initialise bg object todo
    this.bglookup.getGameDetails(newBg.id)
      .then((data) => {
        this.boardgames.push(data)
      })
    ;
  }

  openNew() {
    
  }

  deleteSelectedProducts() {
    
  }

  editProduct(product: any) {
    
  }

  deleteProduct(product: any) {
    
  }
}
