import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommoncontactService } from 'src/app/_services/commoncontact.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  modalRef!: BsModalRef;
  contactInfoForm!: FormGroup;
  showImages: any;
  submitted: boolean = false;
  appInfoId:any;
  isLoaderImage: boolean = false
  constructor(private formBuilder: FormBuilder,
    private commoncontactService: CommoncontactService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.contactInfoForm = this.formBuilder.group({
      deliveryAmountNote: ['', [Validators.required]],
      vatPercent: ['', [Validators.required]],
      deliveryCharges: ['', [Validators.required]],
      deliveryLimit: ['', [Validators.required]],
      deliveryNote: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      whatsAppNumber: ['', [Validators.required]],
      instaId: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      vatNote: ['', [Validators.required]],
      annoucement: [''],
      profileId: [''],
      serverKey: [''],
      clientKey: ['']

    });
    this.getContactInfoData();
  }

  get f() { return this.contactInfoForm['controls']; }

  /** confirmation Popup  */
openModal(template: TemplateRef<any>) {
  this.formValidations(template);
}
/** close popup  */
/** from validations */
formValidations(template:any){
  this.submitted = true;
    // stop here if form is invalid
    console.log(this.contactInfoForm.value);
    if (this.contactInfoForm.invalid) {
        return;
    }
    this.modalRef = this.modalService.show(template);
}
  submit(){
    this.modalRef.hide();
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
