import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  listBpm: any [] = [];
  listSongs: any [] = [];
  listLength: any [] = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = this.listSongs;
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: this.listBpm, label: 'Bpm' },{ data: this.listLength, label: 'Length' }
  ];
  constructor(private http:HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    var artist = this.route.snapshot.paramMap.get('id');
    var album = this.route.snapshot.paramMap.get('album');
    var song;
    var get = this.http.get('https://wasabi.i3s.unice.fr/search/artist/'+artist+'/album/'+album);
    get.subscribe((data: any)=>{
      for (let i = 0; i < data.albums.songs.length; i++) {
        song = data.albums.songs[i].title;
        var getSongs = this.http.get('https://wasabi.i3s.unice.fr/search/artist/'+artist+'/album/'+album+'/song/'+song);
        getSongs.subscribe((songsData: any)=>{
          console.log(songsData);
          this.listSongs.push(songsData.albums.songs.title);
          this.listBpm.push(songsData.albums.songs.bpm);
          this.listLength.push(songsData.albums.songs.length);
        })
      }
    })
  }

}
