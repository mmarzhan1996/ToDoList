import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Item } from "../items/item.model";
import { ItemsService } from "../items/items.service";

@Injectable()
export class DataStorageService{
    constructor(private http: HttpClient, private itemsService: ItemsService){}

    storeItems(){
        const items = this.itemsService.getItems();
        this.http.put('https://todolist-16e67-default-rtdb.firebaseio.com/items.json', items).subscribe(
            response => {
                console.log(response);
            }
        );
    }

    fetchItems(){
        return this.http.get<Item[]>('https://todolist-16e67-default-rtdb.firebaseio.com/items.json').pipe(
            map(items => {
                return items.map(item => {
                    return {...item}
                });
            }),
            tap(items => {
                return this.itemsService.setItems(items);
            })
        );
    }

}
