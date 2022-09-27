import { Tarea } from './tareas.model';


export class Lista {

    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn: Date;
    completada: boolean;
    items: Tarea[];

    constructor( titulo: string ) {

        this.titulo = titulo;

        this.creadaEn = new Date();
        this.completada = false;
        this.items = [];

        this.id = new Date().getTime();
    }
}