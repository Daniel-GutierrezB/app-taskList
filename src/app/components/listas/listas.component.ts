import { Component, Input, ViewChild } from '@angular/core';
import { Lista } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada: boolean = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) { }

  listaSeleccionada( lista: Lista ) {

    if ( this.terminada ) {
      this.router.navigateByUrl(`/tabs/tab3/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista) {

    this.deseosService.borrarLista(lista);
  }

  async editarLista( lista: Lista ) {

    const alert = await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            if ( data.titulo.lenght === 0) {
              return;
            }

          lista.titulo = data.titulo; 
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }
}
