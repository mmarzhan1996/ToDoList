import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items/items.service';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'ToDoList';

  constructor(private dataStorageService: DataStorageService, private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.dataStorageService.fetchItems().subscribe();
  }

}
