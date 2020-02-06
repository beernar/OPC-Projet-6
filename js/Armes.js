class Arme extends Positionnable {
    constructor({x, y, type, degats}) {
      super({x, y}) // appel à des fonction definies sur l'objet parent (Positionnable)
      this.type = type;
      this.degats = degats;
    }
    
    replace({type, degats}) {
       this.type = type;
       this.degats = degats;
    }
}