const container = document.querySelector(".container");
const levels = document.getElementById("levels");
const play = document.getElementsByTagName("button")[0];
const tentativi = [];
let arrayNumeriCasuali = playButton();

//Gestisco l'evento del click
play.addEventListener("click", playButton);






//Funzione per creare 16 numeri casuali (16 bombe) tra i livelli di difficoltà
function numeriRandomUnici(quadratiPresenti) {

    //Definisco un array per contenere le bombe del gioco
    const numeriRandom = [];
    const numeroBombe = 16;

    //cerco se un numero esiste già, se non c'è lo aggiungo all'array
    while (numeriRandom.length < numeroBombe) {

        let numero;
        numero = numeroCasuale(quadratiPresenti);
    
        // Il metodo indexOf() restituisce un indice (prima 0, poi 1, poi 2,...) da associare all'elemento trovato nell'array, restituisce invece -1 se l'elemento non è presente.
        // -1 significa "not found"
        if (numeriRandom.indexOf(numero) === -1) {
    
            numeriRandom.push(numero);
        
        } 
    
    }
    //console.log(numeriRandom);
    return numeriRandom;

}

//funzione per creare un numero random da 1 a max
function numeroCasuale(max) {

    let numero;
    numero = Math.floor(Math.random() * max) + 1;
    return numero;

}

//funzione per creare un numero di quadrati definiti da una variabile e aggiungere
//di conseguenza una classe specifica. Alla fine aggiunge un numero progressivo per ogni quadrato
//ritorno gli indici dei div creati in un array
function livelloGioco(numeroQuadrati, classe) {

    for (let i = 1; i <= numeroQuadrati; i++) {

        let square = document.createElement("div");
        square.classList.add(classe);
        container.appendChild(square);

        square.addEventListener("click", gestisciClick);

        square.innerHTML = square.innerHTML + i;
    
    }

}

function gestisciClick() {

    this.classList.add("active");                       //aggiungo la classe per cambiare il colore della cella
    this.removeEventListener("click", gestisciClick);   //tolgo la possibilità di cliccarci sopra un'altra volta

    let numeroSquare = parseInt(this.innerText);        //prendo il valore numerico della cella sopra cui ho cliccato

    if (arrayNumeriCasuali.includes(numeroSquare)) {    //se clicco su una cella che ha come valore un numero dell'array con le bombe

        fine();                                         //finisce il gioco

    } else {

        tentativi.push(arrayNumeriCasuali);             //conteggio i tentativi con il numero delle celle cliccate
    }

} 

function fine() {

    const celle = document.querySelectorAll(".container div");  //prendo tutte le celle create

    for (let i=0; i<celle.length; i++) {

        if (arrayNumeriCasuali.includes(parseInt(celle[i].innerText))) { //per tutte le celle che hanno il valore incluso nella lista delle bombe

            celle[i].classList.add("exploded");                          //aggiungo la classe esplosa

        }

        celle[i].removeEventListener("click", gestisciClick);       //rimuovo la possibilità di cliccare sulle restanti celle e continuare a giocare

    }

    let risultatoGioco = document.getElementById("fine-gioco");

    risultatoGioco.innerHTML = `hai totalizzato ${tentativi.length} tentativi, riprova!`

}
//funzione per definire variabili dei livelli di difficoltà e posizioni bombe create
function playButton() {
    
    let risultatoGioco = document.getElementById("fine-gioco");
    //cancello il contenuto nel div container
    container.innerHTML = "";
    risultatoGioco.innerHTML = "";

    //definisco le variabili da richiamare per ogni livello di difficoltà
    const squaresEasy = 100;
    const squaresMedium = 81;
    const squaresHard= 49;
    const classEasy = "square10";
    const classMedium = "square9";
    const classHard = "square7";
    let arrayNumeriCasuali;

    //in base al valore presente nel tag select, cambio le variabili
    switch (levels.value) {

        case "Easy":
            livelloGioco(squaresEasy, classEasy);
            numeriRandomUnici(squaresEasy);
            arrayNumeriCasuali = numeriRandomUnici(squaresEasy); //definisco i numeri delle caselle dove sono le bombe
            break;

        case "Medium":
            livelloGioco(squaresMedium, classMedium);
            numeriRandomUnici(squaresMedium);
            arrayNumeriCasuali = numeriRandomUnici(squaresMedium); 
            break;

        case "Hard":
            livelloGioco(squaresHard, classHard);
            numeriRandomUnici(squaresHard);
            arrayNumeriCasuali = numeriRandomUnici(squaresHard); 
            break;
    }    

    console.log(arrayNumeriCasuali);

    return arrayNumeriCasuali;

}







