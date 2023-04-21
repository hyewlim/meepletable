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

  constructor(private bglookupService: BglookupService,) {}

  search(event: any) {
    this.bglookupService.getSearchResults(event.query)
      .then(data => {

      this.results = data;
    });
  }

  selectResult(boardgame: any) {
    this.newBgEvent.emit(boardgame);

  }

  onClear() {
    this.text = '';
  }
}
