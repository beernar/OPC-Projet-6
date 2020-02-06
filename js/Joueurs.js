class Joueur extends Movable {
    constructor({x, y, nom, position, arme}) { 
      super({x, y}) 
          this.nom = nom;
          this.position = position;
          this.vie = 100;
          this.modeDefense = false;
          this.arme = arme;
    }
          
    equiperArme(arme) { 
        this.arme = arme;
    }

    deplacer(nouvellePosition) {  
        this.position = nouvellePosition;
    }

    defendre() {
    this.modeDefense = true;
    }
}