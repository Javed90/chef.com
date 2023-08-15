"use strict";(self.webpackChunkchef=self.webpackChunkchef||[]).push([[208],{8208:(x,m,s)=>{s.r(m),s.d(m,{TermsAndConditionsModule:()=>_});var l=s(6019),c=s(8994),i=s(7537),t=s(3668),f=s(8429),h=s(2387),g=s(9256),p=s(9861),u=s(4902);function A(o,d){1&o&&(t.TgZ(0,"div",11),t._uU(1," Terms and conditions is required "),t.qZA())}function T(o,d){1&o&&t._UZ(0,"img",12)}function Z(o,d){if(1&o){const n=t.EpF();t.TgZ(0,"div",13),t.TgZ(1,"div",14),t.TgZ(2,"button",15),t.NdJ("click",function(){return t.CHM(n),t.oxw().modalRef.hide()}),t.TgZ(3,"span",16),t._uU(4,"\xd7"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(5,"div",17),t.TgZ(6,"h2"),t._uU(7,"Are You Sure?"),t.qZA(),t.TgZ(8,"p"),t._uU(9,"Do you really want to update this data?"),t.qZA(),t.qZA(),t.TgZ(10,"div",18),t.TgZ(11,"button",19),t.NdJ("click",function(){return t.CHM(n),t.oxw().submit()}),t._uU(12,"Ok"),t.qZA(),t.TgZ(13,"button",20),t.NdJ("click",function(){return t.CHM(n),t.oxw().modalRef.hide()}),t._uU(14,"Cancel"),t.qZA(),t.qZA(),t.qZA()}}const v=[{path:"",component:(()=>{class o{constructor(n,e,r,C,a){this.formBuilder=n,this.commoncontactService=e,this.toastr=r,this.modalService=C,this.spinner=a,this.submitted=!1,this.editorConfig={editable:!0,spellcheck:!0,height:"auto",minHeight:"0",maxHeight:"auto",width:"auto",minWidth:"0",translate:"yes",enableToolbar:!0,showToolbar:!0,placeholder:"Enter text here...",defaultParagraphSeparator:"",defaultFontName:"",defaultFontSize:"",customClasses:[{name:"quote",class:"quote"},{name:"redText",class:"redText"},{name:"titleText",class:"titleText",tag:"h1"}],sanitize:!0,toolbarPosition:"top",toolbarHiddenButtons:[["bold","italic"],["fontSize"]]},this.isLoaderImage=!1}ngOnInit(){this.spinner.show(),this.termsAndConditionForm=this.formBuilder.group({termsAndConditionsContent:["",[i.kI.required]]}),this.getTermsConditionData()}get f(){return this.termsAndConditionForm.controls}openModal(n){this.formValidations(n)}formValidations(n){this.submitted=!0,!this.termsAndConditionForm.invalid&&(this.modalRef=this.modalService.show(n))}submit(){this.modalRef.hide(),this.isLoaderImage=!0,this.termsAndConditionsId?this.commoncontactService.UpdateTermsConditions(this.termsAndConditionForm.value.termsAndConditionsContent,this.termsAndConditionsId).subscribe(n=>{n.success?(this.isLoaderImage=!1,this.toastr.success(n.message)):this.toastr.success(n.message)}):this.commoncontactService.addTermsConditions(this.termsAndConditionForm.value.termsAndConditionsContent).subscribe(n=>{n.success?(this.isLoaderImage=!1,this.toastr.success(n.message)):this.toastr.success(n.message)})}getTermsConditionData(){this.commoncontactService.getTermsConditions().subscribe(n=>{this.termsAndConditionsId=n.data.termsAndConditionsId,this.termsAndConditionForm.patchValue({termsAndConditionsContent:n.data.termsAndConditionsContent}),this.spinner.hide()})}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(i.qu),t.Y36(f.w),t.Y36(h._W),t.Y36(g.tT),t.Y36(p.t2))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-terms-and-conditions"]],decls:15,vars:5,consts:[[1,"app-main__inner"],[1,"add-new-cus"],[1,"user-header","customers-header"],[1,"address-info-form"],[3,"formGroup"],["formControlName","termsAndConditionsContent",3,"config"],["class","invalid-formdata",4,"ngIf"],[1,"info-per-btn"],["type","submit",1,"save-btn",3,"disabled","click"],["src","assets/images/formload.gif","class","form-button-loader",4,"ngIf"],["template",""],[1,"invalid-formdata"],["src","assets/images/formload.gif",1,"form-button-loader"],[1,"customer-delete-model"],[1,"modal-header"],["type","button","aria-label","Close",1,"close","pull-right",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-secondary","save-btn",3,"click"],["type","button",1,"btn","cancel-btn",3,"click"]],template:function(n,e){if(1&n){const r=t.EpF();t.TgZ(0,"div",0),t._UZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"h3"),t._uU(4,"Terms and Conditions "),t.qZA(),t.qZA(),t.TgZ(5,"section",3),t.TgZ(6,"form",4),t._UZ(7,"angular-editor",5),t.YNc(8,A,2,0,"div",6),t.TgZ(9,"div",7),t.TgZ(10,"button",8),t.NdJ("click",function(){t.CHM(r);const a=t.MAs(14);return e.openModal(a)}),t._uU(11,"Update"),t.qZA(),t.YNc(12,T,1,0,"img",9),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.YNc(13,Z,15,0,"ng-template",null,10,t.W1O)}2&n&&(t.xp6(6),t.Q6J("formGroup",e.termsAndConditionForm),t.xp6(1),t.Q6J("config",e.editorConfig),t.xp6(1),t.Q6J("ngIf",e.submitted&&e.f.termsAndConditionsContent.errors),t.xp6(2),t.Q6J("disabled",e.isLoaderImage),t.xp6(2),t.Q6J("ngIf",e.isLoaderImage))},directives:[i._Y,i.JL,i.sg,u.s6,i.JJ,i.u,l.O5],styles:[""]}),o})()}];let b=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[c.Bz.forChild(v)],c.Bz]}),o})(),_=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[l.ez,b,i.UX,i.u5,u.UM]]}),o})()}}]);