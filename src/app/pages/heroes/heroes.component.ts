import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  cargando = false;
  noRegistro = true;
  heroes: HeroeModel[] = [];
  constructor(private heroesService:HeroesService  ) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes()
    .subscribe(resp => {
      console.log(resp)
      if(resp.length == 0) {
  
        this.noRegistro = true;
      } else {

        this.noRegistro = false;
      }
      this.heroes = resp;
      this.cargando = false;
    })
  }
  borrar(heroe, i:number){

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp => {

      if(resp.value) {

       this.heroes.splice(i,1);
       this.heroesService.deleteHeroe(heroe.id).subscribe(resp => console.log(resp));

      }

    })

    
  }

}
