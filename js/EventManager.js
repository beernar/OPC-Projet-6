
class EventManager {
    
    static EVENTS = {
        ON_LEFT : 37,
        ON_RIGHT : 39,
        ON_TOP : 38,
        ON_BOTTOM : 40,
        ON_ATTACK : 17, // Control
        ON_DEFENSE : 32, // espace
        ON_START : 13 // entrer
    }
  
    constructor() {
        this._onLeft = []; // Stock toutes les fonctions qui vont être exécutées 
                           // lors d'une action vers la gauche
        this._onRight = []; // Stock toutes les fonctions qui vont être exécutées 
                            // lors d'une action vers la droite
        this._onTop = []; // Stock toutes les fonctions qui vont être exécutées 
                          // lors d'une action vers le haut
        this._onBottom = []; // Stock toutes les fonctions qui vont être exécutées 
                            // lors d'une action vers le bas
        this._onAttack = []; // Stock toutes les fonctions qui vont être exécutées 
                            // lors d'une action d'attaque
        this._onDefense = []; // Stock toutes les fonctions qui vont être exécutées 
                            // lors d'une action de défense
        this._onStart = []; // Stock toutes les fonctions qui vont être exécutées 
                            // lors d'une action de demarrage
        this.init();
    }
    init() {
        // Ici, on implémente les évènements
        window.addEventListener("keydown", evt => { // On attache l'event keydown à la fenêtre
            if (evt.keyCode === EventManager.EVENTS.ON_LEFT) { // On vérifie le code le l'évènement 
                this._onLeft.forEach(f => { // On boucle sur toutes les fonctions stockées dans le listener _onLeft
                    if (typeof f === "function") { // On vérifie que c'est bien une fonction
                        f() // On exécute cette fonction (d'aller à gauche pour ici)
                    }
                });
            }
            if (evt.keyCode === EventManager.EVENTS.ON_RIGHT) {  
                this._onRight.forEach(f => { 
                    if (typeof f === "function") { 
                        f(); 
                    }
                });
            }
            if (evt.keyCode === EventManager.EVENTS.ON_TOP) {  
              this._onTop.forEach(f => { 
                  if (typeof f === "function") { 
                      f();
                  }
              });
            }
            if (evt.keyCode === EventManager.EVENTS.ON_BOTTOM) {  
              this._onBottom.forEach(f => { 
                  if (typeof f === "function") { 
                      f(); 
                  }
              });
            }
            if (evt.keyCode === EventManager.EVENTS.ON_ATTACK) {  
              this._onAttack.forEach(f => { 
                  if (typeof f === "function") { 
                      f(); 
                  }
              });
            }
            if (evt.keyCode === EventManager.EVENTS.ON_DEFENSE) {  
              this._onDefense.forEach(f => { 
                  if (typeof f === "function") {
                      f(); 
                  }
              });
            }
            if (evt.keyCode === EventManager.EVENTS.ON_START) {  
              this._onStart.forEach(f => { 
                  if (typeof f === "function") { 
                      f(); 
                  }
              });
            }
        })
    }
    onLeft(f) {
        // Cette méthode recoit un paramètre qui est une fonction
        // et l'ajoute dans le tableau this._onLeft
        if (typeof f === "function") {
            this._onLeft.push(f);// ajoute une fonction dans mon listner
        }
    }
    onRight(f) {
      if (typeof f === "function") {
        this._onRight.push(f);
      }
    }
    onTop(f) {
      if (typeof f === "function") {
        this._onTop.push(f);
      }
    }
    onBottom(f) {
      if (typeof f === "function") {
        this._onBottom.push(f);
      }
    }
    onAttack(f) {
      if (typeof f === "function") {
        this._onAttack.push(f);
      }
    }
    onDefense(f) {
      if (typeof f === "function") {
        this._onDefense.push(f);
      }
    }
    onStart(f) {
      if (typeof f === "function") {
        this._onStart.push(f);
      }
    }
}