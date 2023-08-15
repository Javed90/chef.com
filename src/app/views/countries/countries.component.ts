import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { CommoncontactService } from 'src/app/_services/commoncontact.service';
import countries from 'src/assets/json/countries.json';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countryForm!: FormGroup;
  countryList: any ;
  submitted: boolean = false;
  countries: any = [];
  countryDeleteId: any;
  countriesSearch:any;
  p: number = 1;
  total: any;
  countryPopupShow: boolean = true;
  isLoaderImage: boolean = false
  constructor(
    private spinner: NgxSpinnerService,
     private toastr: ToastrService,
     private countryService: CommoncontactService,
     private router: Router,
     private formBuilder: FormBuilder,
     private serchString: SearchStringPipe,
     private zone: NgZone,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.countryList =  countries;
    this.countriesList();
    this.countryForm = this.formBuilder.group({
      countryName: ['', [Validators.required]],
      countryCode: ['', [Validators.required,this.noWhitespaceValidator]],
      currencyName: ['', [Validators.required,this.noWhitespaceValidator]],

    });
  }

  get f() { return this.countryForm['controls']; }

  submit(event:any){
    this.submitted = true;
    // stop here if form is invalid
    if (this.countryForm.invalid) {
        return;
    }
    this.isLoaderImage = true;
      this.countryService.addCountry(this.countryForm.value).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
          console.log(res);
          this.countriesList();
           this.toastr.success(res.message);
           this.countryPopupShow = false;
           this.countryForm.reset();
           this.router.navigate(["/countries"]);
        }else{
          this.toastr.success(res.message);
        }
      })

  }

  countriesList(){
    this.countryService.getAllCountries().subscribe(res=>{
      this.countries = res.items;
      this.countriesSearch = res.items;
      this.total = this.countriesSearch.length;
      this.spinner.hide();
    })
  }

  /** get Delete ID */

  deletecountry(ID:any){
   this.countryDeleteId = ID;
  }
  deleteData(){
    this.countryService.deleteCountry(this.countryDeleteId).subscribe(res=>{
      if(res.success){
        this.zone.run(()=>{
          this.countriesList();
        })
         this.toastr.success(res.message);
         this.router.navigate(["/countries"]);
      }else{
        this.toastr.success(res.message);
      }
    })
    
    
  }

  /** Search By Country Name */
  countrySearch(event:any){
    const stringVal = event.target.value.replace(/^\s+|\s+$/gm,'');
    this.countriesSearch = this.serchString.transform('countryName',this.countries,stringVal);
    this.p = 1;
    this.total = this.countriesSearch.length;
  }

  /** First Empty sapce not allowed */
noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}
/** show popup */
openPopuop(){
  this.countryPopupShow = true;
  
}
}
