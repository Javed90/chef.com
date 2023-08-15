import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonCategoriesService } from 'src/app/_services/common-categories.service';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoriesList: any;
  p: number = 1;
  total: any;
  categoryListWithSearch:any;
  imagePath: string = environment.imagePath;
  dateS:any;
  @ViewChild('name') inputName:any;
  constructor(
    private categoryService: CommonCategoriesService,
    private zone: NgZone,
    private router: Router, 
    private spinner: NgxSpinnerService,
    private serchString: SearchStringPipe,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.allCategoriesList();
  }
  allCategoriesList(){
    this.spinner.show();
    this.categoryService.getAllcategories().subscribe(res=>{
      this.categoriesList = res.items;
      this.categoryListWithSearch = res.items.filter(function(e:any) {
        return e.categoryId != null;
      });
      this.total = this.categoryListWithSearch.length;
      this.spinner.hide();
    })
  }
  reset(item:any){
    if(item == 'reset'){
      this.inputName.nativeElement.value = '';
      this.allCategoriesList();
    }
  }
  getObjectSendUrl(item: any){
    let that = this;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        categoryImage: JSON.stringify(item.categoryImage),
        categoryId: JSON.stringify(item.categoryId)

      }
    };
    that.zone.run(()=>{
     that.router.navigate(['/categories/edit'], navigationExtras);
    })
  }

   /** Search By collection Type */

   categoryTypeSearch(event:any){
    const stringVal = event.target.value.replace(/^\s+|\s+$/gm,'')
    this.categoryListWithSearch = this.serchString.transform('categoryId',this.categoriesList,stringVal);
    this.p = 1;
    this.total = this.categoryListWithSearch.length;
    
  }

  /** Search By Date */
  searchDate(event:any){
   // const searchVal = event.target.value.replace(/^\s+|\s+$/gm,'')
   const searchVal =  this.datepipe.transform(event, 'yyyy-MM-dd');
   console.log(searchVal)
    this.categoryListWithSearch = this.serchString.transform('categoryCreateDate',this.categoriesList,searchVal);
    this.p = 1;
    this.total = this.categoryListWithSearch.length;
  }
  /** Send Category Data */
  sendObject(item:any){
    this.categoryService.sendCategoryData(item);
  }
}
