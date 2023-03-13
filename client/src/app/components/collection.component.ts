import {Component, OnInit} from '@angular/core';
import {Boardgame} from "../shared/models";
import {BglookupService} from "../shared/bglookup.service";
import {ConfirmationService} from "primeng/api";
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {RepositoryService} from "../shared/repository.service";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CollectionComponent implements OnInit {

  boardgamesSelected: Boardgame[] = [];
  boardgames: Boardgame[] = [];
  boardgame!: Boardgame;

  bgDialog!: boolean;
  submitted!: boolean;
  Delete: any;

  constructor(private bglookup: BglookupService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private repositoryService: RepositoryService) {
  }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
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
    this.bgDialog = false;
    this.submitted = false;

  }

  saveProduct() {
    this.submitted = true;
    console.log(this.boardgame)
    this.boardgames = [...this.boardgames];
    this.bgDialog = false;
    this.boardgame = {} as Boardgame
  }

  saveCollection() {
    this.repositoryService.saveBoardgames(this.boardgames)
  }
}
