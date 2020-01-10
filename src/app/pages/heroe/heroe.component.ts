import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import  Swal  from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();


  constructor(private heroeService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroeService.getHeroe(id)
      .subscribe((resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
          console.log(this.heroe)
        })
    
    }
    console.log(id);
  }

  guardar(form:NgForm) {

    if(form.invalid) {
      return
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    if (this.heroe.id) {
      this.heroeService.putHeroe(this.heroe)
          .subscribe(resp => {
            console.log(resp);
            console.log('actualizo');
          })

          Swal.fire({
            title:this.heroe.nombre,
            text: 'Se actualizó correctamente',
            icon: 'success'
          })


    } else {
      this.heroeService.crearHeroe(this.heroe)
      .subscribe(resp => {
        console.log(resp);
      })

      Swal.fire({
        title:this.heroe.nombre,
        text: 'Se creó correctamente',
        icon: 'success'
      })

    }
   


  }

}
