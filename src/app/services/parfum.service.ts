
import { Parfum } from '../model/parfum.model';
import { Genre } from '../model/genre.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenreWrapper } from '../model/GenreWrapper.model';
const httpOptions = { 
headers: new HttpHeaders( {'Content-Type': 'application/json'} ) 
};
@Injectable({
  providedIn:'root'
})
export class ParfumService {
    apiURL: string = 'http://localhost:8894/parfums/api'; 
    apiURLGen: string = 'http://localhost:8894/parfums/gen';
  parfums! : Parfum[];
  parfum=new Parfum();
  genres! : Genre[];
  genre=new Genre();
  parfumRechercher?:Parfum[];

  constructor(private http : HttpClient){
    /* this.genres = [ {idGen : 1, nomGen : "Boisé épicé"},
   {idGen : 2, nomGen : "Floral aromatique"},
  {idGen : 3, nomGen : "Oriental gourmand"},
 {idGen : 4, nomGen : "Aromatique"}, 
];   */

   // console.log("creation du service produit!");
   /*  this.parfums = [
      {idParfum:1,marqueParfum:"Hermès",nomParfum:"Terre d’Hermès",prixParfum:350,contenanceParfum:"50 ml",email: "hermes@parfum.com",genre:{idGen : 1, nomGen : "Boisé épicé"}},
      {idParfum:2, marqueParfum: "Yves Saint Laurent",nomParfum: "Libre",prixParfum: 370,contenanceParfum: "50 ml",email:"libre@ysl.com",genre:{idGen : 2, nomGen : "Floral aromatique"}},
      {idParfum:3,marqueParfum: "Yves Saint Laurent",nomParfum: "Black Opium",prixParfum: 400,contenanceParfum: "50 ml", email:"blackopium@ysl.com",genre:{idGen : 3, nomGen : "Oriental gourmand"}}

    ]; */ 
  }
  listeParfum(): Observable<Parfum[]>{ 
    return this.http.get<Parfum[]>(this.apiURL); 
  }
   ajouterParfum( prod: Parfum):Observable<Parfum>{ 
      return this.http.post<Parfum>(this.apiURL, prod, httpOptions); 
    } 
  supprimerParfum(id : number) { 
     const url = `${this.apiURL}/${id}`; 
      return this.http.delete(url, httpOptions); 
          } 
  consulterParfum(id: number): Observable<Parfum> { 
const url = `${this.apiURL}/${id}`; 
return this.http.get<Parfum>(url); 
} 
  updateParfum(prod :Parfum) : Observable<Parfum> 
{   
return this.http.put<Parfum>(this.apiURL, prod, httpOptions); 
} 
   listeGenres():Observable<GenreWrapper>{
return this.http.get<GenreWrapper>(this.apiURLGen);
}
consulterGenre(id:number): Genre{
return this.genres.find(cat => cat.idGen == id)!;
}
rechercherParGenre(idGen: number):Parfum[] {
 this.parfumRechercher=[];
  this.parfums.forEach((cur,index)=>{
     if(idGen==cur.genre.idGen){
      console.log("cur"+cur);
       this.parfumRechercher?.push(cur);
    }
  });
  return this.parfumRechercher;
 }
 ajouterGenre(gen: Genre) {
  this.genres.push(gen);
}
updateGenre(gen: Genre) {
    const index = this.genres.findIndex(g => g.idGen === gen.idGen);
    if (index !== -1) {
      this.genres[index] = gen;
    }
  }
}
