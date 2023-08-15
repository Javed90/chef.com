import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { CommoncontactService } from 'src/app/_services/commoncontact.service';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cityForm!: FormGroup;
  cityList: any ;
  submitted: boolean = false;
  cityDeleteId: any;
  countries: any;
  citySearch:any;
  p: number = 1;
  total: any;
  citydata: any;
  title: any = 'Add City';
  buttonTitle = 'Save';
  cityId: any;

  /** Popup Boolean */
  cityPopupShow:boolean = true;
  constructor(private cityService: CommoncontactService,
    private toastr: ToastrService,
     private router: Router,
     private formBuilder: FormBuilder,
     private serchString: SearchStringPipe,
     private zone: NgZone,
     private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.countriesList();
    this.citiesList();
    this.cityForm = this.formBuilder.group({
      cityName: ['', [Validators.required,this.noWhitespaceValidator]],
      countryId: ['', [Validators.required]],
      cityCode: ['', [Validators.required,this.noWhitespaceValidator]],

    });
  }
  get f() { return this.cityForm['controls']; }

  submit(event:any){
    this.submitted = true;
    // stop here if form is invalid
    if (this.cityForm.invalid) {
        return;
    }
    this.cityForm.value.countryId = parseInt(this.cityForm.value.countryId);
    if(this.cityId){
      this.cityForm.value.cityId = this.cityId;
      this.cityService.updateCity(this.cityForm.value).subscribe(res=>{
        if(res.success){
          console.log(res);
          this.citiesList();
           this.toastr.success(res.message);
           this.cityPopupShow = false;
           this.router.navigate(["/cities"]);
           
        }else{
          this.toastr.success(res.message);
        }
      })
    }else{
      
      this.cityService.addCity(this.cityForm.value).subscribe(res=>{
        if(res.success){
          console.log(res);
          this.citiesList();
           this.toastr.success(res.message);
           this.router.navigate(["/cities"]);
        }else{
          this.toastr.success(res.message);
        }
      })
      this.cityPopupShow = false;
    }
    

  }
  /** get Countries List */
  countriesList(){
    this.cityService.getAllCountries().subscribe(res=>{
      this.countries = res.items;
      console.log(this.countries)
    })
  }

  /** Get cities List */

  citiesList(){
    this.cityService.getAllCities().subscribe(res=>{
      this.cityList = res.items;
      this.citySearch = res.items;
      this.total = this.citySearch.length;
      this.spinner.hide();
    })
  }

   /** get Delete ID */

   deleteCity(ID:any){
    this.cityDeleteId = ID;
   }
   deleteData(){
     this.cityService.deleteCity(this.cityDeleteId).subscribe(res=>{
       if(res.success){
         this.zone.run(()=>{
           this.citiesList();
         })
          this.toastr.success(res.message);
          this.router.navigate(["/cities"]);
       }else{
         this.toastr.success(res.message);
       }
     })
     
     
   }
   /** citiesSearch */
   citiesSearch(event:any){
    const stringVal = event.target.value.replace(/^\s+|\s+$/gm,'');
    this.citySearch = this.serchString.transform('cityName',this.cityList,stringVal);
    this.p = 1;
    this.total = this.citySearch.length;
    
   }
   getSingleCityRecord(data:any){
     this.cityPopupShow = true;
    this.cityForm.patchValue(data);
    this.title = "Edit City";
    this.buttonTitle = "Update";
    this.cityId = data.cityId;
    console.log(this.cityId);
    
   }
   addNewCity(){
     this.cityPopupShow = true;
     this.title= "Add City";
     if(this.cityId){
      this.cityForm.reset();
      this.cityId = "";
     }
     
   }

/** First Empty sapce not allowed */
noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}
/** show popup */
openPopuop(){
  this.cityPopupShow = true;
  
}
}