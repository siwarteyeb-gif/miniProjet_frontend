import { Component , OnInit} from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { ParfumService } from '../services/parfum.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-parfums',
  imports: [CommonModule,RouterLink],
  templateUrl: './parfums.html'
})
export class Parfums implements OnInit {
  parfums! : Parfum[];

  constructor(private parfumService:ParfumService,
    public authService: Auth
  ) { 
    //this.parfums=this.parfumService.listeParfum();
   }
   
  ngOnInit(): void { 
    this.chargerParfums(); 
  } 
  chargerParfums(){ 
    this.parfumService.listeParfum().subscribe(prods => { 
      console.log(prods); 
      this.parfums = prods; 
    });  
  }
 supprimerParfum(p: Parfum) 
    { 
      let conf = confirm("Etes-vous sûr ?"); 
      if (conf) 
      this.parfumService.supprimerParfum(p.idParfum!).subscribe(() => { 
        console.log("produit supprimé"); 
        this.chargerParfums(); 
           }); 
    }  
}
