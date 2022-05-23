import { Component, Input, OnInit } from '@angular/core';

import { Item } from '../../item.model';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class ItemComponent implements OnInit {



  @Input() item: Item;
  index: number;
  statusClass: string;
  convertDate: string;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    switch(this.item.status){
      case 'Finished':
        this.statusClass = 'toDo-item--green';
        break;
      case 'Fired':
        this.statusClass = 'toDo-item--red';
        break;
      case 'In progress':
        this.statusClass = '';
        break;
    }

    this.index = this.item.id;

    this.convertDate = this.splitString(this.item.date, '-');
  }

  splitString(stringToSplit: string, separator: string) {
    var arrayOfStrings = stringToSplit.split(separator);

    return arrayOfStrings.reverse().join('/');
  }

  onDelete(){
    this.itemsService.deleteItem(this.index);
  }

  onDone(){
    this.statusClass = 'toDo-item--green';
    this.itemsService.doneItem(this.index);
  }

}
