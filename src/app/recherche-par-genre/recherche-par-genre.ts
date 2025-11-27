import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { ParfumService } from '../services/parfum.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Genre } from '../model/genre.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-recherche-par-genre',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './recherche-par-genre.html',
  styles: ``
})
export class RechercheParGenre implements OnInit{
  parfums? :Parfum[];
  genres ?:Genre[];
  IdGenre? :any;
  constructor(private parfumService:ParfumService){}
   
  
 ngOnInit(): void {
  this.parfumService.listeGenres()
    .subscribe(gens =>
       {this.genres = gens._embedded.genres; console.log(gens); });
       this.parfums = [];
  }

  

  onChange() {
    console.log(this.IdGenre);
    this.parfums=this.parfumService.rechercherParGenre(this.IdGenre);
  
  }
  supprimerParfum(parf:Parfum){
  let conf=confirm("Etes-vous sur?");
  if(conf){
  this.parfumService.supprimerParfum(parf.idParfum!);
  this.parfums=this.parfumService.rechercherParGenre(this.IdGenre);
}
}
}
