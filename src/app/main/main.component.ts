import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets  } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  nbrPlatinum:number;
  nbrGold: number;
  nbrDiamond:number;
  nbrSongByCountry:number[]=[];
  nameContries:string[]=[];
  nbArtist:number;
  nbSong:number;
  nbAlbum:number;
  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public chartLegend = false;
  public chartPlugins = [];
  public chartColors = [
    {
      backgroundColor: ['rgb(0,0,255)', 'rgb(51, 153, 255)', 'rgb(192, 192, 192)','rgb(0,0,255)', 'rgb(51, 153, 255)', 'rgb(192, 192, 192)','rgb(0,0,255)', 'rgb(51, 153, 255)', 'rgb(192, 192, 192)','rgb(0,0,255)', 'rgb(51, 153, 255)', 'rgb(192, 192, 192)'],
    },
  ];


  public pieChartLabels: Label[] = ["Platinum","Gold","Diamond" ];
  public pieChartData: SingleDataSet = [this.nbrPlatinum, this.nbrGold, this.nbrDiamond];
  public pieChartLabelsNbr: Label[] = ["Album","Artist","Song" ];
  public pieChartDataNbr: SingleDataSet = [this.nbAlbum, this.nbArtist, this.nbSong];
  public pieChartType: ChartType = 'pie';
  
  
  public barChartLabels: Label[] = this.nameContries;
  public barChartData: ChartDataSets[] = [{ data: this.nbrSongByCountry}];
  public barChartType: ChartType = 'bar';




  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getNbrAlbumPlatinum();
    this.getNbrAlbumGold();
    this.getNbrAlbumDiamond();
    this.getNbrMusicByCountry();
    this.getNbAlbum();
    this.getNbArtist();
    this.getNbSong();
  }

  getNbrAlbumPlatinum(){
    var get = this.http.get('https://wasabi.i3s.unice.fr/search/award/Platinum');
    get.subscribe((data: any[])=>{
      this.nbrPlatinum = data.length;
      this.pieChartData = [this.nbrPlatinum, this.nbrGold, this.nbrDiamond];
    })
  }

  getNbrAlbumGold(){
    var get = this.http.get('https://wasabi.i3s.unice.fr/search/award/Gold');
    get.subscribe((data: any[])=>{
      this.nbrGold = data.length;
      this.pieChartData = [this.nbrPlatinum, this.nbrGold, this.nbrDiamond];
    })
  }

  getNbrAlbumDiamond(){
    var get = this.http.get('https://wasabi.i3s.unice.fr/search/award/Diamond');
    get.subscribe((data: any[])=>{
      this.nbrDiamond = data.length;
      this.pieChartData = [this.nbrPlatinum, this.nbrGold, this.nbrDiamond];
    })
  }

  getNbrMusicByCountry(){
    var get = this.http.get('https://wasabi.i3s.unice.fr/api/v1/song/lyrics/language/popularity');
    get.subscribe((data: any[])=>{
      for (let i = 0; i < 10; i++) {
        this.nameContries[i] = data[i]._id;
        this.nbrSongByCountry[i] = data[i].sum;
      }
      this.barChartLabels= this.nameContries;
      this.barChartData = [{ data: this.nbrSongByCountry}];
    })
  }

  getNbAlbum(){
    var get = this.http.get('https://wasabi.i3s.unice.fr/api/v1/_stats/album/count');
    get.subscribe((data: any[])=>{
      this.nbAlbum = data[0].value;
      this.pieChartDataNbr = [this.nbAlbum, this.nbArtist, this.nbSong];
    })
  }
  getNbSong(){
    var get = this.http.get('https://wasabi.i3s.unice.fr/api/v1/_stats/song/count');
    get.subscribe((data: any[])=>{
      this.nbSong = data[0].value;
      this.pieChartDataNbr = [this.nbAlbum, this.nbArtist, this.nbSong];
    })
  }
  getNbArtist(){
    var get = this.http.get('https://wasabi.i3s.unice.fr/api/v1/_stats/artist/count');
    get.subscribe((data: any[])=>{
      this.nbArtist = data[0].value;
      this.pieChartDataNbr = [this.nbAlbum, this.nbArtist, this.nbSong];
    })
  }
}
