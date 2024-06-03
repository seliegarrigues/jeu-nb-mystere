//Ajouter des variables pour stocker les données

let randomNumber = Math.floor(Math.random() * 100) + 1; // Générer un nombre aléatoire entre 1 et 100.

let nbSuggere = document.querySelector(".nbSuggere"); //stocker une référence aux paragraphes de résultats dans le HTML 
let resultatFinal = document.querySelector(".resultatFinal"); //pour insérer des valeurs dans les paragraphes plus tard dans le code
let plusPetitOuPlusGrand = document.querySelector(".plusPetitOuPlusGrand");

//écouter l'envoi de la suggestion (guess) plus tard.
let cParti = document.querySelector(".cParti"); //stockent des références au champ de saisie du formulaire 
let suggestion = document.querySelector(".suggestion"); // et au bouton de soumission

//variables stockent un nombre de suggestions
let guessCount = 1; // suggestion qui vaut initialement 1
let resetButton; // référence à un bouton de réinitialisation
suggestion.focus();

function checkGuess(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  //déclare une variable nommée userGuess 
  //et définit sa valeur par celle qui vient d'être saisie dans le champ de texte
  let userGuess = Number(suggestion.value); // méthode Number() ,pour que la valeur stockée dans userGuess soit bien un nombre.

  //bloc conditionnel commence par le mot clé if
  if (guessCount === 1) { // test si la variable guessCount est égale à 1 si true 
    //=> execution du code suivant (si false => bloc suivant)
    nbSuggere.textContent = "Propositions précédentes;: "; //  Dans les accolades est placé tout le code à exécuter à chaque appel de la fonction.
  }
  //ajoute la valeur courante userGuess à la fin du paragraphe nbSuggere + un espace
  nbSuggere.textContent += userGuess + " ";

  //vérifie si la suggestion saisie est égale au nb aléatoire randomNumber 
  //situé en haut de notre code JavaScript
  if (userGuess === randomNumber) {

    // si true =>le joueur a deviné correctement et a gagné le jeu
    resultatFinal.textContent = "Gagné, vous avez trouvé le nombre !";// affichage message de Gagné 
    resultatFinal.style.backgroundColor = "green"; //d'une belle couleur verte au joueur,
    plusPetitOuPlusGrand.textContent = ""; //  contenu effacé 
    setGameOver();// exécution de la fonction appelée setGameOver()

    //vérifie si l'utilisateur a épuisé toutes ses tentatives
  } else if (guessCount === 10) {
    //Si true => execution du programme du bloc précédent, mais avec un message de fin de partie
    resultatFinal.textContent = "!!! Perdu, fin de la partie !!!";
    setGameOver(); 

    //n'est exécuté que si le joueur n'a pas deviné juste et qu'il lui reste des tours
  } else {
    resultatFinal.textContent = "Essayez à nouveau!"; // affichage de l'action à mener
    resultatFinal.style.backgroundColor = "red";

    //autre test conditionnel qui verifie si suggestion > ou < à la valeur exacte
    if (userGuess < randomNumber) {
      // affichage message qui indique si sa suggestion est trop faible
      plusPetitOuPlusGrand.textContent = "Le nombre saisi est trop petit !";
    } else if (userGuess > randomNumber) {
      // affichage message qui indique si sa suggestion est trop fort
      plusPetitOuPlusGrand.textContent = "Le nombre saisi est trop grand !";
    }
  }

  //variable guessCount qui décompte les tours - incremente de 1
  guessCount++;
  suggestion.value = ""; // effaçe le champ texte du formulaire 
  suggestion.focus(); // remet le curseur en place pour etre prêt pour la saisie suivante
}

//ajoutons un écouteur d'événement au bouton cParti
cParti.addEventListener("click", checkGuess);

function setGameOver() {

  //désactive l'entrée de texte et le bouton 
  suggestion.disabled = true; // empeche l'utilisateur de saisir
  cParti.disabled = true;

  //génèrent un nouvel <button> élément, avec le libellé "Démarrer une nouvelle partie"
  resetButton = document.createElement("button");
  resetButton.textContent = "Démarrer une nouvelle partie";
  document.body.appendChild(resetButton);

  //click sur le bouton déclenchera un appel de la fonction resetGame().
  resetButton.addEventListener("click", resetGame);
}

//réinitialise complètement les paramètres du jeu (le joueur pourra commencer une nouvelle partie)
function resetGame() {
  guessCount = 1; // remet le compteur à 1

  let resetParas = document.querySelectorAll(".resultParas p"); // efface les informations
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton); // supprime le bouton de réinitialisation

  suggestion.disabled = false; // vide le formulaire
  cParti.disabled = false; // met au point le champ de formulaire
  suggestion.value = ""; // pret à entrer le formulaire
  suggestion.focus();

  resultatFinal.style.backgroundColor = "white"; // supprimer la couleur de fond

  //Génèrer un nouveau nombre aléatoire afin que vous ne deviniez plus le même nombre !
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
