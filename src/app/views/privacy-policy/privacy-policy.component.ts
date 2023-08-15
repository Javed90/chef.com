import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommoncontactService } from 'src/app/_services/commoncontact.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  modalRef!: BsModalRef;
  privacyPolicyForm!: FormGroup;
  submitted: boolean = false;
  privacyPolicyId:any;
  /** Editor Config using by editor */
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
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
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
    uploadUrl: 'v1/image',
    //upload: (file: File) => { ... }
    uploadWithCredentials: false,
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
    this.privacyPolicyForm = this.formBuilder.group({
      privacyPolicyContent: ['', [Validators.required]]

    });
    this.getPrivacyPolicyData();

  }
  get f() { return this.privacyPolicyForm['controls']; }
  /** confirmation Popup  */
openModal(template: TemplateRef<any>) {
  this.formValidations(template);
}
/** close popup  */
/** from validations */
formValidations(template:any){
  this.submitted = true;
  // stop here if form is invalid
  if (this.privacyPolicyForm.invalid) {
      return;
  }
  this.modalRef = this.modalService.show(template);
}
  submit(){
    this.modalRef.hide();
    this.isLoaderImage = true;
    if(this.privacyPolicyId){
      this.commoncontactService.UpdatePrivacyPolicy(this.privacyPolicyForm.value.privacyPolicyContent,this.privacyPolicyId).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false
          console.log(res,'edit');
           this.toastr.success(res.message);
        }else{
          this.toastr.success(res.message);
        }
      })
    }else{
      this.commoncontactService.addPrivacyPolicy(this.privacyPolicyForm.value.privacyPolicyContent).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
          console.log(res,'add');
           this.toastr.success(res.message);
        }else{
          this.toastr.success(res.message);
        }
      })
    }
    

  }
  getPrivacyPolicyData(){
   this.commoncontactService.getPrivacyPolicy().subscribe(res=>{
     this.privacyPolicyForm.patchValue({privacyPolicyContent: res.data.privacyPolicyContent} );
     this.privacyPolicyId = res.data.privacyPolicyId;
     this.spinner.hide();
   })
  }
}
