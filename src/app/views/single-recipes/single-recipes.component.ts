import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute,Params } from '@angular/router';
import { RecipesDetail } from 'src/app/_interfaces/recipesdetail.model';
import { RecipeService } from 'src/app/_services/recipe.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-single-recipes',
  templateUrl: './single-recipes.component.html',
  styleUrls: ['./single-recipes.component.css']
})
export class SingleRecipesComponent implements OnInit {
  recipeID: any;
  recipeDetail = new RecipesDetail;
  videoUrl: any;
  imagePath: string = environment.imagePath;
  recipeImage: any;
  showImage: any = false;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private domSanitization: DomSanitizer,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.recipeID = param['id'];
      this.getRecipeDetail(this.recipeID);
  });
  }

  getRecipeDetail(data:any){
    let that = this;
    this.spinner.show()
    this.recipeService.getSingleRecipe(data).subscribe(res=>{
      this.recipeDetail = res.data;
      console.log(this.recipeDetail)
      this.recipeImage = res.data.recipeDetailImageList[0].recipeDetailImagePath;
      if(this.recipeImage){
        this.showImage = true;
      }
      this.videoUrl = this.domSanitization.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.recipeDetail.videoUrl);
      setTimeout(function(){ 
        that.spinner.hide();
       }, 500);
      
    })
  }
 

}
