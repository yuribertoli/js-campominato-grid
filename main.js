const container = document.querySelector(".container");

for (let i = 1; i <= 100; i++) {

    let square = document.createElement("div");
    square.classList.add("square");
    container.appendChild(square);

}