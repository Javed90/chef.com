import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommoncontactService } from 'src/app/_services/commoncontact.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'; 

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  modalRef!: BsModalRef;
  notificationForm!: FormGroup;
  submitted: boolean = false;
  isLoaderImage: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private notificationService: CommoncontactService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.notificationForm = this.formBuilder.group({
      title: ['', [Validators.required, this.noWhitespaceValidator]],
      description: ['', [Validators.required, this.noWhitespaceValidator]],

    });
    this.notificationForm.valueChanges.subscribe(val => {
      localStorage.setItem("isFormChanged", JSON.stringify(true));
    });

  }

  get f() { return this.notificationForm['controls']; }

  /** confirmation Popup  */
openModal(template: TemplateRef<any>) {
  this.formValidations(template);
}
/** close popup  */
/** from validations */
formValidations(template:any){
  this.submitted = true;
  // stop here if form is invalid
  if (this.notificationForm.invalid) {
      return;
  }
  this.modalRef = this.modalService.show(template);
}
   /** update and edit collection */
   submit(){
    this.modalRef.hide();
    this.isLoaderImage = true;
      this.notificationService.addNotification(this.notificationForm.value).subscribe(res=>{
        if(res.success){
          this.isLoaderImage = false;
          console.log(res);
           this.toastr.success(res.message);
           this.router.navigate(["/notifications"]);
        }else{
          this.toastr.success(res.message);
        }
      })
    
    

  }
    /** First Empty sapce not allowed */
noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}

}
