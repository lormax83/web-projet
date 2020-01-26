import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  value="";
  array = [];
  link="";
  constructor(private http:HttpClient, private router:Router) { }
  ngOnInit() {
    
  }
  onSubmitGet(){
    var get = this.http.get('https://wasabi.i3s.unice.fr/search/fulltext/:'+this.value);
    get.subscribe((data: any[])=>{
      this.array=data;
      for (let index = 0; index <   this.array.length; index++) {
        if(this.array[index].picture == ""){
          this.array[index].picture = "../../../assets/img/alt.PNG"
        }
      }
    })
  
  }
  onReset(){
    this.value="";
    this.array=[];
  }

  onSearch(element){
    this.value="";
    this.onSubmitGet();
    if(element.albumTitle){
      var get = this.http.get('https://wasabi.i3s.unice.fr/api/v1/album/name/:'+element.name);
    get.subscribe((data: any[])=>{
    })
    this.router.navigate(['/album',element.name]);
    this.link = "/album/"+element.name;

    }else if(element.title){
      var get = this.http.get('https://wasabi.i3s.unice.fr/api/v1/song/name/:'+element.name);
    get.subscribe((data: any[])=>{
    })
    this.router.navigate(['/song',element.name]);
    this.link = "/song/"+element.name;
    }else{

      var get = this.http.get('https://wasabi.i3s.unice.fr/api/v1/artist/name/'+element.name);
    get.subscribe((data: any[])=>{
      console.log(data);
    })
    this.router.navigate(['/artist',element.name]);
    this.link = "/artist/"+element.name;
    }
    }
    reloading(){
      window.location.reload();
    }
}


