import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ParfumService } from '../services/parfum.service';
import { Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { Parfum } from '../model/parfum.model';
import { GenreWrapper } from '../model/GenreWrapper.model';

@Component({
  selector: 'app-add-parfum',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-parfum.html',
})
export class AddParfum implements OnInit {
  parfumForm!: FormGroup;
  genres: Genre[] = [];
  newParfum = new Parfum();
  message = '';
  err = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private parfumService: ParfumService,
    private router: Router
  ) {}

  
  ngOnInit(): void {
   
    this.parfumForm = this.fb.group({
      idParfum: ['', Validators.required],
      marqueParfum: ['', [Validators.required, Validators.minLength(5)]],
      nomParfum: ['', [Validators.required, Validators.minLength(5)]],
      prixParfum: ['', [Validators.required, Validators.min(1)]],
      contenanceParfum: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idGen: ['', Validators.required]
    });

    this.parfumService.listeGenres()
      .subscribe({
        next: (wrapper: GenreWrapper) => {
          this.genres = wrapper._embedded.genres;
          console.log(this.genres);
        },
        error: err => console.error(err)
      });
  }

  addParfum() {
    if (this.parfumForm.invalid) return;

    const selectedIdGen = this.parfumForm.value.idGen;

    const selectedGenre = this.genres.find(gen => gen.idGen == selectedIdGen);
    if (!selectedGenre) {
      this.err = "Veuillez sélectionner un genre valide";
      return;
    }

    this.newParfum = {
      idParfum: this.parfumForm.value.idParfum,
      marqueParfum: this.parfumForm.value.marqueParfum,
      nomParfum: this.parfumForm.value.nomParfum,
      prixParfum: this.parfumForm.value.prixParfum,
      contenanceParfum: this.parfumForm.value.contenanceParfum,
      email: this.parfumForm.value.email,
      genre: selectedGenre
    };

    this.loading = true;

    this.parfumService.ajouterParfum(this.newParfum)
      .subscribe({
        next: prod => {
          console.log(prod);
          this.message = "Parfum ajouté avec succès !";
          this.loading = false;
          this.router.navigate(['parfums']);
        },
        error: err => {
          console.error(err);
          this.err = "Erreur lors de l'ajout du parfum";
          this.loading = false;
        }
      });
  }
}
