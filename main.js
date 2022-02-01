const container = document.querySelector(".container");
const levels = document.getElementById("levels");
const play = document.getElementsByTagName("button")[0];

//Gestisco l'evento del click sul bottone con i tre possibili livelli di difficoltà
play.addEventListener("click", function() {

    //cancello il contenuto nel div container
    container.innerHTML = "";

    //definisco le variabili da richiamare per ogni livello di difficoltà
    const squaresEasy = 100;
    const squaresMedium = 81;
    const squaresHard= 49;
    const classEasy = "square10";
    const classMedium = "square9";
    const classHard = "square7";

    //in base al valore presente nel tag select, cambio le variabili
    switch (levels.value) {

        case "Easy":
            livelloGioco(squaresEasy, classEasy);
            numeriRandomUnici(squaresEasy);
            break;

        case "Medium":
            livelloGioco(squaresMedium, classMedium);
            numeriRandomUnici(squaresMedium);
            break;

        case "Hard":
            livelloGioco(squaresHard, classHard);
            numeriRandomUnici(squaresHard);
            break;
    }

})






//Funzione per creare 16 numeri casuali (16 bombe) tra i livelli di difficoltà
function numeriRandomUnici(quadratiPresenti) {

    //Definisco un array per contenere le bombe del gioco
    const numeriRandom = [];
    const numeroBombe = 16;

    //cerco se un numero esiste già, se non c'è lo aggiungo all'array
    while (numeriRandom.length < numeroBombe) {

        let numero;
        numero = numeroCasuale(quadratiPresenti);
    
        if (numeriRandom.indexOf(numero) === -1) {
    
            numeriRandom.push(numero);
        
        } 
    
    }

    console.log(numeriRandom);

}

//funzione per creare un numero random da 1 a max
function numeroCasuale(max) {

    let numero;
    numero = Math.floor(Math.random() * max) + 1;
    return numero;

}

//funzione per creare un numero di quadrati definiti da una variabile e aggiungere
//di conseguenza una classe specifica. Alla fine aggiunge un numero progressivo per ogni quadrato
function livelloGioco(numeroQuadrati, classe) {

    for (let i = 1; i <= numeroQuadrati; i++) {

        let square = document.createElement("div");
        square.classList.add(classe);
        container.appendChild(square);

        square.addEventListener("click", function() {
            this.classList.add("active");
            }
        )

        square.innerHTML = square.innerHTML + i;
    
    }

}








