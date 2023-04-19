import {Component, OnDestroy, OnInit} from '@angular/core';
import {Boardgame} from "../../shared/models";
import {BglookupService} from "../../shared/bglookup.service";
import {ConfirmationService} from "primeng/api";
import {MessageService} from "primeng/api";
import {RepositoryService} from "../../shared/repository.service";
import {Subscription} from "rxjs";
import {UserService} from "../user/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CollectionComponent implements OnInit, OnDestroy {

  boardgamesSelected!: Boardgame[];
  boardgames: Boardgame[] = [];
  boardgame!: Boardgame;
  boardgamesSub$!: Subscription;

  bgDialog!: boolean;
  submitted!: boolean;

  constructor(private bglookup: BglookupService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private repositoryService: RepositoryService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.userService.user) {
      this.repositoryService.loadBoardgames(this.userService.user.userId)
        .then(data => {
          this.boardgames = data
          this.boardgames.sort((a,b) => (a.name>b.name) ? 1:-1);
        })
    }
    this.boardgamesSub$ = this.repositoryService.boardgames.subscribe( value => {
      this.boardgames = value;
    })
  }

  addBoardgame(newBg: Boardgame){
    this.bglookup.getGameDetails(newBg.id)
      .then((data) => {
        this.boardgames.push(data)
        this.repositoryService.boardgames.next(this.boardgames);
        this.messageService.add({severity: "success", summary: "Successful", detail: "Game Added", life:3000})
      })
    ;
  }

  openNew() {
    this.submitted = false;
    this.bgDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected boardgames?",
      header: "confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.boardgames = this.boardgames.filter(val => !this.boardgamesSelected.includes(val));
        this.boardgamesSelected = [];
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Games Deleted', life:3000})
      }
    })
  }

  editProduct(boardgame: Boardgame) {
    this.boardgame = {...boardgame};
    this.bgDialog = true;
  }

  deleteProduct(boardgame: Boardgame) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + boardgame.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.boardgames = this.boardgames.filter(val => val.id !== boardgame.id);
        this.boardgame = {} as Boardgame;
        this.messageService.add({severity: "success", summary: "Successful", detail: "Game Deleted", life:3000})
        this.repositoryService.deleteBoardgame(this.userService.user.userId, boardgame.id)
          .then(r => {
            if (r===0)
              console.log("remove failed")
          })
      }
    });
  }

  hideDialog() {
    this.bgDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    const index = this.boardgames.findIndex(
      (game) => game.id === this.boardgame.id)

    this.boardgames[index].comment = this.boardgame.comment
    this.bgDialog = false;
    this.boardgame = {} as Boardgame
  }

  saveCollection() {

    this.repositoryService.saveBoardgames(this.boardgames, this.userService.user.userId)
      .then( response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You have successfully saved your collection'})
      })
  }

  ngOnDestroy(): void {
    this.boardgamesSub$.unsubscribe();
  }

}
