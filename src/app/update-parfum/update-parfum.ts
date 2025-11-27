import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParfumService } from '../services/parfum.service';
import { Parfum } from '../model/parfum.model';
import { Genre } from '../model/genre.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-parfum',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-parfum.html',
  styles: ``
})
export class UpdateParfum implements OnInit {

  currentParfum = new Parfum();
  genres!: Genre[];
  updatedGenId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private parfumService: ParfumService
  ) {}

  ngOnInit(): void {
this.parfumService.listeGenres().
subscribe(gens => {console.log(gens);
this.genres = gens._embedded.genres;
}
);
this.parfumService.consulterParfum(this.activatedRoute.snapshot.params['id']).
subscribe( prod =>{ this.currentParfum = prod;
this.updatedGenId = this.currentParfum.genre.idGen;
} ) ;
}

 updateParfum() { 
this.currentParfum.genre = this.genres. 
find(cat => cat.idGen == this.updatedGenId)!; 
this.parfumService.updateParfum(this.currentParfum).subscribe(prod => { 
this.router.navigate(['parfums']); } 
); 
} 
}
