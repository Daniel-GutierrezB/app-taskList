import { Component, OnInit , ViewChild} from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { Tarea } from '../../models/tareas.model';
import { AlertController, IonList } from '@ionic/angular';
import { ListaItem } from '../../../../../05-deseos-test/src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreTarea: string = '';

  @ViewChild( 'tarea' ) tarea: IonList;
  constructor(private deseosService: DeseosService,
              private route: ActivatedRoute,
              private alertCtrl: AlertController) {


    const listaId = this.route.snapshot.paramMap.get('listaId');

    this.lista = this.deseosService.obtenerLista( listaId );
  }

  ngOnInit() {
  }

  agregarTarea() {

    if (this.nombreTarea.length === 0) {
      return;
    }

    const nuevaTarea = new Tarea(this.nombreTarea);
    this.lista.items.push(nuevaTarea);

    this.nombreTarea = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck( tarea: Tarea ) {

    const pendientes = this.lista.items
                            .filter( itemData => !itemData.completado)
                            .length;

    if( pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }

    this.deseosService.guardarStorage();
  }

  async editarTarea( tarea: ListaItem ) {

    const alert = await this.alertCtrl.create({
      header: 'Editar Tarea',
      inputs: [
        {
          name: 'descripcion',
          type: 'text',
          value: tarea.desc,
          placeholder: 'Nombre de la tarea'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.tarea.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            if ( data.descripcion.lenght === 0) {
              return;
            }
          tarea.desc = data.descripcion; 
          this.deseosService.guardarStorage();
          this.tarea.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }

  borrar(i: number) {

    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }

}
