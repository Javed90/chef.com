import { Component, OnInit } from '@angular/core';
import { CollectionService } from './_services/collection.service';
import { ProductService } from './_services/product.service';
import { RecipeService } from './_services/recipe.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chef middle east';
  productsList: any;
  productListWithSearch: any;
  allRecipes: any;
  allCollections: any;

  constructor(private productService: ProductService,
    private recipeService: RecipeService,
    private collectionService: CollectionService,) { }

  ngOnInit(): void {
    //this.productService.removeProductData();  
    const prodData = this.productService.getAllProdData();
    if(prodData == '' || prodData == null)  {
     this.products();
    }
    const recipeData = this.recipeService.getAllRecipesData();
    if(recipeData == '' || recipeData == null)  {
     this.getAllRecipes();
    }
    const collectionData = this.collectionService.getAlCollectionsData();
    if(collectionData == '' || collectionData == null)  {
     this.getAllCollections();
    }
  }
  products(){
    this.productService.getProducts(1,2000).subscribe(res=>{
      this.productsList = res.items; 
      this.productListWithSearch = this.productsList.filter(function(e:any) {
        return e.productDescription != null;
      });
      this.productService.sendAllProductsData(this.productListWithSearch);
      console.log(this.productListWithSearch)
    })
  }

  getAllRecipes(){
    this.recipeService.getRecipes().subscribe(res=>{
      this.allRecipes = res.items;
      this.recipeService.sendAllRecipesData(this.allRecipes);
      })  
  }
  getAllCollections(){
    this.collectionService.getAllCollection(1,1000).subscribe(res=>{
      this.allCollections = res.items;
      this.collectionService.sendAllCollectionsData(this.allCollections);
      })  
  }
  

}
  

