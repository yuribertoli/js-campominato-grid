const container = document.querySelector(".container");
const levels = document.getElementById("levels");
const play = document.getElementsByTagName("button")[0];

function livelloGioco(quadrati, classe) {

    for (let i = 1; i <= quadrati; i++) {

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

play.addEventListener("click", function() {

    container.innerHTML = "";

    const squaresEasy = 100;
    const squaresMedium = 81;
    const squaresHard= 49;
    const classEasy = "square10";
    const classMedium = "square9";
    const classHard = "square7";

    if (levels.value == "Easy") {

        livelloGioco(squaresEasy, classEasy);
    
    } else if (levels.value == "Medium") {
        
        livelloGioco(squaresMedium, classMedium);

    } else if (levels.value == "Hard") {
        
        livelloGioco(squaresHard, classHard);

    }

})







