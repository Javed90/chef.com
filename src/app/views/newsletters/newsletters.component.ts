import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NewsletterService } from 'src/app/_services/newsletter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.css']
})
export class NewslettersComponent implements OnInit {

  newsLetterList: any;
  imagePath: string = environment.imagePath;
  newsLetterId: any;
  total: any;
  p: number = 1;
  constructor(private newsLetterService: NewsletterService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getNewsletterList();
  }
  getNewsletterList(){
    this.newsLetterService.getNewsLetterList().subscribe(res=>{
      this.newsLetterList = res.items;
      this.total = res.items.length;
      this.spinner.hide()
    });
  }
  removeNewsLetter(ID:any){
    this.newsLetterId = ID;
  }
  newsDelete(){
    this.newsLetterService.deleteNewsLetter(this.newsLetterId).subscribe(res=>{
      if(res.success){
        this.toastr.success(res.message);
        this.getNewsletterList();
      }
    })
  }

}
