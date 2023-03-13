import { Component } from '@angular/core';
import {Boardgame} from "../shared/models";
import {BglookupService} from "../shared/bglookup.service";
import {ConfirmationService} from "primeng/api";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CollectionComponent {

  boardgamesSelected: Boardgame[] = [];
  boardgames: Boardgame[] = [];
  boardgame!: Boardgame;
  // Delete: any;
  // selectedProducts: any | boolean;
  // products: any;
  bgDialog!: boolean;
  submitted!: boolean;
  Delete: any;

  constructor(private bglookup: BglookupService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
  ) {
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

    this.submitted = false;
    this.bgDialog = true;

  }

  deleteSelectedProducts() {

  }

  editProduct(boardgame: Boardgame) {
    this.boardgame = {...boardgame};
    this.bgDialog = true;

  }

  deleteProduct(product: any) {

  }

  hideDialog() {

  }

  saveProduct() {

  }
}
