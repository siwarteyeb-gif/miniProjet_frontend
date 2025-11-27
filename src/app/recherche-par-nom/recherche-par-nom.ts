import { Component, OnInit } from '@angular/core';
import { ParfumService } from '../services/parfum.service';
import { Parfum } from '../model/parfum.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from '../search-filter-pipe';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [FormsModule,CommonModule,SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit{
  nomParfum!:String;
  parfums!:Parfum[];
  allParfums!:Parfum[];
  searchTerm!:string;
  constructor(private parfumService:ParfumService){
    
  }
  ngOnInit(): void {
  //this.allParfums = this.parfumService.listeParfum();
  this.parfums = this.allParfums;
}
  // rechercherParfs(){
  //   this.parfumService.rechercherParNom(this.nomParfum).
  //   subscribe(parfs =>{
  //     console.log(parfs);
  //     this.parfums=parfs;
  //   })
  // }
  onKeyUp(filterText: string): void {
  this.parfums = this.allParfums.filter(item =>
    item.nomParfum?.toLowerCase().includes(filterText.toLowerCase())
  );
}


}
