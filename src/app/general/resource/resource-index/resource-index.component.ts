import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-resource-index',
  templateUrl: './resource-index.component.html',
  styleUrls: ['./resource-index.component.scss']
})
export class ResourceIndexComponent implements OnInit {

  public toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });
  columnDefs: any;

  resourceIndex: any;
  resourcesHeader: any[];
  selectedTableHeaderList: any = {};
  canShowData = {};

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'field',
    textField: 'header',
    selectAllText: 'Selectionner tout',
    unSelectAllText: 'Deselectionner tout',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  public filterQuery = '';
  constructor(
    public router: Router,
    toasterService: ToasterService = null,
  ) {
    if (toasterService) {
      this.toasterService = toasterService;
    }
  }

  ngOnInit(): void {
  }


  // Selevt dropdown
  onItemSelect(item: any, ) {
    // console.log(item);
    this.initCanShowData();

  }
  onItemDeSelect(item: any, ) {
    // console.log(item);
    this.initCanShowData();

  }
  onSelectAll(items: any) {
    // console.log(items);
    const limit = 30;
    this.canShowData = {};
    let countLimit = 0;
    const newSelectedTableHeaderList = [];
    this.columnDefs.forEach(m => {
      if (countLimit < limit) {
        this.canShowData[m.field] = true;
        newSelectedTableHeaderList.push(m);
      }
      countLimit++;
    });
    this.selectedTableHeaderList = newSelectedTableHeaderList;
    // this.initCanShowData();

  }
  onDropDownClose() {
    this.initCanShowData();
  }
  onDeSelectAll(items: any) {
    // console.log(items);
    const limit = 30;
    this.canShowData = {};
    let countLimit = 0;
    const newSelectedTableHeaderList = [];
    this.columnDefs.forEach(m => {
      if (countLimit < limit) {
        this.canShowData[m.field] = false;
        newSelectedTableHeaderList.push(m);
      }
      countLimit++;
    });
    this.selectedTableHeaderList = newSelectedTableHeaderList;
    // this.initCanShowData();
  }
  initCanShowData(limit = 30) {
    this.canShowData = {};
    let countLimit = 0;
    const newSelectedTableHeaderList = [];
    this.selectedTableHeaderList.forEach(m => {
      if (countLimit < limit) {
        this.canShowData[m.field] = true;
        newSelectedTableHeaderList.push(m);
      }
      countLimit++;
    });
    this.selectedTableHeaderList = newSelectedTableHeaderList;
    // console.log('canShowData', this.canShowData);
  }
  initSelectedTableHeaderList() {

  }

}
