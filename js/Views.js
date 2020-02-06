class View {
    //Cette méthode est appeler à chaque changement dans le jeux
    //On modifie l'affichage
    render() { //génère et retourne
    }
}
  
class CaseView {
    render(_case) {
        const _caseElement = document.createElement("div");
        _caseElement.setAttribute("class", _case.accessible ? "Case" : "Case Unable");
        return _caseElement;
    }
}

class ArmeView {
    render(arme) {
        const armeElement = document.createElement("div");
        //let armeClass = "Arme";
        //armeClass += arme.type;
        armeElement.setAttribute("class", "Arme");
        if (arme.type == "bazooka") {
        armeElement.setAttribute("class", "Arme bazooka");
        } else if (arme.type == "beretta"){
        armeElement.setAttribute("class", "Arme beretta");
        }else if (arme.type == "chatouilles"){
        armeElement.setAttribute("class", "Arme chatouilles");
        }else if (arme.type == "blague_carambar"){
        armeElement.setAttribute("class", "Arme blague_carambar");
        }
        return armeElement;
    }
}  

class JoueurView {
    render(joueur) {
        const joueurElement = document.createElement("div");
        joueurElement.setAttribute("class", "Joueur");
        if (joueur.nom == 0){
        joueurElement.setAttribute("class", "Joueur joueur1");
        } else {
        joueurElement.setAttribute("class", "Joueur joueur2");
        }
        return joueurElement;
    }
}  

class PlateauView {
    render(plateau) {
        const tableElement = document.createElement("table");
        for (let i = 0; i < plateau.nombreLignes; i++) {
        const ligneElement = document.createElement("tr");
        for (let c = 0; c < plateau.nombreColonnes; c++) {
            const caseElement = document.createElement("td");
            
            const _case = plateau.cases.find((_case) => _case.x === c && _case.y === i );
            
            if (_case) {
            const caseView = new CaseView();
            caseElement.appendChild(caseView.render(_case));
            }
            
            const arme = plateau.armes.find((arme) => arme.x === c && arme.y === i);
            
            if (arme) {
            const armeView = new ArmeView();
            caseElement.appendChild(armeView.render(arme));
            }

            const joueur = plateau.joueurs.find((joueur) => joueur.x === c && joueur.y === i);

            if (joueur) {
            const joueurView = new JoueurView();
            caseElement.appendChild(joueurView.render(joueur));
            }
            
            ligneElement.appendChild(caseElement);
        }
        tableElement.appendChild(ligneElement);
        }
        return tableElement;
    }
}