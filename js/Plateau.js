
class Plateau {
    constructor({ nombreColonnes, nombreLignes, nombreArmes, nombreJoueurs }) {
        this.nombreColonnes = nombreColonnes;
        this.nombreLignes = nombreLignes;
        this.nombreArmes = nombreArmes;
        this.nombreJoueurs = nombreJoueurs;    
        this.cases = [];
        this.joueurs = [];
        this.armes = [];
        this.generateCases();
        this.generateJoueurs();
        this.generateArmes(); 
    }
  
    generateCases() {
        for (let x = 0; x < this.nombreLignes ; x++) {
            for (let y = 0; y < this.nombreColonnes; y++) {
              this.cases.push(new Case({
                x, y, accessible: (Math.random() < 0.12) ? false : true // false = inaccessible = case grise ...true = accesible = case blanche
              }));
            }
        } 
    }
  
    generateJoueurs() {
        for (let i = 0; i < this.nombreJoueurs; i++) {
  
          const caseEncoreAccessibles = this.getAccessibleCases(); // à chaque fois qu'on veux placer un objet, je recherche d'abord les cases encore accessibles
          
          const caseAuHasard = caseEncoreAccessibles[Math.floor(Math.random() * caseEncoreAccessibles.length)];
          const armeParDefaut = armesDuJeu[3];
          this.joueurs.push(new Joueur({
            nom: i,
            x: caseAuHasard.x,
            y: caseAuHasard.y,
            arme: new Arme({
              x: caseAuHasard.x,
              y: caseAuHasard.y,
              type: armeParDefaut.type,
              degats: armeParDefaut.degats,
            }),
          }));
        }
    }
  
    generateArmes() {
        for (let i = 0; i < this.nombreArmes; i++) {
          
          const caseEncoreAccessibles = this.getAccessibleCases(); // à chaque fois qu'on veux placer un objet, je recherche d'abord les cases encore accessibles
          
          const caseAuHasard = caseEncoreAccessibles[Math.floor(Math.random() * caseEncoreAccessibles.length)];
          // 
          
          const armeAuHasard = armesDuJeu[Math.floor(Math.random() * armesDuJeu.length)];
          this.armes.push(new Arme({
            x: caseAuHasard.x,
            y: caseAuHasard.y,
            type: armeAuHasard.type,
            degats: armeAuHasard.degats,
          }));
        }
    }
  
    getAccessibleCases() { 
      // ici, on va retourner les cases du plateau qui sont accessibles, 
      // sur lesquelles il n'y a pas d'armes
      // sur lesquelles il n'y a pas de joueur
      
      return this.cases.filter( // Cette méthode permet de filtrer un ensemble d'élément du tableau qui correspondent à ce que l'on cherche
        (_case) => {
          if (_case.accessible === false) { // la case n'est pas accessible, je la sort de mon tableau
            return false;
          }
          // Maintenant, on cherche s'il existe une arme sur cette case
          const armeExists = this.armes.some( // Cette méthode renvoie true si au moins un des éléments correspond
            (arme) => {
              return arme.x === _case.x && arme.y === _case.y; 
              // Donc si une arme est à la meme position que ma case
              // Ma case ne peut pas être utilisée pour placer un autre élément
            }
          )
          if (armeExists) {
            return false;
          }
          // maintent, on cherche si un des joueurs est placé sur cette case
          const joueurExists = this.joueurs.some( // Cette méthode renvoie true si au moins un des éléments correspond
            (joueur) => {
              const distanceEuclidienne = Math.sqrt((joueur.x - _case.x)**2 + (joueur.y - _case.y)**2);
              return joueur.x === _case.x && joueur.y === _case.y && distanceEuclidienne <= 2; 
              // Donc si une arme est à la meme position que ma case
              // Ma case ne peut pas être utilisée pour placer un autre élément
            }
          )
          if (joueurExists) {
            return false;
          }
          
          // Maintenant, comme la case est accessible, qu'aucune arme n'est dessus, et qu'aucun joueur n'est dessus, je peux utiliser ma case
          return true;
        }
      );
      
    }
    
    getObjectAt({x, y}) { // recupère l'objet à la position, pour voir si il y a une arme ou une case a cet endroit
      const arme = this.armes.find((arme) => arme.x === x && arme.y === y);
      if (arme) return arme;
      const _case = this.cases.find((_case) => _case.x === x && _case.y === y); // find = rechercher des un tableau un element qui correspond à la condition qui passe après
      return _case;
    }
}