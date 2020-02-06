let jeu = undefined;
 
let armesDuJeu = [
  {type: "bazooka", degats: 50},
  {type: "beretta", degats: 30},
  {type: "chatouilles", degats: 20},
  {type: "blague_carambar", degats: 10},
];
  
class Positionnable {
  constructor({x, y}) {
      this.x = x;
      this.y = y;
  }
}

class Case extends Positionnable { 
  constructor({x, y, accessible, type}) {
    super({x, y}) 
    this.accessible = accessible;
    this.type = type;
  }
}

class Movable extends Positionnable {
  moveLeft(){
    this.x -=1;
  }

  moveRight(){
    this.x +=1;
  }

  moveTop(){
    this.y -=1;
  }

  moveBottom(){
    this.y +=1;
  }
}

$(document).ready(function(){
  $('#commencer').on('click', function(){
    jeu = new Jeu; 
  });
})

/*
Le jQuery remplace la ligne de code suivante :

document.getElementById("commencer").addEventListener("click", function(){
  jeu = new Jeu; 
});
*/