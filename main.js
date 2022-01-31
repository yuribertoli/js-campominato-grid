const container = document.querySelector(".container");
const levels = document.getElementById("levels");
const play = document.getElementsByTagName("button")[0];

play.addEventListener("click", function() {

    if (levels.value == "Easy") {

        container.innerHTML = "";

        for (let i = 1; i <= 100; i++) {
    
            let square = document.createElement("div");
            square.classList.add("square10");
            container.appendChild(square);
    
            square.addEventListener("click", function() {
                this.classList.add("active");
                }
            )

            square.innerHTML = square.innerHTML + i;
        
        }
    
    } else if (levels.value == "Medium") {

        container.innerHTML = "";
        
        for (let i = 1; i <= 81; i++) {
    
            let square = document.createElement("div");
            square.classList.add("square9");
            container.appendChild(square);
    
            square.addEventListener("click", function() {
                this.classList.add("active");
                }
            )

            square.innerHTML = square.innerHTML + i;
        
        }
    
    } else if (levels.value == "Hard") {

        container.innerHTML = "";
        
        for (let i = 1; i <= 49; i++) {
    
            let square = document.createElement("div");
            square.classList.add("square7");
            container.appendChild(square);
    
            square.addEventListener("click", function() {
                this.classList.add("active");
                }
            )

            square.innerHTML = square.innerHTML + i;
        
        }
    
    }

})







