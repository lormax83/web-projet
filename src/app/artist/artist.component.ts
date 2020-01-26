import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ChartType, ChartDataSets  } from 'chart.js';
import { Label, Color, } from 'ng2-charts';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  nbrAlbums:number = 0;
  nbrSongs:number = 0;
  listAlbums:any[] = [];
  listFans:any[] = [];
  listNom :any[] = [];
  listDate : any[] =[];
  astro : string;
  astroNom : string;

  public chartLegend = false;
  public chartPlugins = [];
  public chartColors = [
    {
      backgroundColor: ['rgb(0,0,255)', 'rgb(51, 153, 255)', 'rgb(192, 192, 192)'],
    },
  ];


  public lineChartLabels: Label[] =this.listNom;
  public lineChartData: ChartDataSets[] = [{ data: this.listFans, label: '' }]
  public lineChartType: ChartType = 'line';
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(51, 153, 255,0.2)',
      borderColor: 'rgba(51, 153, 255,1)',
      pointBackgroundColor: 'rgba(0,0,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,255,0.8)'
    }];

    public barChartLabels: Label[] = this.listNom;
    public barChartType: ChartType = 'bar';
    public barChartData: ChartDataSets[] = [
      { data: this.listDate, label: 'Date' }
    ];

  constructor(private http:HttpClient,private route: ActivatedRoute,) { }
  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    var get = this.http.get('https://wasabi.i3s.unice.fr/api/v1/artist/name/'+id);
    get.subscribe((data: any[])=>{
      this.getInfo(data);

    })

  }

  getInfo(id){
    this.raz();
    var id = id._id;
    var get = this.http.get('https://wasabi.i3s.unice.fr/api/v1/artist_all/id/'+id);
    get.subscribe((data: any)=>{
      this.nbrAlbums = data.albums.length;
      this.getAstro(data);
      for (let i = 0; i < data.albums.length; i++) {
        this.nbrSongs = this.nbrSongs + data.albums[i].songs.length
        if (data.albums[i].cover) {
          this.listAlbums.push(data.albums[i]);
        }
      }
      this.getFanAlbum(this.listAlbums);
      this.getDateAlbum(this.listAlbums);
    })
    
  }

  getFanAlbum(listAlbums){
    for (let i = 0; i < listAlbums.length; i++) {
      this.listFans.push(listAlbums[i].deezerFans);
      this.listNom.push(listAlbums[i].title);
    }
  }
  getDateAlbum(listAlbums){
    for (let i = 0; i < listAlbums.length; i++) {
      if(listAlbums[i].publicationDate != 0){
        this.listDate.push(listAlbums[i].publicationDate);
      }
      
    }
  }
  getAstro(data){
    
    this.astro = data.lifeSpan.begin;
    this.astroNom = "";
    var parts = this.astro.split('-');
    var month = parts[1];
    console.log(month);
    switch (month) {
      case "01":
        this.astroNom = "Verseau"
      break;
      case "02":
        this.astroNom = "Verseau"
      break;
      case "03":
        this.astroNom = "Poisson"
      break;
      case "04":
        this.astroNom = "Bélier"
      break;
      case "05":
        this.astroNom = "Gémeaux"
      break;
      case "06":
        this.astroNom = "Cancer"
      break;
      case "07":
        this.astroNom = "Lion"
      break;
      case "08":
        this.astroNom = "Vierge"
      break;
      case "09":
        this.astroNom = "Balance"
      break;
      case "10":
        this.astroNom = "Scorpion"
      break;
      case "11":
        this.astroNom = "Sagitaire"
      break;
      case "12":
        this.astroNom = "Capricorn"
      break;
    
      default:
        break;
    }
    console.log(this.astroNom)
  }
  raz(){
    this.nbrAlbums = 0;
    this.nbrSongs = 0;
  }

}
