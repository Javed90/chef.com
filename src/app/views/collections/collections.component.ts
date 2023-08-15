import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CollectionService } from 'src/app/_services/collection.service';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  collectionList:any;
  collectionId:any;
  p: number = 1;
  total: any;
  collectionListWithSearch: any;
  productsList: any;
  imagePath: string = environment.imagePath;
  productListWithSearch: any;
  changeDateValue: any;
  dateSearch: any;
  @ViewChild('name') inputName:any; 
  constructor(
     private collectionService: CollectionService,
     private spinner: NgxSpinnerService,
     private toastr: ToastrService,
     private zone: NgZone,
     private serchString: SearchStringPipe,
     private productService: ProductService,
     public datepipe: DatePipe
     ) { }

  ngOnInit(): void {
    this.allCollectionList();
  }
  reset(item:any): any{
    if(item == 'reset'){
      this.inputName.nativeElement.value = '';
      this.allCollectionList();
    }
    this.dateSearch = '';
  }
  allCollectionList(){
    this.spinner.show();
    this.collectionService.getAllCollection(1,10000).subscribe(res=>{
      this.collectionList = res.items;
      this.collectionListWithSearch = res.items;
      this.total = res.items.length;
      this.spinner.hide();
    })
  }
  openDeletePopup(ID:any){
    this.collectionId = "";
    this.collectionId = ID;
    console.log(this.collectionId);
  }
  collectionDelete(){
    const that = this;
    this.collectionService.deleteCollection(this.collectionId).subscribe(res=>{
      if(res.success){
        that.zone.run(()=>{this.allCollectionList()})
        this.toastr.success(res.message);
      }else{
        this.toastr.success(res.message);
      }
    })
  }

  /** Search By collection Type */

  collectionTypeSearch(event:any){
    const stringVal = event.target.value.replace(/^\s+|\s+$/gm,'')
    this.collectionListWithSearch = this.serchString.transform('collectionName',this.collectionList,stringVal);
    this.p = 1;
    this.total = this.collectionListWithSearch.length;
    
  }

  /** Search By Date */
  searchDate(event:any){
   // const searchValue =event.target.value.replace(/^\s+|\s+$/gm,'')
   const searchValue =  this.datepipe.transform(event, 'yyyy-MM-dd');
   console.log(searchValue)
    this.collectionListWithSearch = this.serchString.transform('collectionDate',this.collectionList,searchValue);
    this.p = 1;
    this.total = this.collectionListWithSearch.length;
  }
  
 
    

}
