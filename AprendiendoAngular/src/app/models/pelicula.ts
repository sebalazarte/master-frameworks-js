export class Pelicula{
    // public title: string;
    // public image: string;
    // public year: number;

    // constructor(title, year, image){
    //     this.title = title;
    //     this.year = year;
    //     this.image = image;
    // }

    //lo mismo se puede hacer asi:
    constructor(
        public title: string,
        public year: number,
        public image: string){
    }

    //se debe respetar el orden de los parametros

}