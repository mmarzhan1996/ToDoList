
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';

import { Item } from './item.model';

@Injectable()
export class ItemsService{

    itemsChanged = new Subject<Item[]>();

    // private items: Item[];
    private items: Item[] = [
        // new Item(
        //   0,
        //   'Second card',
        //   'Some description of the card 2',
        //   '2022-05-22',
        //   'In progress'
        // ),
        // new Item(
        //   1,
        //   'First card',
        //   'Some description of the card',
        //   '2022-05-20',
        //   'Finished'
        // ),
        // new Item(
        //   2,
        //   'Third card',
        //   'Some description of the card',
        //   '2022-05-19',
        //   'Fired'
        // )
    ];

    sortedItems: Item[];

    constructor(){}

    setItems(items: Item[]){
      this.items = items;
      this.itemsChanged.next(this.items.slice());
    }

    getItems(){
      return this.items.slice();
    }

    getItem(id: number){
      const item = this.items.find(
        (f) => {
          return f.id == id;
        }
      );
      return item;
    }

    deleteItem(id: number) {
      var itemId: number;
      const item = this.items.find(
        (f) => {
          return f.id == id;
        }
      );
      if(item){
        itemId = this.items.indexOf(item);
        this.items.splice(itemId, 1);
      }
      this.itemsChanged.next(this.items.slice());

    }

    doneItem(id: number){
      var itemId: number;
      const item = this.items.find(
        (f) => {
          return f.id == id;
        }
      );
      if(item){
        itemId = this.items.indexOf(item);
        this.items[itemId].status = 'Finished';
      }

      this.itemsChanged.next(this.items.slice());
    }

    addItem(values: any){
      var date = moment(values.date).format("YYYY-MM-DD");
      var status = new Date() > values.date ? 'Fired' : 'In progress';
      this.items.push(
        new Item(
          this.items.length + Math.random(),
          values.title,
          values.text,
          date,
          status
        )
      );
      this.itemsChanged.next(this.items.slice());
    }

    updateItem(index: number, newItem: any) {
      var date = moment(newItem.date).format("YYYY-MM-DD");
      var status = new Date() > new Date(newItem.date) ? 'Fired' : 'In progress';

      var itemId: number;
      const item = this.items.find(
        (f) => {
          return f.id == index;
        }
      );
      if(item){
        itemId = this.items.indexOf(item);
        // this.items[itemId] = new Item(
        //   index,
        //   newItem.title,
        //   newItem.text,
        //   date,
        //   status
        // );
        // console.log(this.items[itemId]);
        this.items.splice(itemId, 1);
        this.items.push(
          new Item(
            index,
            newItem.title,
            newItem.text,
            date,
            status
          )
        );

        this.itemsChanged.next(this.items.slice());
      }



    }

}
