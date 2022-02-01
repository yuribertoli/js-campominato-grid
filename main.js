const container = document.querySelector(".container");
const levels = document.getElementById("levels");
const play = document.getElementsByTagName("button")[0];

play.addEventListener("click", function() {

    container.innerHTML = "";

    const squaresEasy = 100;
    const squaresMedium = 81;
    const squaresHard= 49;
    const classEasy = "square10";
    const classMedium = "square9";
    const classHard = "square7";

    switch (levels.value) {

        case "Easy":
            livelloGioco(squaresEasy, classEasy);
            break;

        case "Medium":
            livelloGioco(squaresMedium, classMedium);
            break;

        case "Hard":
            livelloGioco(squaresHard, classHard);
            break;
    }

})

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






