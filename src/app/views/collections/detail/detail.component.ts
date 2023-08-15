import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CollectionService } from 'src/app/_services/collection.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  sectionId:any;
  collectionData: any;
  imagePath: string = environment.imagePath;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService 
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
        this.sectionId = param['id'];
        this.getCollectionDetail(this.sectionId)
    });
  }
  getCollectionDetail(collectionId:any){
    this.collectionService.collectionDetail(collectionId).subscribe(res=>{
     this.collectionData = res.data;
     console.log(this.collectionData)
    })
  }

}
