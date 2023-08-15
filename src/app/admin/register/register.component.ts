import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm!: FormGroup;
  submitted: any;
  isConform: any = true;
  isConformCheck: any = false;
  isButton:any = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // countryCodeId: ['', Validators.required],
      // phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

    });
  }
  get f() { return this.registerForm['controls']; }
  onSubmit() {
    this.submitted = true;
    if(this.registerForm.value.conformPassword){
      this.isConformCheck = false;
    }else{
      this.isConformCheck = true;
    }
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    
    this.userService.signUpForm(this.registerForm.value).subscribe(res=>{
      if(res.success){
        this.userService.sendToken(res.data.token);
      }
    })
  }


  /* check conformpassword */
  conformPassword(event:any){
    if(event.target.value == this.registerForm.value.password){
       this.isConform = true;
       this.isConformCheck = true;
    }else{
      this.isConform = false;
      this.isConformCheck = false;
    }

  }

}
