class Jeu {  
    constructor() {
      this.plateau = new Plateau({
        nombreColonnes: 10,
        nombreLignes: 10,
        nombreArmes: 4,
        nombreJoueurs: 2
      });
      this.currentJoueur = 0;
      this.nbStep = 0;
      this.fightIsStarted = false;
      
      this.eventManager = new EventManager(); //on a instancié l'eventManager qui gere la diffusion des evennements
  
      this.eventManager.onLeft(() => {
        if (this.fightIsStarted) {
          return; // donc on ne peu plus bouger
        }
        this.plateau.joueurs[this.currentJoueur].moveLeft(); 
        
        /// getObjectAt récupère l'objet à la position x, y de mon joueur
        const newCase = this.plateau.getObjectAt(this.plateau.joueurs[this.currentJoueur]);
        // Si il n'y aucun objet, getObjectAt retourne false
        // Dans ce cas, je repositionne mon joueur à sa position initiale
        if (!newCase) {this.plateau.joueurs[this.currentJoueur].moveRight();
        // La case est pas accessible, donc je repositionne mon joueur
        this.nbStep  -= 1};
        if (newCase instanceof Case && !newCase.accessible) { // instanceof = pour verifier le type
          this.plateau.joueurs[this.currentJoueur].moveRight();
          this.nbStep  -= 1;
        }
        // L'objet retourne est de type Arme, donc
        // Je vais utiliser les propriétés de l'objet retourné pour recréer une Arme
        // Et équiper mon joueur avec cette nouvelle arme
        if (newCase instanceof Arme) {
          const newArme = new Arme({x: newCase.x, y: newCase.y, degats: newCase.degats, type: newCase.type});
          newCase.replace({...this.plateau.joueurs[this.currentJoueur].arme});//... spread operator : deconstruit un premier objet dans un second
          
          this.plateau.joueurs[this.currentJoueur].equiperArme(newArme);
        }
        this.nbStep += 1;
        if (this.nbStep > 2) {
          this.switchJoueur();
        }
        this.shouldStartFight();
        this.display();  // >>>>>>>>>>>>>>>>>>  a bien comprendre
      });
  
      this.eventManager.onRight(() => {
        if (this.fightIsStarted) {
          return;
        }
        this.plateau.joueurs[this.currentJoueur].moveRight(); 
        const newCase = this.plateau.getObjectAt(this.plateau.joueurs[this.currentJoueur]);
        if (!newCase) {this.plateau.joueurs[this.currentJoueur].moveLeft();
        this.nbStep  -= 1};
  
        if (newCase instanceof Case && !newCase.accessible) {
          this.plateau.joueurs[this.currentJoueur].moveLeft();
          this.nbStep  -= 1;
        }
        if (newCase instanceof Arme) {
          const newArme = new Arme({x: newCase.x, y: newCase.y, degats: newCase.degats, type: newCase.type});
          newCase.replace({...this.plateau.joueurs[this.currentJoueur].arme});
          
          this.plateau.joueurs[this.currentJoueur].equiperArme(newArme);
        }
        this.nbStep += 1;
        if (this.nbStep > 2) {
          this.switchJoueur();
        }
        this.shouldStartFight();
        this.display();  
      })
  
      this.eventManager.onTop(() => {
        if (this.fightIsStarted) {
          return;
        }
        this.plateau.joueurs[this.currentJoueur].moveTop(); 
        const newCase = this.plateau.getObjectAt(this.plateau.joueurs[this.currentJoueur]);
        if (!newCase) {this.plateau.joueurs[this.currentJoueur].moveBottom();
        this.nbStep  -= 1};
  
        if (newCase instanceof Case && !newCase.accessible) {
          this.plateau.joueurs[this.currentJoueur].moveBottom();
          this.nbStep  -= 1;
        }
        if (newCase instanceof Arme) {
          const newArme = new Arme({x: newCase.x, y: newCase.y, degats: newCase.degats, type: newCase.type});
          newCase.replace({...this.plateau.joueurs[this.currentJoueur].arme});
          
          this.plateau.joueurs[this.currentJoueur].equiperArme(newArme);
        }
        this.nbStep += 1;
        if (this.nbStep > 2) {
          this.switchJoueur();
        }
        this.shouldStartFight();
        this.display();  
      });
  
      this.eventManager.onBottom(() => {
        if (this.fightIsStarted) {
          return;
        }
        this.plateau.joueurs[this.currentJoueur].moveBottom(); 
        const newCase = this.plateau.getObjectAt(this.plateau.joueurs[this.currentJoueur]);
        if (!newCase) {this.plateau.joueurs[this.currentJoueur].moveTop();
        this.nbStep  -= 1};
  
        if (newCase instanceof Case && !newCase.accessible) {
          this.plateau.joueurs[this.currentJoueur].moveTop();
          this.nbStep  -= 1;
        }
        if (newCase instanceof Arme) {
          const newArme = new Arme({x: newCase.x, y: newCase.y, degats: newCase.degats, type: newCase.type});
          newCase.replace({...this.plateau.joueurs[this.currentJoueur].arme});
          
          this.plateau.joueurs[this.currentJoueur].equiperArme(newArme);
        }
        this.nbStep += 1;
        if (this.nbStep > 2) {
          this.switchJoueur();
        }
        this.shouldStartFight();
        this.display();  
      });
      // On attache le bouton attack
      this.eventManager.onAttack(() => {
      
        let joueurPassif;
        if (this.fightIsStarted) { // Si le combat est commencer
          // Alors j'exécute ce qui est ci dessous
          if(this.currentJoueur === 0) {
            joueurPassif = this.plateau.joueurs[1];
          } else {
            joueurPassif = this.plateau.joueurs[0];
          }
  
          if(joueurPassif.modeDefense){
            joueurPassif.vie = joueurPassif.vie - Math.round(this.plateau.joueurs[this.currentJoueur].arme.degats /2); //Math.round retourne la valeur d'un nombre arrondie à l'entier le plus proche
            joueurPassif.modeDefense = false; 
          } else {
            joueurPassif.vie = joueurPassif.vie - this.plateau.joueurs[this.currentJoueur].arme.degats;
          }
          this.switchJoueur();
          this.display(); //rafraichir l'affichage
          this.shouldEndGame();
        }
      });
  
      this.eventManager.onDefense(() => {
  
        if (this.fightIsStarted) { 
          this.plateau.joueurs[this.currentJoueur].modeDefense = true; //met le joueur en mode défense
          this.switchJoueur();
          this.display();
          this.shouldEndGame();
        }
      });
  
      this.shouldStartFight(); //verifi que les joueurs ne se retrouve pas cote à cote.
      this.view = new PlateauView();
      this.display();
    }
    
