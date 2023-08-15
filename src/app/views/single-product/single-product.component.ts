import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailModel } from 'src/app/_interfaces/productdetail.model';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  productID:any;
  productDetail = new ProductDetailModel;
  productObj:any = [];
  images:any;
  relatedProductsId: any;
  productsList: any;
  relatedProducts:any = [];
  relatedProductObject: any;
  isChecked: boolean = false;
  imagePath: string = environment.productImagePath;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private serchString: SearchStringPipe,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  //   this.activatedRoute.params.subscribe((param: Params) => {
  //     this.productID = param['id'];
  //     this.getProductDetail(this.productID);
  // });
   //}
  
this.getSingleProductObject();
  }
  getSingleProductObject(){
    this.productService.currentObject.subscribe(productObj=> this.productObj = productObj)
    if(this.relatedProductObject){
      this.productDetail = this.relatedProductObject;
    }else{
      this.productDetail = this.productObj;
      this.isChecked = this.productObj.isProductActive;
    }
    
    if(this.productDetail){
      this.productService.clearProductData();
      this.productService.sendProductData(this.productDetail);
    }else{
    const data:any = this.productService.getProductData();
    this.productDetail = JSON.parse(data);
    }
    console.log(this.productDetail)
    /** Images array */
    const images = this.productDetail.productImages;
    // if(images){
    //   this.images = images.split(',');
    // }else{
    //   this.images = []
    // }

    /** Related Products Array */
    console.log(this.productDetail.relatedProducts)
    const relatedIDs = this.productDetail.relatedProducts;
    if(relatedIDs){
      this.relatedProductsId = relatedIDs.split(',');
      this.getAllProducts();
    }else{
      this.relatedProducts = []
    }
    console.log(this.relatedProductsId)
    
  }

  /** Get All Products */

  getAllProducts(){
    let that = this
    const prodData:any =  this.productService.getAllProdData();
    this.productsList = JSON.parse(prodData);
    this.relatedProductsId.forEach((element:any) => {
      this.productsList.filter(function(e:any) {
        if(e.productId == element){
          that.relatedProducts.push(e);
        }
      });
    });

  }

  sendObject(item:any){
    this.relatedProductObject = item;
    this.getSingleProductObject();
    // this.productService.changeObject(item);
  }
/** Product single active / diactive products */
  productSingleStatus(productID:any,event:any){
    console.log(event.target.checked);
    this.productService.updateSingleProductStatus(productID,event.target.checked).subscribe(res=>{
      if(res.success){
        this.toastr.success('Status Changed Successfully');
     }else{
       this.toastr.success(res.message);
     }
    })
  }
}
