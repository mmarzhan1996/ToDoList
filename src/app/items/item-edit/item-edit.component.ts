import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLinkActive } from '@angular/router';
import * as moment from 'moment';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.less']
})
export class ItemEditComponent implements OnInit {

  id: number;
  editMode = false;
  itemForm: FormGroup;

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.itemsService.updateItem(this.id, this.itemForm.value);
    } else {
      this.itemsService.addItem(this.itemForm.value);
    }
    this.dataStorageService.storeItems();
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['./items']);
  }

  private initForm() {
    let itemTitle = '';
    let itemText = '';
    let itemDate = '';
    let itemDateConverted;

    if (this.editMode) {
      const item = this.itemsService.getItem(this.id);
      if(item){
        itemTitle = item.title;
        itemText = item.desc;
        itemDate = item.date;
        itemDateConverted = moment(item.date, 'YYYY-MM-DD');
      }

    }

    this.itemForm = new FormGroup({
      title: new FormControl(itemTitle, Validators.required),
      text: new FormControl(itemText, Validators.required),
      date: new FormControl(new Date(itemDate + 'T10:00:00'), Validators.required)
    });
  }


}
