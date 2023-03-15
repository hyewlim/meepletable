import {Component, EventEmitter, Output} from '@angular/core';
import {BglookupService} from "../../shared/bglookup.service";
import {Boardgame} from "../../shared/models";
import {Subscription} from "rxjs";
import {RepositoryService} from "../../shared/repository.service";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {

  text!: string;

  results!: Boardgame[];

  @Output()
  newBgEvent = new EventEmitter<Boardgame>;

  bgSelectionSub$!: Subscription;

  constructor(private bglookupService: BglookupService,
              private repositoryService: RepositoryService) {
  }

  search(event: any) {
    console.log(event.query)
    this.bglookupService.getSearchResults(event.query)
      .then(data => {

      this.results = data;
      console.log(this.results)
    });
  }

  selectResult(boardgame: any) {
    console.log(boardgame)
    this.newBgEvent.emit(boardgame);

  }

  onClear() {
    this.text = '';
  }
}
