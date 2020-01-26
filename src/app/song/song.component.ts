import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  constructor(private http:HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    var artist = this.route.snapshot.paramMap.get('id');
    var album = this.route.snapshot.paramMap.get('album');
    var song = this.route.snapshot.paramMap.get('song');
    var get = this.http.get('https://wasabi.i3s.unice.fr/search/artist/'+artist+'/album/'+album+'/song/'+song);
    get.subscribe((data: any)=>{
      console.log(data);
    })
  }

}
