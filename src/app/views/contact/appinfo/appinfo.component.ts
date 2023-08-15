import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommoncontactService } from 'src/app/_services/commoncontact.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-appinfo',
  templateUrl: './appinfo.component.html',
  styleUrls: ['./appinfo.component.css']
})
export class AppinfoComponent implements OnInit {

  contactInfoForm!: FormGroup;
  showImages: any;
  submitted: boolean = false;
  appInfoId:any;
  isLoaderImage: boolean = false
  constructor(private formBuilder: FormBuilder,
    private commoncontactService: CommoncontactService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // this.spinner.show();
    this.contactInfoForm = this.formBuilder.group({
      deliveryAmountNote: [''],
      termsAndConditionUrl: [''],
      vatPercent: [''],
      deliveryCharges: [''],
      deliveryLimit: [''],
      deliveryNote: [''],
      phone: [''],
      whatsAppNumber: [''],
      instaId: [''],
      email: [''],
      address: [''],
      vatNote: [''],
      annoucement: [''],
      profileId: ['', [Validators.required,this.noWhitespaceValidator]],
      serverKey: ['', [Validators.required,this.noWhitespaceValidator]],
      clientKey: ['', [Validators.required,this.noWhitespaceValidator]]

    });
    this.getContactInfoData();
  }

  get f() { return this.contactInfoForm['controls']; }
  submit(event:any){
    this.submitted = true;
    // stop here if form is invalid
    if (this.contactInfoForm.invalid) {
        return;
    }
    this.isLoaderImage = true;
    if(this.appInfoId){
      this.contactInfoForm.value.appInfoId = this.appInfoId;
      this.commoncontactService.UpdateContactInfo(this.contactInfoForm.value).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
           this.toastr.success(res.message);
        }else{
          this.toastr.success(res.message);
        }
      })
      
    }else{
      this.commoncontactService.addContactInfo(this.contactInfoForm.value).subscribe(res=>{
        if(res.success){
           this.isLoaderImage = false;
           this.toastr.success(res.message);
        }else{
          this.toastr.success(res.message);
        }
      })

    }
    

  }
  getContactInfoData(){
    this.spinner.show();
   this.commoncontactService.getContactInfo().subscribe(res=>{
     this.appInfoId = res.data.appInfoId;
     this.contactInfoForm.patchValue(res.data);
     this.spinner.hide();
   })
  }
  /** First Empty sapce not allowed */
noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}

}
