"use strict";(self.webpackChunkchef=self.webpackChunkchef||[]).push([[931],{931:(fe,y,d)=>{d.r(y),d.d(y,{CollectionsModule:()=>ge});var h=d(6019),g=d(8994),Z=d(8260),e=d(3668),I=d(5339),U=d(9861),D=d(2387),v=d(7875),P=d(5738),A=d(1690),r=d(7537),b=d(8265);const x=["name"],R=function(i){return["/collections/detail",i]},L=function(i){return["/collections/edit",i]};function J(i,n){if(1&i){const o=e.EpF();e.TgZ(0,"tr"),e.TgZ(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._UZ(8,"img",31),e.qZA(),e.TgZ(9,"td"),e.TgZ(10,"a",32),e._UZ(11,"i",33),e.qZA(),e.TgZ(12,"a",34),e._UZ(13,"i",35),e.qZA(),e.TgZ(14,"a",36),e.NdJ("click",function(){const s=e.CHM(o).$implicit;return e.oxw().openDeletePopup(s.collectionId)}),e._UZ(15,"i",37),e.qZA(),e.qZA(),e.qZA()}if(2&i){const o=n.$implicit,t=n.index,l=e.oxw();e.xp6(2),e.Oqu(t+1),e.xp6(2),e.Oqu(o.searchDate),e.xp6(2),e.Oqu(o.collectionName),e.xp6(2),e.hYB("src","",l.imagePath,"/",o.collectionImage,"",e.LSH),e.xp6(2),e.Q6J("routerLink",e.VKq(7,R,o.collectionId)),e.xp6(2),e.Q6J("routerLink",e.VKq(9,L,o.collectionId))}}function O(i,n){1&i&&(e.TgZ(0,"tr"),e._UZ(1,"td"),e._UZ(2,"td"),e.TgZ(3,"p",38),e._uU(4,"Record Not Found"),e.qZA(),e.qZA())}function E(i,n){1&i&&(e.TgZ(0,"div"),e.TgZ(1,"p",38),e._uU(2,"Record Not Found"),e.qZA(),e.qZA())}function Q(i,n){if(1&i){const o=e.EpF();e.TgZ(0,"pagination-controls",39),e.NdJ("pageChange",function(l){return e.CHM(o),e.oxw().p=l}),e.qZA()}}const M=function(){return["add"]},Y=function(){return{isAnimated:!0}},k=function(i,n){return{itemsPerPage:10,currentPage:i,totalItems:n}};let W=(()=>{class i{constructor(o,t,l,s,c,a,u){this.collectionService=o,this.spinner=t,this.toastr=l,this.zone=s,this.serchString=c,this.productService=a,this.datepipe=u,this.p=1,this.imagePath=Z.N.imagePath}ngOnInit(){this.allCollectionList()}reset(o){"reset"==o&&(this.inputName.nativeElement.value="",this.allCollectionList()),this.dateSearch=""}allCollectionList(){this.spinner.show(),this.collectionService.getAllCollection(1,1e4).subscribe(o=>{this.collectionList=o.items,this.collectionListWithSearch=o.items,this.total=o.items.length,this.spinner.hide()})}openDeletePopup(o){this.collectionId="",this.collectionId=o,console.log(this.collectionId)}collectionDelete(){const o=this;this.collectionService.deleteCollection(this.collectionId).subscribe(t=>{t.success?(o.zone.run(()=>{this.allCollectionList()}),this.toastr.success(t.message)):this.toastr.success(t.message)})}collectionTypeSearch(o){const t=o.target.value.replace(/^\s+|\s+$/gm,"");this.collectionListWithSearch=this.serchString.transform("collectionName",this.collectionList,t),this.p=1,this.total=this.collectionListWithSearch.length}searchDate(o){const t=this.datepipe.transform(o,"yyyy-MM-dd");console.log(t),this.collectionListWithSearch=this.serchString.transform("collectionDate",this.collectionList,t),this.p=1,this.total=this.collectionListWithSearch.length}}return i.\u0275fac=function(o){return new(o||i)(e.Y36(I.a),e.Y36(U.t2),e.Y36(D._W),e.Y36(e.R0b),e.Y36(v.K),e.Y36(P.M),e.Y36(h.uU))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-collections"]],viewQuery:function(o,t){if(1&o&&e.Gf(x,5),2&o){let l;e.iGM(l=e.CRH())&&(t.inputName=l.first)}},decls:61,vars:15,consts:[[1,"app-main__inner"],[1,"add-new-cus"],[3,"routerLink"],[1,"user-header","customers-header"],[1,"row"],[1,"col-md-6"],[1,"col-md-3"],[1,"search-reset"],[3,"click"],["type","text","placeholder","Date","bsDatepicker","","name","dateSearch","readonly","",1,"form-control",3,"bsConfig","ngModel","ngModelChange"],["name",""],[1,"search-banner"],["type","text","id","","name","searchByProductName","placeholder","Collection Name",1,"form-control",3,"input"],[1,"user-list-table"],[1,"table"],[1,"",2,"background-color","#8eb73b"],["scope","col"],[4,"ngFor","ngForOf"],[4,"ngIf"],[3,"pageChange",4,"ngIf"],["id","exampleModalCenter","tabindex","-1","role","dialog","aria-labelledby","exampleModalCenterTitle","aria-hidden","true",1,"modal","fade","customer-delete-model"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],[1,"modal-header"],["id","exampleModalCenterTitle",1,"modal-title"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],[1,"modal-body"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-secondary","save-btn",3,"click"],["type","button","data-dismiss","modal","aria-label","Close",1,"btn","cancel-btn"],[3,"src"],[1,"eye-btn",3,"routerLink"],["aria-hidden","true",1,"fa","fa-eye"],[1,"edit-btn",3,"routerLink"],["aria-hidden","true",1,"fa","fa-pencil"],["href","","type","button","data-toggle","modal","data-target","#exampleModalCenter",1,"cross-btn-table",3,"click"],["aria-hidden","true",1,"fa","fa-times"],[2,"text-align","center","font-size","20px","padding-top","10px"],[3,"pageChange"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"a",2),e._uU(3,"Add New Collection"),e.qZA(),e.qZA(),e.TgZ(4,"div",3),e.TgZ(5,"h3"),e._uU(6,"Collections List "),e.qZA(),e.qZA(),e.TgZ(7,"div",3),e.TgZ(8,"div",4),e._UZ(9,"div",5),e.TgZ(10,"div",6),e.TgZ(11,"label",7),e._uU(12,"Date "),e.TgZ(13,"a",8),e.NdJ("click",function(){return t.reset("reset")}),e._uU(14,"Reset"),e.qZA(),e.qZA(),e.TgZ(15,"input",9,10),e.NdJ("ngModelChange",function(s){return t.searchDate(s)}),e.qZA(),e.qZA(),e.TgZ(17,"div",6),e.TgZ(18,"div",11),e.TgZ(19,"label"),e._uU(20,"Collection Name"),e.qZA(),e.TgZ(21,"input",12),e.NdJ("input",function(s){return t.collectionTypeSearch(s)}),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(22,"div",13),e.TgZ(23,"table",14),e.TgZ(24,"thead",15),e.TgZ(25,"tr"),e.TgZ(26,"th",16),e._uU(27,"S No."),e.qZA(),e.TgZ(28,"th",16),e._uU(29," Date"),e.qZA(),e.TgZ(30,"th",16),e._uU(31,"Collection Name"),e.qZA(),e.TgZ(32,"th",16),e._uU(33,"Collection Image"),e.qZA(),e.TgZ(34,"th",16),e._uU(35,"Action"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(36,"tbody"),e.YNc(37,J,16,11,"tr",17),e.ALo(38,"paginate"),e.YNc(39,O,5,0,"tr",18),e.qZA(),e.qZA(),e.qZA(),e.YNc(40,E,3,0,"div",18),e.YNc(41,Q,1,0,"pagination-controls",19),e.qZA(),e.TgZ(42,"div",20),e.TgZ(43,"div",21),e.TgZ(44,"div",22),e.TgZ(45,"div",23),e.TgZ(46,"h5",24),e._uU(47,"Delete Collection"),e.qZA(),e.TgZ(48,"button",25),e.TgZ(49,"span",26),e._uU(50,"\xd7"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(51,"div",27),e.TgZ(52,"h2"),e._uU(53,"Are You Sure?"),e.qZA(),e.TgZ(54,"p"),e._uU(55,"Do you really want to delete this Collection data?"),e.qZA(),e.qZA(),e.TgZ(56,"div",28),e.TgZ(57,"button",29),e.NdJ("click",function(){return t.collectionDelete()}),e._uU(58,"Delete"),e.qZA(),e.TgZ(59,"button",30),e._uU(60,"Cancel"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&o&&(e.xp6(2),e.Q6J("routerLink",e.DdM(10,M)),e.xp6(13),e.Q6J("bsConfig",e.DdM(11,Y))("ngModel",t.dateSearch),e.xp6(22),e.Q6J("ngForOf",e.xi3(38,7,t.collectionListWithSearch,e.WLB(12,k,t.p,t.total))),e.xp6(2),e.Q6J("ngIf",!t.collectionListWithSearch),e.xp6(1),e.Q6J("ngIf",""==t.collectionListWithSearch),e.xp6(1),e.Q6J("ngIf",""!=t.collectionListWithSearch&&t.total>10))},directives:[g.yS,A.Y5,r.Fj,A.Np,r.JJ,r.On,h.sg,h.O5,b.LS],pipes:[b._s],styles:[".customers-header[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{max-width:100%}.user-list-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;max-width:50px}"]}),i})();var j=d(2524),z=d(959),B=d(9256),q=d(701),N=d(8360);function H(i,n){if(1&i&&(e.TgZ(0,"div",47),e.TgZ(1,"div",48),e._UZ(2,"img",49),e.qZA(),e.qZA()),2&i){const o=n.$implicit;e.xp6(2),e.s9C("src",o,e.LSH)}}function V(i,n){if(1&i&&(e.TgZ(0,"div",5),e.YNc(1,H,3,1,"div",46),e.qZA()),2&i){const o=e.oxw();e.xp6(1),e.Q6J("ngForOf",o.baseSixtyFourImage)}}function K(i,n){if(1&i&&e._UZ(0,"img",49),2&i){const o=e.oxw(2);e.Q6J("src",o.croppedImage,e.LSH)}}function G(i,n){if(1&i&&(e.TgZ(0,"div",50),e.YNc(1,K,1,1,"img",51),e.qZA()),2&i){const o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.croppedImage)}}function X(i,n){if(1&i&&e._UZ(0,"img",49),2&i){const o=e.oxw(2);e.Q6J("src",o.croppedImage,e.LSH)}}function $(i,n){if(1&i&&(e.TgZ(0,"div",50),e.YNc(1,X,1,1,"img",51),e.qZA()),2&i){const o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.croppedImage)}}function ee(i,n){if(1&i&&(e.TgZ(0,"div",50),e._UZ(1,"img",49),e.qZA()),2&i){const o=e.oxw();e.xp6(1),e.hYB("src","",o.imagePath,"/",o.editImages,"",e.LSH)}}function te(i,n){1&i&&(e.TgZ(0,"div",52),e._uU(1," Images is required "),e.qZA())}function oe(i,n){if(1&i&&(e.TgZ(0,"div",52),e._uU(1),e.qZA()),2&i){const o=e.oxw();e.xp6(1),e.hij(" ",o.imagesLimitOrType," ")}}function ie(i,n){if(1&i&&(e.TgZ(0,"option",57),e._uU(1),e.qZA()),2&i){const o=n.$implicit;e.s9C("value",o.collectionName),e.xp6(1),e.hij(" ",o.collectionName,"")}}function le(i,n){if(1&i){const o=e.EpF();e.TgZ(0,"div",53),e.TgZ(1,"label",17),e._uU(2,"Collection Name"),e.qZA(),e.TgZ(3,"select",54),e.NdJ("change",function(l){return e.CHM(o),e.oxw().changecollectionName(l)}),e.TgZ(4,"option",55),e._uU(5,"Choose Collection Name"),e.qZA(),e.YNc(6,ie,2,2,"option",56),e.qZA(),e.qZA()}if(2&i){const o=e.oxw();e.xp6(6),e.Q6J("ngForOf",o.collections)}}function ce(i,n){1&i&&(e.TgZ(0,"div",22),e.TgZ(1,"div",23),e.TgZ(2,"span"),e._uU(3,"Or"),e.qZA(),e.qZA(),e.qZA())}function se(i,n){if(1&i){const o=e.EpF();e.TgZ(0,"div",53),e.TgZ(1,"label",58),e._uU(2,"Add New Collection Name"),e.qZA(),e.TgZ(3,"input",59),e.NdJ("input",function(l){return e.CHM(o),e.oxw().newcollectionName(l)}),e.qZA(),e.qZA()}}function ne(i,n){1&i&&(e.TgZ(0,"div",52),e._uU(1," Collection Name is required "),e.qZA())}function ae(i,n){1&i&&(e.TgZ(0,"div",52),e._uU(1," Choose Category(Choose Product OR Choose Recipe) is required "),e.qZA())}function re(i,n){1&i&&(e.TgZ(0,"div",52),e._uU(1," Featured is required "),e.qZA())}function de(i,n){1&i&&e._UZ(0,"img",60)}function ue(i,n){if(1&i){const o=e.EpF();e.TgZ(0,"div",61),e.TgZ(1,"div",37),e.TgZ(2,"button",62),e.NdJ("click",function(){return e.CHM(o),e.oxw().modalRef.hide()}),e.TgZ(3,"span",40),e._uU(4,"\xd7"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(5,"div",41),e.TgZ(6,"h2"),e._uU(7,"Are You Sure?"),e.qZA(),e.TgZ(8,"p"),e._uU(9),e.qZA(),e.qZA(),e.TgZ(10,"div",42),e.TgZ(11,"button",43),e.NdJ("click",function(){return e.CHM(o),e.oxw().submit()}),e._uU(12,"Yes"),e.qZA(),e.TgZ(13,"button",63),e.NdJ("click",function(){return e.CHM(o),e.oxw().modalRef.hide()}),e._uU(14,"No"),e.qZA(),e.qZA(),e.qZA()}if(2&i){const o=e.oxw();e.xp6(9),e.hij("Do you really want to ",o.buttonName," this data?")}}let F=(()=>{class i{constructor(o,t,l,s,c,a,u,p,m,T,S){this.formBuilder=o,this.toastr=t,this.router=l,this.collectionService=s,this.zone=c,this.activatedRoute=a,this.productService=u,this.categoryService=p,this.recipeService=m,this.searchString=T,this.modalService=S,this.showImages=!1,this.imagePath=Z.N.imagePath,this.submitted=!1,this.images=[],this.title="Add Collection",this.buttonName="save",this.collectionName=!1,this.collectionNew=!1,this.collectionOr=!0,this.collectionError=!1,this.collectionProductError=!1,this.collectionProductIDs=[],this.collectionCategoriesID=[],this.collectionSubCategoryId=[],this.collectionRecipesID=[],this.collectionChooseProduct=!1,this.collectionChooseRecipe=!1,this.collectionProductOr=!0,this.classProduct="4",this.selectedRecipes=[],this.collecioncroppedImage=!1,this.isLoaderImage=!1,this.imageType=["image/jpg","image/jpeg","image/png"],this.productsName=[],this.catIds=[{categoryId:""}],this.allProducts=[],this.searchProducts=[],this.productDescription=[],this.collections=[],this.imageChangedEvent="",this.croppedImage="",this.baseSixtyFourImage=[],this.subCategoryList=[],this.subCategoriesNames=[],this.subCatId=[]}ngOnInit(){console.log(this.baseSixtyFourImage),this.collectionForm=this.formBuilder.group({collectionImage:[""],collectionName:[""],productId:[""],recipeId:[""],categoryId:[""],subCategoryId:[""],isFeatured:["",[r.kI.required]]}),this.collectionForm.valueChanges.subscribe(o=>{localStorage.setItem("isFormChanged",JSON.stringify(!0))}),this.getListRecipes(),this.activatedRoute.params.subscribe(o=>{this.collectionID=o.id,this.collectionID&&(this.title="Edit Collection",this.buttonName="update",this.getCollectionDataWithId(this.collectionID)),this.getAllCollections()}),this.multiselectedVariables()}multiselectedVariables(){this.getAllProductsName(),this.allCategoriesList(),this.dropdownSettings={idField:"productId",textField:"productDescription",allowSearchFilter:!0},this.dropdownRecipeSettings={idField:"recipeId",textField:"recipeTitle",allowSearchFilter:!0},this.dropdownCategorySettings={idField:"categoryId",textField:"categoryId",allowSearchFilter:!0,singleSelection:!0},this.dropdownSubCategorySettings={idField:"subCategoryId",textField:"subCategoryId",allowSearchFilter:!0}}getCollectionDataWithId(o){this.collectionService.collectionDetail(o).subscribe(l=>{var s,c,a,u,p,m;l.data.categoryId&&(this.getProductsWithId(l.data.categoryId.split(",")),this.getSubCategoriesWithID(null===(c=null===(s=l.data)||void 0===s?void 0:s.categoryId)||void 0===c?void 0:c.split(","))),null===(a=l.data.productId)||void 0===a||a.split(",").forEach(f=>{this.searchString.transform("productId",this.productsName,f).forEach(_=>{f==_.productId&&this.productDescription.push({productId:_.productId,productDescription:_.productDescription})})}),null===(u=l.data.recipeId)||void 0===u||u.split(",").forEach(f=>{var C;(null===(C=this.searchString)||void 0===C?void 0:C.transform("recipeId",this.allRecipes,f)).forEach(w=>{f==w.recipeId&&this.selectedRecipes.push(w)})});const T=this.getUniqueListBy(this.selectedRecipes,"recipeId");null!=l.data.productId?(this.collectionChooseProduct=!0,this.collectionChooseRecipe=!1,this.collectionProductOr=!1,this.classProduct="12"):(this.collectionChooseProduct=!1,this.collectionChooseRecipe=!0,this.collectionProductOr=!1,this.classProduct="12");const S=l.data.isFeatured.toString(),me=this.getUniqueListBy(this.productDescription,"productId");this.collectionForm.patchValue({collectionName:l.data.collectionName,categoryId:null===(p=l.data.categoryId)||void 0===p?void 0:p.split(","),subCategoryId:null===(m=l.data.subCategoryId)||void 0===m?void 0:m.split(","),productId:me,recipeId:T,isFeatured:S}),this.editImages=l.data.collectionImage,console.log(l.data.isFeatured)})}getUniqueListBy(o,t){return[...new Map(o.map(l=>[l[t],l])).values()]}get f(){return this.collectionForm.controls}uploadImage(o){let t=o.target.files;for(var l=0;l<t.length;l++)this.images.push(t[l]);console.log(t),this.collectionID?this.uploadImages(this.collectionID):this.base(o)}openModal(o){this.formValidations(o)}formValidations(o){if(this.submitted=!0,this.collectionNewName&&(this.collectionForm.value.collectionName=this.collectionNewName),0==this.collectionForm.value.productId.length&&(this.collectionForm.value.productId=""),0==this.collectionForm.value.recipeId.length&&(this.collectionForm.value.recipeId=""),!this.collectionForm.value.collectionName)return this.collectionError=!0,this.collectionForm.value.productId||this.collectionForm.value.recipeId?(this.collectionProductError=!1,void this.afterErrorChecked()):void(this.collectionProductError=!0);if(this.editImages)this.croppedImage&&(this.collecioncroppedImage=!1);else if(""==this.croppedImage)return this.collecioncroppedImage=!0,void this.afterErrorChecked();if(!this.collectionForm.value.productId&&!this.collectionForm.value.recipeId)return this.collectionProductError=!0,void this.afterErrorChecked();this.collectionProductError=!1,this.collectionForm.value.productId&&this.getProductIds(this.collectionForm.value.productId),this.collectionForm.value.recipeId&&this.getRecipeIds(this.collectionForm.value.recipeId),this.collectionForm.value.categoryId&&this.getCategoriesId(this.collectionForm.value.categoryId),this.collectionForm.value.subCategoryId&&this.getSubCategoriesId(this.collectionForm.value.subCategoryId),this.croppedImage&&this.images.push(this.imgCropped),this.collectionForm.invalid?this.afterErrorChecked():this.modalRef=this.modalService.show(o)}submit(){let o=this;this.modalRef.hide(),this.isLoaderImage=!0,this.collectionID?(this.collectionForm.value.collectionId=this.collectionID,this.collectionService.updateCollection(this.collectionForm.value).subscribe(t=>{t.success?(console.log(t),this.uploadImages(this.collectionID),setTimeout(function(){o.toastr.success(t.message)},800)):this.toastr.success(t.message)})):this.collectionService.addCollection(this.collectionForm.value).subscribe(t=>{t.success?(this.isLoaderImage=!1,console.log(t),this.uploadImages(t.data),setTimeout(function(){o.toastr.success(t.message)},800)):this.toastr.success(t.message)})}uploadImages(o){console.log(this.images);let t=new FormData;t.append("collectionId",o),this.collectionID?(t.append("collectionImage",this.editImages),console.log(this.imgCropped),t.append("uploadedCollectionImage",this.imgCropped),this.images=[],this.collectionService.updateCollectionImages(t).subscribe(l=>{l.success&&(this.isLoaderImage=!1),this.zone.run(()=>{this.getCollectionDataWithId(this.collectionID),this.router.navigate(["/collections"])})})):(this.images.forEach(l=>{t.append("collectionImage",l)}),this.images=[],this.collectionService.uploadCollectionImages(t).subscribe(l=>{this.isLoaderImage=!1,this.zone.run(()=>{this.router.navigate(["/collections"])})}))}singleImageUpdate(o,t){this.singleImage=o.target.files[0],console.log(t);let l=new FormData;l.append("collectionDetailImageId",t.collectionDetailImageId),l.append("collectionDetailImagePath",t.collectionDetailImagePath),l.append("collectionId",t.collectionId),l.append("uploadedCollectionImage",this.singleImage),this.collectionService.updateCollectionSingleImage(l).subscribe(s=>{s.success&&this.toastr.success(s.message),this.zone.run(()=>{this.getCollectionDataWithId(this.collectionID)})})}getDeleteID(o){this.collectionDetailImageId=o.collectionDetailImageId}deleteSingleImage(){this.collectionService.deleteSingleImage(this.collectionDetailImageId).subscribe(o=>{o.success&&this.toastr.success(o.message),this.zone.run(()=>{this.getCollectionDataWithId(this.collectionID)})})}getAllProductsName(){let o=this.productService.getAllProdData();this.allProducts=JSON.parse(o),console.log(this.allProducts)}allCategoriesList(){this.categoryService.getAllcategories().subscribe(o=>{this.allCategories=o.items.filter(function(t){return null!=t.categoryId}),console.log(this.allCategories)})}selectCategoryEvent(o){this.catIds=[],this.catIds.push({categoryId:o.categoryId}),console.log(this.catIds),this.getListRecipes(),this.subCategories(),this.collectionForm.patchValue({recipeId:[]})}onSelectAllCategory(o){this.searchProducts=this.allProducts,this.getListRecipes()}onDeSelectAllCategory(o){this.searchProducts=[]}DropDownClose(o){this.subCategoryNames=[],this.searchProducts=[],this.subCategoriesNames=[],this.catIds=[],this.subCategoryList=[]}onItemSelect(o){this.collectionChooseProduct=!0,this.collectionChooseRecipe=!1,this.collectionProductOr=!1,this.classProduct="12",this.collectionProductError=!1}onSelectAllProducts(o){this.collectionChooseProduct=!0,this.collectionChooseRecipe=!1,this.collectionProductOr=!1,this.classProduct="12",this.collectionProductError=!1}DropProduct(o){0==this.collectionForm.controls.productId.value.length&&(this.collectionChooseProduct=!1,this.collectionChooseRecipe=!1,this.collectionProductOr=!0,this.classProduct="4")}onDeSelectAllProducts(o){0==o.length&&(this.collectionChooseProduct=!1,this.collectionChooseRecipe=!1,this.collectionProductOr=!0,this.classProduct="4")}getListRecipes(){this.recipeService.getRecipes().subscribe(t=>{this.recipeService.removeRecipeData(),this.allRecipes=t.items,this.recipeService.sendAllRecipesData(this.allRecipes)});const o=this.recipeService.getAllRecipesData();this.allRecipes=JSON.parse(o),console.log(this.allRecipes)}onItemSelectRecipe(o){this.collectionChooseProduct=!1,this.collectionChooseRecipe=!0,this.collectionProductOr=!1,this.classProduct="12",this.collectionProductError=!1,this.clearData()}clearData(){this.collectionForm.patchValue({categoryId:"",subCategoryId:"",productId:""}),this.subCategoryNames=[],this.searchProducts=[]}onSelectAllRecipe(o){this.collectionChooseProduct=!1,this.collectionChooseRecipe=!0,this.collectionProductOr=!1,this.classProduct="12"}DropRecipe(o){0==this.collectionForm.controls.recipeId.value.length&&(this.collectionChooseProduct=!1,this.collectionChooseRecipe=!1,this.collectionProductOr=!0,this.classProduct="4")}onDeSelectAllRecipe(o){0==o.length&&(this.collectionChooseProduct=!1,this.collectionChooseRecipe=!1,this.collectionProductOr=!0,this.classProduct="4")}changecollectionName(o){o.target.value?(this.collectionName=!0,this.collectionOr=!1,this.collectionNew=!1,this.collectionError=!1):(this.collectionName=!1,this.collectionOr=!0,this.collectionNew=!1,this.collectionError=!1),this.clearData()}newcollectionName(o){console.log(o.target.value),o.target.value?(this.collectionNewName=o.target.value,this.collectionName=!1,this.collectionNew=!0,this.collectionOr=!1,this.collectionError=!1):(this.collectionOr=!0,this.collectionNew=!1,this.collectionName=!1)}getProductIds(o){this.collectionProductIDs=[],o.forEach(t=>{this.collectionProductIDs.push(t.productId)}),this.collectionForm.value.productId=this.collectionProductIDs.join(",")}getRecipeIds(o){o.forEach(t=>{this.collectionRecipesID.push(t.recipeId)}),this.collectionForm.value.recipeId=this.collectionRecipesID.join(",")}getCategoriesId(o){o.forEach(t=>{this.collectionCategoriesID.push((null==t?void 0:t.categoryId)?t.categoryId:t)}),console.log(this.collectionCategoriesID),this.collectionForm.value.categoryId=this.collectionCategoriesID.join(",")}getSubCategoriesWithID(o){console.log(o),null==o||o.forEach(t=>{console.log(t);const l=new FormData;l.append("categoryId",t),this.categoryService.getAllSubcategories(l).subscribe(s=>{console.log(s),this.subCategoryList.push(s.items),this.subCategoryName(this.subCategoryList)})})}getSubCategoriesId(o){o.forEach(t=>{this.collectionSubCategoryId.push((null==t?void 0:t.subCategoryId)?t.subCategoryId:t)}),this.collectionForm.value.subCategoryId=this.collectionSubCategoryId.join(",")}getProductsWithId(o){o.forEach(l=>{this.catIds.push({categoryId:l})}),console.log(this.catIds),this.catIds.forEach(l=>{this.searchString.transform("categoryId",this.allProducts,l.categoryId).forEach(c=>{let a=!1;c.productDescription&&(this.productSalePrice=c.salesPrice,this.productavailableQuantity=c.availableQuantity,(0==this.productSalePrice||null==this.productSalePrice||""==this.productSalePrice||null==this.productSalePrice||0==this.productavailableQuantity||null==this.productavailableQuantity||""==this.productavailableQuantity||null==this.productavailableQuantity)&&(a=!0),this.productsName.push({productId:c.productId,productDescription:c.productDescription,isDisabled:a}))}),this.searchProducts=this.productsName.filter(function(c){return""!==c.productDescription})}),console.log(this.searchProducts),this.getListRecipes()}getAllCollections(){this.collectionService.getAllCollection(1,1e4).subscribe(o=>{const t=this.getUniqueListBy(o.items,"collectionName");this.collections=t})}base(o){let l=o.target.files;for(var s=0;s<l.length;s++){const c=new FileReader;c.readAsDataURL(l[s]),c.onload=()=>{this.baseSixtyFourImage.push(c.result)}}this.showImages=!0}fileChangeEvent(o){this.collecioncroppedImage=!1,this.imageType.includes(o.target.files[0].type)?o.target.files[0].size/1024/1024<2?(this.imagesLimitOrType="",this.imageChangedEvent=o,this.croppedImage&&(this.baseSixtyFourImage.push(this.croppedImage),this.images.push(this.imgCropped))):(this.imagesLimitOrType="Image Size Should Be Less Than 2 Mb",this.croppedImage=""):(this.imagesLimitOrType="Invalid File Type",this.croppedImage="")}imageCropped(o){this.imageChangedEvent&&(this.croppedImage=o.base64,this.dataURLtoFile(this.croppedImage,this.imageChangedEvent.target.files[0].name,this.imageChangedEvent.target.files[0].type))}imageLoaded(){}cropperReady(){}loadImageFailed(){}dataURLtoFile(o,t,l){for(var s=o.split(","),c=atob(s[1]),a=c.length,u=new Uint8Array(a);a--;)u[a]=c.charCodeAt(a);this.imgCropped=new File([u],t,{type:l})}afterErrorChecked(){window.scrollTo({top:0,behavior:"smooth"})}subCategories(){this.subCategoryList=[],this.catIds.forEach(o=>{const t=new FormData;t.append("categoryId",o.categoryId),this.categoryService.getAllSubcategories(t).subscribe(l=>{this.subCategoryList.push(l.items),this.subCategoryName(this.subCategoryList)})})}subCategoryName(o){this.subCategoriesNames=[],o[0].forEach(t=>{this.subCategoriesNames.push({subCategoryId:t.subCategoryId})}),this.subCategoryNames=this.subCategoriesNames}selectSubCategoryEvent(o){var t;this.subCatId.push({subCategoryId:o.subCategoryId}),this.dataForSingleSubcategories(null===(t=this.catIds[0])||void 0===t?void 0:t.categoryId,o.subCategoryId)}onSelectAllSubCategory(o){var t;this.subCatId=o,this.searchProducts=[],this.dataForAllSubcategories(null===(t=this.catIds[0])||void 0===t?void 0:t.categoryId)}DropSubClose(o){let t=!1;this.subCatId.forEach((l,s)=>{l.subCategoryId==o.subCategoryId&&this.subCatId.splice(s,1)}),0===this.subCatId.length&&(this.searchProducts=[]),this.productsName=[],this.subCatId=this.subCatId.filter(function(l){return""!==l.subCategoryId}),this.subCatId.forEach(l=>{l.subCategoryId!=o.subCategoryId&&(this.searchString.transform2("categoryId","subCategoryId",this.allProducts,this.catIds[0].categoryId,l.subCategoryId).forEach(u=>{u.productDescription&&(t=!1,this.productSalePrice=u.salesPrice,this.productavailableQuantity=u.availableQuantity,(0==this.productSalePrice||null==this.productSalePrice||""==this.productSalePrice||null==this.productSalePrice||0==this.productavailableQuantity||null==this.productavailableQuantity||""==this.productavailableQuantity||null==this.productavailableQuantity)&&(t=!0),this.productsName.push({productId:u.productId,productDescription:u.productDescription,isDisabled:t}))}),this.searchProducts=this.productsName.filter(function(u){return""!==u.productDescription}))})}onDeSelectAllSubCategory(o){this.searchProducts=[]}dataForAllSubcategories(o){let s=!1;this.searchString.transform("categoryId",this.allProducts,o).forEach(a=>{a.productDescription&&(s=!1,this.productSalePrice=a.salesPrice,this.productavailableQuantity=a.availableQuantity,(0==this.productSalePrice||null==this.productSalePrice||""==this.productSalePrice||null==this.productSalePrice||0==this.productavailableQuantity||null==this.productavailableQuantity||""==this.productavailableQuantity||null==this.productavailableQuantity)&&(s=!0),this.productsName.push({productId:a.productId,productDescription:a.productDescription,isDisabled:s}))}),this.searchProducts=this.productsName.filter(function(a){return""!==a.productDescription})}dataForSingleSubcategories(o,t){let a=!1;this.searchString.transform2("categoryId","subCategoryId",this.allProducts,o,t).forEach(p=>{p.productDescription&&(a=!1,this.productSalePrice=p.salesPrice,this.productavailableQuantity=p.availableQuantity,(0==this.productSalePrice||null==this.productSalePrice||""==this.productSalePrice||null==this.productSalePrice||0==this.productavailableQuantity||null==this.productavailableQuantity||""==this.productavailableQuantity||null==this.productavailableQuantity)&&(a=!0),this.productsName.push({productId:p.productId,productDescription:p.productDescription,isDisabled:a}))}),this.searchProducts=this.productsName.filter(function(p){return""!==p.productDescription})}}return i.\u0275fac=function(o){return new(o||i)(e.Y36(r.qu),e.Y36(D._W),e.Y36(g.F0),e.Y36(I.a),e.Y36(e.R0b),e.Y36(g.gz),e.Y36(P.M),e.Y36(j.d),e.Y36(z.j),e.Y36(v.K),e.Y36(B.tT))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-add-collection"]],decls:85,vars:28,consts:[[1,"app-main__inner"],[1,"user-header","customers-header"],[1,"address-info-form"],[3,"formGroup"],[1,"imges-upload","text-center"],[1,"row"],["format","png",3,"imageChangedEvent","maintainAspectRatio","aspectRatio","imageCropped","imageLoaded","cropperReady","loadImageFailed"],["class","row",4,"ngIf"],[1,"imgUp","m-auto"],["class","imagePreview",4,"ngIf"],[1,"btn","btn-primary"],["type","file","name","collectionImage","value","Upload Photo",1,"uploadFile","img",2,"width","0px","height","0px","overflow","hidden",3,"change"],["class","invalid-formdata",4,"ngIf"],[1,"form-row"],["class","form-group col-md-5",4,"ngIf"],["class","col-md-1 m-auto",4,"ngIf"],[1,"form-group","col-md-6"],["for","inputAddress"],["formControlName","categoryId",3,"settings","data","onSelect","onSelectAll","onDeSelect","onDeSelectAll"],["formControlName","subCategoryId",3,"settings","data","onSelect","onSelectAll","onDeSelect","onDeSelectAll"],[1,"form-group","col-md-4"],["formControlName","productId",3,"settings","data","onSelect","onSelectAll","onDeSelect","onDeSelectAll"],[1,"col-md-1","m-auto"],[1,"devider-class"],["formControlName","recipeId",3,"settings","data","onSelect","onSelectAll","onDeSelect","onDeSelectAll"],[1,"form-check","form-check-inline"],["for","inlineRadio1",1,"form-check-label","mr-2"],["type","radio","name","isFeatured","formControlName","isFeatured","id","inlineRadio2","value","true",1,"form-check-input"],["for","inlineRadio2",1,"form-check-label"],["type","radio","name","isFeatured","formControlName","isFeatured","id","inlineRadio3","value","false",1,"form-check-input"],["for","inlineRadio3",1,"form-check-label"],[1,"info-per-btn"],["type","submit",1,"save-btn",3,"disabled","click"],["src","assets/images/formload.gif","class","form-button-loader",4,"ngIf"],["id","exampleModalCenter","tabindex","-1","role","dialog","aria-labelledby","exampleModalCenterTitle","aria-hidden","true",1,"modal","fade","customer-delete-model"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],[1,"modal-header"],["id","exampleModalCenterTitle",1,"modal-title"],["type","button","data-dismiss","modal","aria-label","Close",1,"close"],["aria-hidden","true"],[1,"modal-body"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-secondary","save-btn",3,"click"],["type","button","data-dismiss","modal","aria-label","Close",1,"btn","cancel-btn"],["template",""],["class","col-md-4 mb-4",4,"ngFor","ngForOf"],[1,"col-md-4","mb-4"],[1,"collection-recipe-banner"],[3,"src"],[1,"imagePreview"],[3,"src",4,"ngIf"],[1,"invalid-formdata"],[1,"form-group","col-md-5"],["id","","name","collectionName","formControlName","collectionName",1,"form-control",3,"change"],["selected","","value",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["for","inputEmail4"],["type","text","name","collectionNameNew","placeholder","New Collection",1,"form-control",3,"input"],["src","assets/images/formload.gif",1,"form-button-loader"],[1,"customer-delete-model"],["type","button","aria-label","Close",1,"close","pull-right",3,"click"],["type","button",1,"btn","cancel-btn",3,"click"]],template:function(o,t){if(1&o){const l=e.EpF();e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"h3"),e._uU(3),e.qZA(),e.qZA(),e.TgZ(4,"section",2),e.TgZ(5,"form",3),e.TgZ(6,"div",4),e.TgZ(7,"p"),e._uU(8,"Upload Collection Images"),e.qZA(),e.TgZ(9,"div",5),e.TgZ(10,"image-cropper",6),e.NdJ("imageCropped",function(c){return t.imageCropped(c)})("imageLoaded",function(){return t.imageLoaded()})("cropperReady",function(){return t.cropperReady()})("loadImageFailed",function(){return t.loadImageFailed()}),e.qZA(),e.qZA(),e.YNc(11,V,2,1,"div",7),e.TgZ(12,"div",8),e.YNc(13,G,2,1,"div",9),e.YNc(14,$,2,1,"div",9),e.YNc(15,ee,2,2,"div",9),e.TgZ(16,"label",10),e._uU(17," Upload"),e.TgZ(18,"input",11),e.NdJ("change",function(c){return t.fileChangeEvent(c)}),e.qZA(),e.qZA(),e.qZA(),e.YNc(19,te,2,0,"div",12),e.YNc(20,oe,2,1,"div",12),e.qZA(),e.TgZ(21,"div",13),e.YNc(22,le,7,1,"div",14),e.YNc(23,ce,4,0,"div",15),e.YNc(24,se,4,0,"div",14),e.YNc(25,ne,2,0,"div",12),e.qZA(),e.TgZ(26,"div",13),e.TgZ(27,"div",16),e.TgZ(28,"label",17),e._uU(29,"Choose Category"),e.qZA(),e.TgZ(30,"ng-multiselect-dropdown",18),e.NdJ("onSelect",function(c){return t.selectCategoryEvent(c)})("onSelectAll",function(c){return t.onSelectAllCategory(c)})("onDeSelect",function(c){return t.DropDownClose(c)})("onDeSelectAll",function(c){return t.onDeSelectAllCategory(c)}),e.qZA(),e.qZA(),e.TgZ(31,"div",16),e.TgZ(32,"label",17),e._uU(33,"Choose Sub-Category"),e.qZA(),e.TgZ(34,"ng-multiselect-dropdown",19),e.NdJ("onSelect",function(c){return t.selectSubCategoryEvent(c)})("onSelectAll",function(c){return t.onSelectAllSubCategory(c)})("onDeSelect",function(c){return t.DropSubClose(c)})("onDeSelectAll",function(c){return t.onDeSelectAllSubCategory(c)}),e.qZA(),e.qZA(),e.TgZ(35,"div",20),e.TgZ(36,"label",17),e._uU(37,"Choose Product"),e.qZA(),e.TgZ(38,"ng-multiselect-dropdown",21),e.NdJ("onSelect",function(c){return t.onItemSelect(c)})("onSelectAll",function(c){return t.onSelectAllProducts(c)})("onDeSelect",function(c){return t.DropProduct(c)})("onDeSelectAll",function(c){return t.onDeSelectAllProducts(c)}),e.qZA(),e.qZA(),e.TgZ(39,"div",22),e.TgZ(40,"div",23),e.TgZ(41,"span"),e._uU(42,"Or"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(43,"div",20),e.TgZ(44,"label",17),e._uU(45,"Choose Recipes"),e.qZA(),e.TgZ(46,"ng-multiselect-dropdown",24),e.NdJ("onSelect",function(c){return t.onItemSelectRecipe(c)})("onSelectAll",function(c){return t.onSelectAllRecipe(c)})("onDeSelect",function(c){return t.DropRecipe(c)})("onDeSelectAll",function(c){return t.onDeSelectAllRecipe(c)}),e.qZA(),e.qZA(),e.YNc(47,ae,2,0,"div",12),e.qZA(),e.TgZ(48,"div",25),e.TgZ(49,"label",26),e._uU(50,"Is Featured:"),e.qZA(),e.qZA(),e.TgZ(51,"div",25),e._UZ(52,"input",27),e.TgZ(53,"label",28),e._uU(54,"True"),e.qZA(),e.qZA(),e.TgZ(55,"div",25),e._UZ(56,"input",29),e.TgZ(57,"label",30),e._uU(58,"False"),e.qZA(),e.qZA(),e.YNc(59,re,2,0,"div",12),e.TgZ(60,"div",31),e.TgZ(61,"button",32),e.NdJ("click",function(){e.CHM(l);const c=e.MAs(84);return t.openModal(c)}),e._uU(62),e.qZA(),e.YNc(63,de,1,0,"img",33),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(64,"div",34),e.TgZ(65,"div",35),e.TgZ(66,"div",36),e.TgZ(67,"div",37),e.TgZ(68,"h5",38),e._uU(69,"Delete Image"),e.qZA(),e.TgZ(70,"button",39),e.TgZ(71,"span",40),e._uU(72,"\xd7"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(73,"div",41),e.TgZ(74,"h2"),e._uU(75,"Are You Sure?"),e.qZA(),e.TgZ(76,"p"),e._uU(77,"Do you really want to delete this Image?"),e.qZA(),e.qZA(),e.TgZ(78,"div",42),e.TgZ(79,"button",43),e.NdJ("click",function(){return t.deleteSingleImage()}),e._uU(80,"Delete"),e.qZA(),e.TgZ(81,"button",44),e._uU(82,"Cancel"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.YNc(83,ue,15,1,"ng-template",null,45,e.W1O)}2&o&&(e.xp6(3),e.hij("",t.title," "),e.xp6(2),e.Q6J("formGroup",t.collectionForm),e.xp6(5),e.Q6J("imageChangedEvent",t.imageChangedEvent)("maintainAspectRatio",!0)("aspectRatio",4/3),e.xp6(1),e.Q6J("ngIf",t.baseSixtyFourImage),e.xp6(2),e.Q6J("ngIf",!t.collectionID),e.xp6(1),e.Q6J("ngIf",t.collectionID&&t.croppedImage),e.xp6(1),e.Q6J("ngIf",t.collectionID&&!t.croppedImage),e.xp6(4),e.Q6J("ngIf",t.collecioncroppedImage),e.xp6(1),e.Q6J("ngIf",t.imagesLimitOrType),e.xp6(2),e.Q6J("ngIf",!t.collectionNew),e.xp6(1),e.Q6J("ngIf",t.collectionOr),e.xp6(1),e.Q6J("ngIf",!t.collectionName),e.xp6(1),e.Q6J("ngIf",t.collectionError),e.xp6(5),e.Q6J("settings",t.dropdownCategorySettings)("data",t.allCategories),e.xp6(4),e.Q6J("settings",t.dropdownSubCategorySettings)("data",t.subCategoryNames),e.xp6(4),e.Q6J("settings",t.dropdownSettings)("data",t.searchProducts),e.xp6(8),e.Q6J("settings",t.dropdownRecipeSettings)("data",t.allRecipes),e.xp6(1),e.Q6J("ngIf",t.collectionProductError),e.xp6(12),e.Q6J("ngIf",t.submitted&&t.f.isFeatured.errors),e.xp6(2),e.Q6J("disabled",t.isLoaderImage),e.xp6(1),e.Oqu(t.buttonName),e.xp6(1),e.Q6J("ngIf",t.isLoaderImage))},directives:[r._Y,r.JL,r.sg,q.ap,h.O5,N.OP,r.JJ,r.u,r._,r.Fj,h.sg,r.EJ,r.YN,r.Kr],styles:[".invalid-formdata[_ngcontent-%COMP%]{color:red}.collection-recipe-banner[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:225px;border-radius:8px;object-fit:cover}.collection-recipe-banner[_ngcontent-%COMP%]{position:relative;width:100%;max-width:400px;margin:0 auto}.collection-recipe-banner[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{position:absolute;top:-6px;background-color:#23b412;border-radius:25px;color:#fff;font-size:18px;width:30px;height:30px;line-height:30px;right:-10px;cursor:pointer}.collection-recipe-banner[_ngcontent-%COMP%]   .fa-trash-o[_ngcontent-%COMP%]{background-color:#b70505;right:27px}.address-info-form[_ngcontent-%COMP%]{overflow:inherit}.collection-recipe-banner.collections[_ngcontent-%COMP%]   i.fa.fa-trash-o[_ngcontent-%COMP%]{right:0}.save-btn[_ngcontent-%COMP%]{text-transform:capitalize}"]}),i})();const pe=[{path:"",component:W},{path:"add",component:F},{path:"edit/:id",component:F},{path:"detail/:id",component:(()=>{class i{constructor(o,t,l){this.activatedRoute=o,this.router=t,this.collectionService=l,this.imagePath=Z.N.imagePath}ngOnInit(){this.activatedRoute.params.subscribe(o=>{this.sectionId=o.id,this.getCollectionDetail(this.sectionId)})}getCollectionDetail(o){this.collectionService.collectionDetail(o).subscribe(t=>{this.collectionData=t.data,console.log(this.collectionData)})}}return i.\u0275fac=function(o){return new(o||i)(e.Y36(g.gz),e.Y36(g.F0),e.Y36(I.a))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-detail"]],decls:28,vars:7,consts:[[1,"app-main__inner"],[1,"user-header","customers-header"],["action","/action_page.php"],[1,"add-new-cus"],[1,"user-list-images"],[1,"row"],[1,"col-md-6"],[1,"mb-4"],[1,"col-md-12"],[1,"collection-detail-img"],[3,"src"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"h3"),e._uU(3,"Collection Detail "),e.TgZ(4,"form",2),e._UZ(5,"div",3),e.qZA(),e.qZA(),e.qZA(),e.TgZ(6,"div",4),e.TgZ(7,"div",5),e.TgZ(8,"div",6),e.TgZ(9,"ul"),e.TgZ(10,"li"),e.TgZ(11,"b"),e._uU(12,"Date:"),e.qZA(),e._uU(13),e.ALo(14,"date"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(15,"div",6),e.TgZ(16,"ul"),e.TgZ(17,"li"),e.TgZ(18,"b"),e._uU(19,"Collection Name:"),e.qZA(),e._uU(20),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(21,"div",4),e.TgZ(22,"h5",7),e._uU(23,"Collection images"),e.qZA(),e.TgZ(24,"div",5),e.TgZ(25,"div",8),e.TgZ(26,"div",9),e._UZ(27,"img",10),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&o&&(e.xp6(13),e.hij(" ",e.xi3(14,4,null==t.collectionData?null:t.collectionData.createDate,"longDate"),""),e.xp6(7),e.hij(" ",null==t.collectionData?null:t.collectionData.collectionName,""),e.xp6(7),e.hYB("src","",t.imagePath,"/",null==t.collectionData?null:t.collectionData.collectionImage,"",e.LSH))},directives:[r._Y,r.JL,r.F],pipes:[h.uU],styles:[".col-md-4[_ngcontent-%COMP%]{float:left}"]}),i})()}];let he=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[[g.Bz.forChild(pe)],g.Bz]}),i})(),ge=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({providers:[v.K,h.uU],imports:[[h.ez,he,r.UX,r.u5,b.JX,N.ZQ.forRoot(),A.kn.forRoot(),q.QG]]}),i})()}}]);