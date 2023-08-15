import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { NewsletterService } from 'src/app/_services/newsletter.service';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 

@Component({
  selector: 'app-add-edit-newsletters',
  templateUrl: './add-edit-newsletters.component.html',
  styleUrls: ['./add-edit-newsletters.component.css']
})
export class AddEditNewslettersComponent implements OnInit {
   
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
modalRef!: BsModalRef;
newsletterForm!: FormGroup;
date:any = new Date();
   /** Crop image */
   imageChangedEvent: any = '';
   croppedImage: any = '';
   imgCropped:any;
   newsLettercroppedImage: boolean = false;
   imageType: Array<string> = ['image/jpg', 'image/jpeg', 'image/png']
   image: any;
  isButton: any = false;
  showImages: any;
  imagePath: string = environment.imagePath;
  isLoaderImage:boolean = false;
  imagesLimitOrType: any;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private newsLetterService: NewsletterService,
    public datepipe: DatePipe,
    private zone: NgZone,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    console.log(this.date)
    this.date = this.datepipe.transform(this.date,'yyyy-MM-dd')
    this.newsletterForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      image: [''],
      subTtitle:  ['',[Validators.required]],
      newsletterContent:  ['',[Validators.required]],
      newsletterAddedDate: [this.date],
      

    });

    this.newsletterForm.valueChanges.subscribe(val => {
      localStorage.setItem("isFormChanged", JSON.stringify(true));
    });
  }

  get f() { return this.newsletterForm['controls']; }
   /**  croper image */
   fileChangeEvent(event: any): void {
      
    if (this.imageType.includes(event.target.files[0].type)) {
      if (event.target.files[0].size / 1024 / 1024 < 2) {
        this.imagesLimitOrType = "";
        this.imageChangedEvent = event;
        this.isButton = true;
      }else{
        this.imagesLimitOrType = "Image Size Should Be Less Than 2 Mb";
        this.croppedImage = "";
       }
    }else{
      this.imagesLimitOrType = "Invalid File Type";
      this.croppedImage = "";
    }
  this.newsLettercroppedImage = false;
}
imageCropped(event: ImageCroppedEvent) {
  if(this.imageChangedEvent){
    this.croppedImage = event.base64;
    this.dataURLtoFile(this.croppedImage,this.imageChangedEvent.target.files[0].name,this.imageChangedEvent.target.files[0].type)
  }
    
}
imageLoaded() {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}
dataURLtoFile(dataurl:any, filename:any,mime:any) {
 
  var arr = dataurl.split(','),
     // mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  this.image = new File([u8arr], filename, {type:mime});
  
}
/** confirmation Popup  */
openModal(template: TemplateRef<any>) {
  this.formValidations(template);
}
/** close popup  */
/** from validations */
formValidations(template:any){
  
  this.submitted = true;
  // stop here if form is invalid
  if (this.newsletterForm.invalid) {
      return;
  }
  if(this.showImages){
    if(this.croppedImage){
      this.newsLettercroppedImage = false
    }
    
  }else{
    if(this.croppedImage == ''){
      this.newsLettercroppedImage = true
      return
    }
  }
  this.modalRef = this.modalService.show(template);
}
/** Submit */
submit(){
  this.modalRef.hide();
  const formData: FormData = new FormData();
    if(this.image){
      formData.append('fileName',  this.image.name);
      formData.append('image', this.image);
    }
    formData.append('title',this.newsletterForm.value.title);
    formData.append('subTtitle',this.newsletterForm.value.subTtitle);
    formData.append('newsletterContent',this.newsletterForm.value.newsletterContent);
    formData.append('newsletterAddedDate',this.newsletterForm.value.newsletterAddedDate);
    
    this.isLoaderImage = true;

   this.newsLetterService.addNewsLetter(formData).subscribe(res=>{
    if(res.success){
      this.isLoaderImage = false;
       this.toastr.success(res.message);
       this.zone.run(()=>{
        this.router.navigate(["/newsletters"]);
      })
    }else{
      this.toastr.success(res.message);
    }
   })
  
}
  
}

