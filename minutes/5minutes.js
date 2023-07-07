// Définir la fonction pour compter les éléments négatifs
function countNegativeElements(array) {
  let counter = 0; // initialiser le compteur à zéro
  for (let i = 0; i < array.length; i++) { // parcourir le tableau
    if (array[i] < 0) { // vérifier si l'élément est négatif
      counter++; // augmenter le compteur
    }
  }
  return counter; // retourner le compteur
}

// Définir la fonction pour compter les éléments positifs
function countPositiveElements(array) {
  let counter = 0; // initialiser le compteur à zéro
  for (let i = 0; i < array.length; i++) { // parcourir le tableau
    if (array[i] > 0) { // vérifier si l'élément est positif
      counter++; // augmenter le compteur
    }
  }
  return counter; // retourner le compteur
}

// **** ==================================================== LTC ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsLtc = new WebSocket('wss://stream.binance.com:9443/ws/ltcusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let ltcStockPriceElement0 = document.getElementById('ltcValue0');
let ltcStockPriceElement1 = document.getElementById('ltcValue1');
let ltcStockPriceElement2 = document.getElementById('ltcValue2');
let ltcStockPriceElement3 = document.getElementById('ltcValue3');
let ltcStockPriceElement4 = document.getElementById('ltcValue4');
let ltcStockPriceElement5 = document.getElementById('ltcValue5');
let ltcStockPriceElement6 = document.getElementById('ltcValue6');
let ltcStockPriceElement7 = document.getElementById('ltcValue7');
let ltcStockPriceElement8 = document.getElementById('ltcValue8');
let ltcStockPriceElement9 = document.getElementById('ltcValue9');


