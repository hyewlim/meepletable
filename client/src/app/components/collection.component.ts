import { Component } from '@angular/core';
import {Boardgame} from "../shared/models";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {

  boardgames!: Boardgame[];
}
