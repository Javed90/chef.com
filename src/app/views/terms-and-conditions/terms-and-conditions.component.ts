import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommoncontactService } from 'src/app/_services/commoncontact.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  modalRef!: BsModalRef;
  termsAndConditionForm!: FormGroup;
  showImages: any;
  submitted: boolean = false;
  termsAndConditionsId:any;
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
     defaultFontName: '',
     defaultFontSize: '',
      // fonts: [
      //   {class: 'arial', name: 'Arial'},
      //   {class: 'times-new-roman', name: 'Times New Roman'},
      //   {class: 'calibri', name: 'Calibri'},
      //   {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      // ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
   // uploadUrl: 'v1/image',
    //upload: (file: File) => { ... }
   // uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
isLoaderImage:boolean = false;
  constructor(private formBuilder: FormBuilder,
     private commoncontactService: CommoncontactService,
     private toastr: ToastrService,
     private modalService: BsModalService,
     private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.termsAndConditionForm = this.formBuilder.group({
      termsAndConditionsContent: ['', [Validators.required]]

    });
    this.getTermsConditionData();

  }
  get f() { return this.termsAndConditionForm['controls']; }
  openModal(template: TemplateRef<any>) {
    this.formValidations(template);
  }
  /** close popup  */
  /** from validations */
  formValidations(template:any){
    this.submitted = true;
    // stop here if form is invalid
    if (this.termsAndConditionForm.invalid) {
        return;
    }
    this.modalRef = this.modalService.show(template);
  }
  submit(){
    this.modalRef.hide();
    this.isLoaderImage = true;
    if(this.termsAndConditionsId){
      this.commoncontactService.UpdateTermsConditions(this.termsAndConditionForm.value.termsAndConditionsContent,this.termsAndConditionsId).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
           this.toastr.success(res.message);
        }else{
          this.toastr.success(res.message);
        }
      })
      
    }else{
      this.commoncontactService.addTermsConditions(this.termsAndConditionForm.value.termsAndConditionsContent).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
           this.toastr.success(res.message);
        }else{
          this.toastr.success(res.message);
        }
      })

    }
    

  }
  getTermsConditionData(){
   this.commoncontactService.getTermsConditions().subscribe(res=>{
     this.termsAndConditionsId = res.data.termsAndConditionsId;
     this.termsAndConditionForm.patchValue({termsAndConditionsContent: res.data.termsAndConditionsContent} );
     this.spinner.hide();
   })
  }

}