// Sélectionner les éléments HTML où afficher la variation abltcue du bitcoin
let ltcVarianceElement0 = document.getElementById('ltcVariance0');
let ltcVarianceElement1 = document.getElementById('ltcVariance1');
let ltcVarianceElement2 = document.getElementById('ltcVariance2');
let ltcVarianceElement3 = document.getElementById('ltcVariance3');
let ltcVarianceElement4 = document.getElementById('ltcVariance4');
let ltcVarianceElement5 = document.getElementById('ltcVariance5');
let ltcVarianceElement6 = document.getElementById('ltcVariance6');
let ltcVarianceElement7 = document.getElementById('ltcVariance7');
let ltcVarianceElement8 = document.getElementById('ltcVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let ltcVariancePercentSumElement = document.getElementById('ltcVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let ltcMessageElement = document.getElementById('ltcMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let ltcLastPrice = null;
let ltcStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsLtc.onmessage = (event) => {
 // Convertir le message en objet JSON
 ltcStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let ltcCurrent1 ,ltcCurrent2, ltcCurrent3, ltcCurrent4, ltcCurrent5, ltcCurrent6, ltcCurrent7, ltcCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let ltcCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let ltcVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let ltcRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 5 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(ltcStockObject.p).toFixed(2);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let ltcStockPriceElement = document.getElementById('ltcValue' + (ltcCounter + 1));
 ltcStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 ltcStockPriceElement.style.color =
 !ltcLastPrice || ltcLastPrice === val
 ? 'black'
 : val > ltcLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 ltcLastPrice = val;
 // Réinitialiser l'objet du flux à null
 ltcStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let ltcCurrent = 'ltcCurrent' + (ltcCounter + 1);
 window[ltcCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (ltcCounter > 0) {
   // Calculer la variation abltcue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[ltcCurrent] - window['ltcCurrent' + (ltcCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['ltcCurrent' + (ltcCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[ltcCurrent] < window['ltcCurrent' + (ltcCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[ltcCurrent] > window['ltcCurrent' + (ltcCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let ltcVarianceElement = document.getElementById('ltcVariance' + (ltcCounter - 1));
   ltcVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     ltcVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     ltcVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     ltcVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   ltcVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 ltcCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (ltcCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let ltcVariancePercentSum = parseFloat(ltcVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let ltcVariancePercentSumSymbol = "";
if (ltcVariancePercentSum > 0) {
  // Somme positive : symbole plus
  ltcVariancePercentSumSymbol = "+";
} else if (ltcVariancePercentSum < 0) {
  // Somme négative : symbole moinsltc
  ltcVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
ltcVariancePercentSumElement.innerText = ltcVariancePercentSumSymbol + ltcVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (ltcVariancePercentSum < 0) {
 // Somme négative : rouge
 ltcVariancePercentSumElement.style.color = 'red';
} else if (ltcVariancePercentSum > 0) {
 // Somme positive : vert
 ltcVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 ltcVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(ltcVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(ltcVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    ltcMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LTCUSDT?_from=markets' target='_blank'>LTC</a>"; // insérer le lien sur LTC et le message
    ltcMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    ltcMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LTCUSDT?_from=markets' target='_blank'>LTC</a>"; // insérer le lien sur LTC et le message
    ltcMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    ltcMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(ltcRunTimers);
}
}, 300000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== RNDR ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsRndr = new WebSocket('wss://stream.binance.com:9443/ws/rndrusdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let rndrStockPriceElement0 = document.getElementById('rndrValue0');
let rndrStockPriceElement1 = document.getElementById('rndrValue1');
let rndrStockPriceElement2 = document.getElementById('rndrValue2');
let rndrStockPriceElement3 = document.getElementById('rndrValue3');
let rndrStockPriceElement4 = document.getElementById('rndrValue4');
let rndrStockPriceElement5 = document.getElementById('rndrValue5');
let rndrStockPriceElement6 = document.getElementById('rndrValue6');
let rndrStockPriceElement7 = document.getElementById('rndrValue7');
let rndrStockPriceElement8 = document.getElementById('rndrValue8');
let rndrStockPriceElement9 = document.getElementById('rndrValue9');


// Sélectionner les éléments HTML où afficher la variation abrndrue du bitcoin
let rndrVarianceElement0 = document.getElementById('rndrVariance0');
let rndrVarianceElement1 = document.getElementById('rndrVariance1');
let rndrVarianceElement2 = document.getElementById('rndrVariance2');
let rndrVarianceElement3 = document.getElementById('rndrVariance3');
let rndrVarianceElement4 = document.getElementById('rndrVariance4');
let rndrVarianceElement5 = document.getElementById('rndrVariance5');
let rndrVarianceElement6 = document.getElementById('rndrVariance6');
let rndrVarianceElement7 = document.getElementById('rndrVariance7');
let rndrVarianceElement8 = document.getElementById('rndrVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let rndrVariancePercentSumElement = document.getElementById('rndrVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let rndrMessageElement = document.getElementById('rndrMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let rndrLastPrice = null;
let rndrStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsRndr.onmessage = (event) => {
 // Convertir le message en objet JSON
 rndrStockObject = JSON.parse(event.data);
};

// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let rndrCurrent1 ,rndrCurrent2, rndrCurrent3, rndrCurrent4, rndrCurrent5, rndrCurrent6, rndrCurrent7, rndrCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let rndrCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let rndrVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let rndrRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 5 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(rndrStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let rndrStockPriceElement = document.getElementById('rndrValue' + (rndrCounter + 1));
 rndrStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 rndrStockPriceElement.style.color =
 !rndrLastPrice || rndrLastPrice === val
 ? 'black'
 : val > rndrLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 rndrLastPrice = val;
 // Réinitialiser l'objet du flux à null
 rndrStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let rndrCurrent = 'rndrCurrent' + (rndrCounter + 1);
 window[rndrCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (rndrCounter > 0) {
   // Calculer la variation abrndrue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[rndrCurrent] - window['rndrCurrent' + (rndrCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['rndrCurrent' + (rndrCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[rndrCurrent] < window['rndrCurrent' + (rndrCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[rndrCurrent] > window['rndrCurrent' + (rndrCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let rndrVarianceElement = document.getElementById('rndrVariance' + (rndrCounter - 1));
   rndrVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     rndrVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     rndrVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     rndrVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   rndrVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 rndrCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (rndrCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let rndrVariancePercentSum = parseFloat(rndrVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let rndrVariancePercentSumSymbol = "";
if (rndrVariancePercentSum > 0) {
  // Somme positive : symbole plus
  rndrVariancePercentSumSymbol = "+";
} else if (rndrVariancePercentSum < 0) {
  // Somme négative : symbole moinsrndr
  rndrVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
rndrVariancePercentSumElement.innerText = rndrVariancePercentSumSymbol + rndrVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (rndrVariancePercentSum < 0) {
 // Somme négative : rouge
 rndrVariancePercentSumElement.style.color = 'red';
} else if (rndrVariancePercentSum > 0) {
 // Somme positive : vert
 rndrVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 rndrVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau btcVariancePercentArray
let negativeCount = countNegativeElements(rndrVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau btcVariancePercentArray
let positiveCount = countPositiveElements(rndrVariancePercentArray); // stocker le résultat dans une variable


if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    rndrMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/RNDRUSDT?_from=markets' target='_blank'>RNDR</a>"; // insérer le lien sur RNDR et le message
    rndrMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    rndrMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/RNDRUSDT?_from=markets' target='_blank'>RNDR</a>"; // insérer le lien sur RNDR et le message
    rndrMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    rndrMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(rndrRunTimers);
}
}, 300000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //

// **** ==================================================== LDO ==================================================== **** // 

// Créer un objet WebSocket pour se connecter au flux de données de Binance
let wsLdo = new WebSocket('wss://stream.binance.com:9443/ws/ldousdt@trade');

// Sélectionner les éléments HTML où afficher le prix du bitcoin
let ldoStockPriceElement0 = document.getElementById('ldoValue0');
let ldoStockPriceElement1 = document.getElementById('ldoValue1');
let ldoStockPriceElement2 = document.getElementById('ldoValue2');
let ldoStockPriceElement3 = document.getElementById('ldoValue3');
let ldoStockPriceElement4 = document.getElementById('ldoValue4');
let ldoStockPriceElement5 = document.getElementById('ldoValue5');
let ldoStockPriceElement6 = document.getElementById('ldoValue6');
let ldoStockPriceElement7 = document.getElementById('ldoValue7');
let ldoStockPriceElement8 = document.getElementById('ldoValue8');
let ldoStockPriceElement9 = document.getElementById('ldoValue9');


// Sélectionner les éléments HTML où afficher la variation absolue du bitcoin
let ldoVarianceElement0 = document.getElementById('ldoVariance0');
let ldoVarianceElement1 = document.getElementById('ldoVariance1');
let ldoVarianceElement2 = document.getElementById('ldoVariance2');
let ldoVarianceElement3 = document.getElementById('ldoVariance3');
let ldoVarianceElement4 = document.getElementById('ldoVariance4');
let ldoVarianceElement5 = document.getElementById('ldoVariance5');
let ldoVarianceElement6 = document.getElementById('ldoVariance6');
let ldoVarianceElement7 = document.getElementById('ldoVariance7');
let ldoVarianceElement8 = document.getElementById('ldoVariance8');

// Sélectionner l'élément HTML où afficher la somme des variations en pourcentage du bitcoin
let ldoVariancePercentSumElement = document.getElementById('ldoVariancePercentSum');

// Sélectionner l'élément HTML où afficher le message selon le nombre d'éléments négatifs
let ldoMessageElement = document.getElementById('ldoMessageCoin');

// Déclarer des variables pour stocker le dernier prix et l'objet reçu du flux
let ldoLastPrice = null;
let ldoStockObject = null;

// Définir une fonction pour gérer les messages reçus du flux
wsLdo.onmessage = (event) => {
 // Convertir le message en objet JSON
 ldoStockObject = JSON.parse(event.data);
};
// Déclarer des variables pour stocker les valeurs du bitcoin à différents moments
let ldoCurrent1 ,ldoCurrent2, ldoCurrent3, ldoCurrent4, ldoCurrent5, ldoCurrent6, ldoCurrent7, ldoCurrent8 = 0;

// Déclarer une variable pour compter le nombre de fois que le code s'exécute
let ldoCounter = 0;

// Déclarer un tableau vide pour stocker les variations en pourcentage du bitcoin
let ldoVariancePercentArray = [];

// Définir un intervalle pour exécuter le code toutes les minutes
let ldoRunTimers = setInterval(() => {
 // Obtenir les minutes actuelles
 let minutes = new Date().getMinutes();
 
 // Si les minutes sont divisibles par 15 (c'est-à-dire 0, 2, 30 ou 40)
 if (minutes % 5 === 0) {
 // Obtenir la valeur du bitcoin à partir de l'objet du flux et l'arrondir à un chiffre après la virgule
 let val = parseFloat(ldoStockObject.p).toFixed(4);
 // Afficher la valeur dans l'élément HTML correspondant au compteur
 let ldoStockPriceElement = document.getElementById('ldoValue' + (ldoCounter + 1));
 ldoStockPriceElement.innerText = val;
 // Changer la couleur du texte en fonction de la variation du prix par rapport au dernier prix
 ldoStockPriceElement.style.color =
 !ldoLastPrice || ldoLastPrice === val
 ? 'black'
 : val > ldoLastPrice
 ? '#AAFF00'
 : 'red';
 // Mettre à jour le dernier prix avec la valeur actuelle
 ldoLastPrice = val;
 // Réinitialiser l'objet du flux à null
 ldoStockObject = null;
 // Stocker la valeur actuelle dans la variable correspondante
 let ldoCurrent = 'ldoCurrent' + (ldoCounter + 1);
 window[ldoCurrent] = val;
 
 // Si le compteur est supérieur à 0 (c'est-à-dire qu'il y a au moins deux valeurs à comparer)
 if (ldoCounter > 0) {
   // Calculer la variation absolue entre la valeur actuelle et la précédente
   let variance = Math.abs(window[ldoCurrent] - window['ldoCurrent' + (ldoCounter)]);
   // Formater la variation à deux décimales
   variance = variance.toFixed(2);
   // Diviser la variation par la valeur initiale et multiplier par 100
   let variancePercent = (variance / window['ldoCurrent' + (ldoCounter)]) * 100;
   // Formater la variation en pourcentage à deux décimales
   variancePercent = variancePercent.toFixed(2);
   // Ajouter une condition pour afficher le signe correct de la variation en pourcentage
   if (window[ldoCurrent] < window['ldoCurrent' + (ldoCounter)]) {
     // Si la valeur actuelle est inférieure à la valeur précédente, la variation est négative
     variancePercent = "-" + variancePercent;
   } else if (window[ldoCurrent] > window['ldoCurrent' + (ldoCounter)]) {
     // Si la valeur actuelle est supérieure à la valeur précédente, la variation est positive
     variancePercent = "+" + variancePercent;
   } else {
     // Si la valeur actuelle est égale à la valeur précédente, la variation est nulle
     variancePercent = "0";
   }
   // Afficher la variation en pourcentage dans l'élément HTML correspondant au compteur - 1
   let ldoVarianceElement = document.getElementById('ldoVariance' + (ldoCounter - 1));
   ldoVarianceElement.innerText = variancePercent + "%";
   // Changer la couleur du texte en fonction de la valeur de la variation
   if (variancePercent < 0) {
     // Variation négative : rouge
     ldoVarianceElement.style.color = 'red';
   } else if (variancePercent > 0) {
     // Variation positive : vert
     ldoVarianceElement.style.color = 'green';
   } else {
     // Variation nulle : bleu
     ldoVarianceElement.style.color = 'blue';
   }
   
   // Ajouter la variation au tableau des variations en pourcentage
   ldoVariancePercentArray.push (parseFloat(variancePercent));
 }
 
 // Augmenter le compteur de 1
 ldoCounter++;
 }

 // Si le compteur atteint 9 (c'est-à-dire que le code s'est exécuté 9 fois)
 if (ldoCounter === 9) {
 
// Utiliser reduce pour calculer la somme des variations en pourcentage
let ldoVariancePercentSum = parseFloat(ldoVariancePercentArray.reduce ((a, b) => a + b, 0).toFixed(2));
 
// Ajouter une condition pour afficher le symbole plus ou moins selon le signe de la somme
let ldoVariancePercentSumSymbol = "";
if (ldoVariancePercentSum > 0) {
  // Somme positive : symbole plus
  ldoVariancePercentSumSymbol = "+";
} else if (ldoVariancePercentSum < 0) {
  // Somme négative : symbole moins
  ldoVariancePercentSumSymbol = "-";
}

// Afficher la somme avec le symbole dans l'élément HTML correspondant 
ldoVariancePercentSumElement.innerText = ldoVariancePercentSumSymbol + ldoVariancePercentSum + "%";

// Changer la couleur du texte en fonction de la valeur de la somme
if (ldoVariancePercentSum < 0) {
 // Somme négative : rouge
 ldoVariancePercentSumElement.style.color = 'red';
} else if (ldoVariancePercentSum > 0) {
 // Somme positive : vert
 ldoVariancePercentSumElement.style.color = 'green';
} else {
 // Somme nulle : bleu
 ldoVariancePercentSumElement.style.color = 'blue';
}

// Appeler la fonction pour compter les éléments négatifs dans le tableau ldoVariancePercentArray
let negativeCount = countNegativeElements(ldoVariancePercentArray); // stocker le résultat dans une variable
// Appeler la fonction pour compter les éléments positifs dans le tableau ldoVariancePercentArray
let positiveCount = countPositiveElements(ldoVariancePercentArray); // stocker le résultat dans une variable


// Appeler la fonction pour compter les éléments négatifs dans le tableau ldoVariancePercentArray
if (negativeCount >= 6) { // s'il y a au moins six éléments négatifs
    ldoMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LDOUSDT?_from=markets' target='_blank'>LDO</a>"; // insérer le lien sur LDO et le message
    ldoMessageElement.style.color = "green"; // changer la couleur en vert
} else if (positiveCount >= 6) { // s'il y a au moins six éléments positifs 
    ldoMessageElement.innerHTML = "<a href='https://www.binance.com/fr/futures/LDOUSDT?_from=markets' target='_blank'>LDO</a>"; // insérer le lien sur LDO et le message
    ldoMessageElement.style.color = "red"; // changer la couleur en rouge
} else { // sinon 
    ldoMessageElement.innerHTML =""; 
}
  
// Arrêter l'intervalle
clearInterval(ldoRunTimers);
}
}, 300000); // Exécuter le code toutes les 120000 millisecondes, soit toutes les 2 minutes


// **** =================================================================================================================== **** //
