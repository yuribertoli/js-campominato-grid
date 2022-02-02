const container = document.querySelector(".container");
const levels = document.getElementById("levels");
const play = document.getElementsByTagName("button")[0];
const tentativi = []; //array per conteggiare i tentativi, verranno mostrati a fine gioco

//Gestisco l'evento del click
play.addEventListener("click", playButton);




//funzione per definire sviluppo del gioco su click Play
function playButton() {

    //resetto i valori di inizio gioco
    let risultatoGioco = document.getElementById("fine-gioco");

    risultatoGioco.innerHTML = "";
    container.innerHTML = "";
    tentativi.length = 0;

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
            livelloGioco(squaresEasy, classEasy); //creo numero quadrati e classe corrispondente
            numeriRandomUnici(squaresEasy);       //creo numeri casuali
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

    //funzione per creare un numero di quadrati definiti da una variabile e aggiungere
    //di conseguenza una classe specifica. Alla fine aggiunge un numero progressivo per ogni quadrato
    //ritorno gli indici dei div creati in un array
    function livelloGioco(numeroQuadrati, classe) {

        for (let i = 1; i <= numeroQuadrati; i++) {

            let square = document.createElement("div"); //creo div tanti quanti il livello di difficoltà richiede
            square.classList.add(classe);               //aggiungo classe
            container.appendChild(square);              //li inserisco dentro container come oggetti (appendChild)

            square.addEventListener("click", gestisciClick);    //gestisco il click sui quadrati

            square.innerHTML = square.innerHTML + i;        //aggiungo un numero progressivo ad ognuno di loro
        
        }

    }

    //funzione per gestione ascoltatori di eventi e fine del gioco
    function gestisciClick() {

        this.classList.add("active");                       //aggiungo la classe per cambiare il colore della cella
        this.removeEventListener("click", gestisciClick);   //tolgo la possibilità di cliccarci sopra un'altra volta
    
        let numeroSquare = parseInt(this.innerText);        //prendo il valore numerico della cella sopra cui ho cliccato
    
        if (arrayNumeriCasuali.includes(numeroSquare)) {    //se clicco su una cella che ha come valore un numero dell'array con le bombe
    
            fine();                                         //finisce il gioco
    
        } else {
    
            tentativi.push(arrayNumeriCasuali);             //conteggio i tentativi con il numero delle celle cliccate
        }

        //Per calcolare il secondo parametro della funzione Calcolabombe
        const celle = document.querySelectorAll(".container div"); 
        let righe = parseInt(Math.sqrt(celle.length));

        //Inserisco all'interno della cella il numero prodotto dalla funzione
        this.innerHTML = calcolaBombe(numeroSquare, righe, arrayNumeriCasuali);
    
    } 
    
    //funzione per gestire il cambio colore sulle bombe, la rimozione del click e il conteggio finale dei tentativi
    function fine() {
    
        const celle = document.querySelectorAll(".container div");  //prendo tutte le celle create
    
        for (let i=0; i<celle.length; i++) {
    
            if (arrayNumeriCasuali.includes(i + 1)) { //comparo i numeri delle bombe con i numeri degli indici + 1
    
                celle[i].classList.add("exploded");                          //aggiungo la classe esplosa
    
            }
    
            celle[i].removeEventListener("click", gestisciClick);       //rimuovo la possibilità di cliccare sulle restanti celle e continuare a giocare
    
        }
    
        let risultatoGioco = document.getElementById("fine-gioco");
    
        //inserisco il numero di tentativi fatti nel DOM
        if (tentativi.length == 1) { //creo if per l'unica variante dove si usa il singolare a tentativi
            risultatoGioco.innerHTML = `hai totalizzato ${tentativi.length} tentativo, riprova!`
        } else {
            risultatoGioco.innerHTML = `hai totalizzato ${tentativi.length} tentativi, riprova!`
        }
    
    }

    return arrayNumeriCasuali;

}

//Funzione per contare il numero di bombe adiacenti alla casella 
function calcolaBombe(cella, cellePerRiga, bombe) {
    
    let conteggio = 0;

    for (let y = -1; y<=1; y++) { //sull'asse delle y parto ciclando la riga sopra, poi quella centrale e infine quella sotto

        let start = -1;
        let end = 1;

        //se sono ad inizio riga
        if (cella % cellePerRiga == 1) {
            start = 0;
            end = 1;
        } else if (cella % cellePerRiga == 0) {
            //se sono ad fine riga
            start = -1;
            end = 0;
        }
        for (let x = start; x<=end; x++) { //sull'asse delle x parto ciclando la cella di sinistra, poi quella centrale e infine quella a destra
            
            let cellaTest = cella + x + (y * cellePerRiga);
            if (bombe.includes(cellaTest)) {
                conteggio++;
            }
            
        }
    }
    return conteggio;
}

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
    
            numeriRandom.push(numero); //inserisco i numeri dentro l'array numeriRandom
        
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







