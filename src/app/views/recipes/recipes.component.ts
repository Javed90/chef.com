import { Component, NgZone, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/_services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchStringPipe } from 'src/app/_pipes/search-string.pipe';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  getAllRecipes: any;
  imagePath: string = environment.imagePath;
  image: any;
  recipeListWithSearch: any;
  p: number = 1;
  total: any;
  recipeDeleteId:any;

  constructor( private recipeService: RecipeService,
    private toastr: ToastrService,
    private zone: NgZone,
    private spinner: NgxSpinnerService,
    private searchString: SearchStringPipe
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getListRecipes();    
  }
  deleteRecipeWithID(ID:any){
    this.recipeDeleteId = ID;
    
  }
  /** delete Recipes */

  deleteData(){
    let that = this;
    this.recipeService.deleteRecipe(this.recipeDeleteId).subscribe(res=>{
      if(res.success){
        that.zone.run(()=>{this.getListRecipes()})
        this.toastr.success(res.message); 
        
      }else{
        this.toastr.success(res.message);
      }
    })
  }
  getListRecipes(){
    this.recipeService.getRecipes().subscribe(res=>{
      this.getAllRecipes = res.items;
      this.recipeListWithSearch = res.items;
      this.total = this.recipeListWithSearch.length;
      
      this.spinner.hide();
    
      })
      
      
   
  }
  /** Search With Recipe Name */
  recipeTypeSearch(event:any){
    const stringVal = event.target.value.replace(/^\s+|\s+$/gm,'');
    this.recipeListWithSearch = this.searchString.transform('recipeTitle',this.getAllRecipes,stringVal);
    this.p = 1;
    this.total = this.recipeListWithSearch.length;
    
  }
 
}
