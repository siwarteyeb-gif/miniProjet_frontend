import { Component, OnInit } from '@angular/core';
import { ParfumService } from '../services/parfum.service';
import { Genre } from '../model/genre.model';
import { UpdateGenre } from '../update-genre/update-genre';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-genres',
  imports: [CommonModule, UpdateGenre],
  templateUrl: './liste-genres.html',
  styles: ``
})
export class ListeGenres implements OnInit {

  genres!: Genre[];
  updatedGen: Genre = { idGen: 0, nomGen: "" }; 
  ajout: boolean = true;

  constructor(private parfumService: ParfumService) {}

  ngOnInit(): void {
  this.parfumService.listeGenres()
    .subscribe(gens => {
      this.genres = gens._embedded.genres; console.log(gens); });
      
   
}

chargerGenres() {
  this.parfumService.listeGenres()
    .subscribe(gens =>
       {this.genres = gens._embedded.genres; console.log(gens); }); }
   
   
  getNewId(): number {
    if (this.genres.length === 0) return 1;
    const maxId = Math.max(...this.genres.map(g => g.idGen));
    return maxId + 1;
  }
    
  updateGen(gen: Genre) {
    this.updatedGen = { ...gen };
    this.ajout = false;
  }

 
   
  genreUpdated(gen: Genre) {
  if (this.ajout) {
    gen.idGen = this.getNewId();
    this.parfumService.ajouterGenre(gen);
  } else {

    gen.idGen = this.updatedGen.idGen;
    this.parfumService.updateGenre(gen);
  }

  this.chargerGenres();
  this.ajout = true;
  this.updatedGen = { idGen: 0, nomGen: "" };
}
}
