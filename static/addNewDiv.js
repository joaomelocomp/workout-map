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

const overlay = document.getElementById("modal-overlay");
const botao_fichas = document.getElementById("btnfichas");

botao_fichas.addEventListener("click", () => overlay.style.display = "flex");

const fechar_modal = document.getElementById("modal-close");

fechar_modal.addEventListener("click", () => overlay.style.display = "none");

function modal_close(){
    overlay.style.display = "none"
};

const plans = {
    ppl: { days: ["Segunda", "Quarta", "Sexta"], labels: ["Push", "Pull", "Legs"], 
            treinos: [
            "Supino Reto 4x8\nSupino Inclinado 3x10\nDevelopment 3x12\nTriceps Corda 3x12\nTriceps Testa 3x10",
            "Puxada Frontal 4x8\nRemada Curvada 4x10\nRosca Direta 3x12\nRosca Martelo 3x12\nFace Pull 3x15",
            "Agachamento 4x8\nLeg Press 4x10\nCadeira Extensora 3x12\nMesa Flexora 3x12\nPanturrilha 4x15",
        ] 
    },
    ul:   { days: ["Segunda", "Terça", "Quinta", "Sexta"], labels: ["Upper A", "Lower A", "Upper B", "Lower B"],
            treinos: [
            "Supino Reto 4x8\nDevelopment 3x10\nPuxada Frontal 4x8\nRemada 3x10\nTriceps 3x12\nRosca 3x12",
            "Agachamento 4x8\nLeg Press 4x10\nMesa Flexora 3x12\nCadeira Extensora 3x12\nPanturrilha 4x15",
            "Supino Inclinado 4x8\nRemada Curvada 4x10\nElevação Lateral 3x12\nTriceps Testa 3x12\nRosca Martelo 3x12",
            "Stiff 4x8\nAfundo 3x10\nLeg Press 4x10\nMesa Flexora 3x12\nPanturrilha 4x15",
        ]
     },
    fb:   { days: ["Segunda", "Quarta", "Sexta"], labels: ["Full Body A", "Full Body B", "Full Body C"],
            treinos: [
            "Agachamento 4x8\nSupino Reto 4x8\nRemada Curvada 4x8\nDevelopment 3x10\nRosca Direta 3x12\nTriceps Corda 3x12",
            "Leg Press 4x10\nSupino Inclinado 3x10\nPuxada Frontal 4x8\nElevação Lateral 3x12\nRosca Martelo 3x12\nTriceps Testa 3x12",
            "Stiff 4x8\nSupino Fechado 3x10\nRemada Unilateral 3x10\nDevelopment 3x12\nRosca Concentrada 3x12\nPanturrilha 4x15",
        ]
     },
};

document.querySelectorAll(".plan-card").forEach(card => {
    card.addEventListener("click", () => {
        const { days, labels, treinos } = plans[card.dataset.plan];
        const fichaBase = container.querySelectorAll(".fichas")[0];

        container.querySelectorAll(".fichas").forEach((f, i) => { if (i > 0) f.remove(); });

        days.forEach((dia, i) => {
            let ficha = i === 0 ? fichaBase : fichaBase.cloneNode(true);
            ficha.querySelector("h1").textContent = dia;
            ficha.querySelector("h2").textContent = labels[i];
            ficha.querySelector("textarea").value = treinos[i];
            if (i > 0) container.appendChild(ficha);
        });

        modal_close();
    });
});