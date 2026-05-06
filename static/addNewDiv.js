const btn = document.getElementById("btn");
const container = document.getElementById("container-fichas");

btn.addEventListener("click", () => {

    const fichas = container.querySelectorAll(".fichas");

    if (fichas.length < 5) {

        const fichaBase = fichas[0];
        const novaFicha = fichaBase.cloneNode(true);

        novaFicha.querySelector("h1").textContent = "Novo dia";
        novaFicha.querySelector("h2").textContent = "Novo treino";

        container.appendChild(novaFicha);

    } else {
        alert("Fichas máximas atingidas!")
    }

});

////

const delete_btn = document.getElementById("del");

delete_btn.addEventListener("click", () => {

    if (container[0]){
        alert("A primeira ficha não pode ser apagada!");
    } else {
        container.remove(novaFicha);
    }
});