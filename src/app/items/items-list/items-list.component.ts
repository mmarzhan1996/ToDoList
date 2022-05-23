import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.less']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  itemsDefault: Item[] = [];

  items: Item[] = [];
  subscription: Subscription;
  // subscription1: Subscription;
  filterStatus: string = 'All';
  sortDate: string = 'Basic';

  constructor(private itemsService: ItemsService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.subscription = this.itemsService.itemsChanged
      .subscribe(
        (items: Item[]) => {
          this.itemsDefault = this.itemsService.getItems();
          this.items = this.itemsDefault;
          this.onFilterItems(this.filterStatus);

          this.dataStorageService.storeItems();
        }
      );


    // this.dataStorageService.fetchItems().subscribe(
    //   (items) => {
        // this.itemsService.setItems(items);
        this.itemsDefault = this.itemsService.getItems();
        this.items = this.itemsDefault;
        this.onFilterItems(this.filterStatus);
    //   }
    // );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.subscription1.unsubscribe();
  }

  onFilterItems(name: string){
    this.filterStatus = name;
    if(name == 'All'){
      this.items = this.itemsDefault;
    }else{
      var filteredItems: Item[] = [];
      this.itemsDefault.find(
        (s) => {
          if(s.status === name){
            filteredItems.push(s);
          }
        }
      );
      this.items = filteredItems;
    }
    return this.onSortItems(this.sortDate);
  }

  onSortItems(name: string){
    this.sortDate = name;
    if(name == 'Up'){
      this.items.sort(function (a, b) {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
      });
    }else if(name == 'Down'){
      this.items.sort(function (a, b) {
        if (a.date > b.date) {
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        return 0;
      });
    }else if(name == 'Basic'){
      let sortedItems: Item[] = [];
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].status === 'Fired'){
          sortedItems.push(this.items[i]);
        }
      }
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].status === 'In progress'){
          sortedItems.push(this.items[i]);
        }
      }
      for(let i = 0; i < this.items.length; i++){
        if(this.items[i].status === 'Finished'){
          sortedItems.push(this.items[i]);
        }
      }
      return this.items = sortedItems;
    }

  }

}