    switchJoueur() {
      this.nbStep = 0;
      if (this.currentJoueur === 0) {
        this.currentJoueur = 1;
      } else {
        this.currentJoueur = 0;
      }
    }
    
    shouldStartFight() {
      const joueur1 = this.plateau.joueurs[0];
      const joueur2 = this.plateau.joueurs[1];
      // Formule distance entre deux points dans un plan euclidien
      const distanceEuclidienne = Math.sqrt((joueur1.x - joueur2.x)**2 + (joueur1.y - joueur2.y)**2);
      if (distanceEuclidienne <= 1) {
        this.startFighting();
      }
    }
    
    startFighting() {
      this.fightIsStarted = true;
    }
    
    shouldEndGame() {
      if (this.plateau.joueurs[0].vie === 0 || this.plateau.joueurs[1].vie === 0) {
  
        let winnerAnnouncementElement = document.createElement("h1");
        let winnerElement = document.createElement("img");
        winnerElement.id = "imgWinner";
      
        if (this.plateau.joueurs[1].vie === 0){
          winnerElement.src = "../images/joueur1Gde.jpg";
          winnerAnnouncementElement.textContent = "Le joueur 1 à gagné !";
        } else {
          winnerElement.src = "../images/joueur2Gde.jpg";
          winnerAnnouncementElement.textContent = "Le joueur 2 à gagné !";
        }
        document.getElementById("jeu").innerHTML = "";
        document.getElementById("jeu").appendChild(winnerElement);
        document.getElementById("jeu").insertBefore(winnerAnnouncementElement, winnerElement);
      
      } else {
        return false;
      }
    }
  
    display() { // méthode qui rafraichit l'affichage
      document.getElementById("jeu").innerHTML = "";
      document.getElementById("jeu").appendChild(this.view.render(this.plateau));
      
      const progressElementJoueur1 = document.getElementById("vieJoueur1");
      if(progressElementJoueur1) {
        progressElementJoueur1.value = this.plateau.joueurs[0].vie;
      }
      const progressElementJoueur2 = document.getElementById("vieJoueur2");
      if(progressElementJoueur2) {
        progressElementJoueur2.value = this.plateau.joueurs[1].vie;
      }

      const currentArmeImg1 = document.createElement("img");
      currentArmeImg1.src = "../images/" + this.plateau.joueurs[0].arme.type + "Moy.jpg";
      document.getElementById("armeJ1").innerHTML = "";
      document.getElementById("armeJ1").appendChild(currentArmeImg1);
      const currentArmeImg2 = document.createElement("img");
      currentArmeImg2.src = "../images/" + this.plateau.joueurs[1].arme.type + "Moy.jpg";
      document.getElementById("armeJ2").innerHTML = "";
      document.getElementById("armeJ2").appendChild(currentArmeImg2);
       
    }
}
  