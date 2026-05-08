const btn = document.getElementById("btn");
const container = document.getElementById("container-fichas");

function salvarFichas() {
    const fichas = [];
    container.querySelectorAll('.fichas').forEach(ficha => {
        const exercicios = [];
        ficha.querySelectorAll('.exe_tags p').forEach(p => exercicios.push(p.textContent));
        fichas.push({
            titulo: ficha.querySelector('h1').textContent,
            subtitulo: ficha.querySelector('h2').textContent,
            exercicios: exercicios
        });
    });
    localStorage.setItem('fichas', JSON.stringify(fichas));
}

function calcularTempo(fichaElement) {
    const exercicios = fichaElement.querySelectorAll('.exe_tags').length;
    const minutos = exercicios * 7;
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (exercicios == 0) return 'None';
    if (horas > 0) return `${horas}h${mins > 0 ? mins + 'min' : ''}`;
    return `${minutos}min`;
}

function atualizarTempo(ficha) {
    const tempo = ficha.querySelector('.tempo-treino');
    if (tempo) tempo.textContent = calcularTempo(ficha);
}

function adicionarTag(ficha, nome) {
    if (!nome) return;
    const exeDiv = ficha.querySelector("#exe");
    const addTagEl = ficha.querySelector(".add_tag");

    const tag = document.createElement("div");
    tag.className = "exe_tags";
    tag.innerHTML = `<p>${nome}</p><button>X</button>`;
    tag.querySelector("button").addEventListener("click", () => {
        tag.remove();
        atualizarTempo(ficha);
        salvarFichas();
    });

    exeDiv.insertBefore(tag, addTagEl);
    ficha.querySelector(".add_tag input").value = "";
    atualizarTempo(ficha);
    salvarFichas();
}

function adicionarExercicios(ficha, lista) {
    ficha.querySelectorAll(".exe_tags").forEach(t => t.remove());
    const exeDiv = ficha.querySelector("#exe");
    const addTagEl = ficha.querySelector(".add_tag");

    lista.split("\n").forEach(nome => {
        if (!nome.trim()) return;
        const tag = document.createElement("div");
        tag.className = "exe_tags";
        tag.innerHTML = `<p>${nome.trim()}</p><button>X</button>`;
        tag.querySelector("button").addEventListener("click", () => {
            tag.remove();
            atualizarTempo(ficha);
            salvarFichas();
        });
        exeDiv.insertBefore(tag, addTagEl);
    });
    atualizarTempo(ficha);
}

function bindFicha(ficha) {
    ficha.querySelector(".delete").addEventListener("click", () => {
        if (ficha !== container.querySelectorAll(".fichas")[0]) {
            ficha.remove();
            salvarFichas();
        } else {
            alert("Não é possivel deletar esta ficha.");
        }
    });

    const addBtn = ficha.querySelector(".add_tag button");
    const addInput = ficha.querySelector(".add_tag input");
    addBtn.addEventListener("click", () => adicionarTag(ficha, addInput.value.trim()));
    addInput.addEventListener("keydown", e => {
        if (e.key === "Enter") adicionarTag(ficha, addInput.value.trim());
    });

    ficha.querySelectorAll(".exe_tags button").forEach(b => {
        b.addEventListener("click", () => {
            b.closest(".exe_tags").remove();
            atualizarTempo(ficha);
            salvarFichas();
        });
    });

    atualizarTempo(ficha);
}

function carregarFichas() {
    const salvo = localStorage.getItem('fichas');
    if (!salvo) return;

    const fichas = JSON.parse(salvo);
    const fichaBase = container.querySelector('.fichas');

    fichas.forEach((dados, i) => {
        let ficha = i === 0 ? fichaBase : fichaBase.cloneNode(true);
        ficha.querySelector('h1').textContent = dados.titulo;
        ficha.querySelector('h2').textContent = dados.subtitulo;
        adicionarExercicios(ficha, dados.exercicios.join('\n'));
        if (i > 0) {
            container.appendChild(ficha);
        }
        bindFicha(ficha);
    });
}

carregarFichas();
bindFicha(container.querySelector(".fichas"));

btn.addEventListener("click", () => {
    const fichas = container.querySelectorAll(".fichas");
    if (fichas.length < 7) {
        const novaFicha = fichas[0].cloneNode(true);
        novaFicha.querySelector("h1").textContent = "Novo dia";
        novaFicha.querySelector("h2").textContent = "Novo treino";
        container.appendChild(novaFicha);
        bindFicha(novaFicha);
        salvarFichas();
    } else {
        alert("Fichas máximas atingidas!");
    }
});

const overlay = document.getElementById("modal-overlay");
const botao_fichas = document.getElementById("btnfichas");
botao_fichas.addEventListener("click", () => overlay.style.display = "flex");

const fechar_modal = document.getElementById("modal-close");
fechar_modal.addEventListener("click", () => overlay.style.display = "none");

function modal_close() { overlay.style.display = "none"; }

const plans = {
    ppl: { days: ["Segunda", "Quarta", "Sexta"], labels: ["Push", "Pull", "Legs"],
        treinos: [
            "Supino Reto\nSupino Inclinado\nDevelopment\nTriceps Corda\nTriceps Testa",
            "Puxada Frontal\nRemada Curvada\nRosca Direta\nRosca Martelo\nFace Pull",
            "Agachamento\nLeg Press\nCadeira Extensora\nMesa Flexora\nPanturrilha",
        ]
    },
    ul: { days: ["Segunda", "Terça", "Quinta", "Sexta"], labels: ["Upper A", "Lower A", "Upper B", "Lower B"],
        treinos: [
            "Supino Reto\nDevelopment\nPuxada Frontal\nRemada\nTriceps\nRosca",
            "Agachamento\nLeg Press\nMesa Flexora\nCadeira Extensora\nPanturrilha",
            "Supino Inclinado\nRemada Curvada\nElevação Lateral\nTriceps Testa\nRosca Martelo",
            "Stiff\nAfundo\nLeg Press\nMesa Flexora\nPanturrilha",
        ]
    },
    fb: { days: ["Segunda", "Quarta", "Sexta"], labels: ["Full Body A", "Full Body B", "Full Body C"],
        treinos: [
            "Agachamento\nSupino Reto\nRemada Curvada\nDevelopment\nRosca Direta\nTriceps Corda",
            "Leg Press\nSupino Inclinado\nPuxada Frontal\nElevação Lateral\nRosca Martelo\nTriceps Testa",
            "Stiff\nSupino Fechado\nRemada Unilateral\nDevelopment\nRosca Concentrada\nPanturrilha",
        ]
    },
    default: { days: ["Segunda", "Quarta", "Sexta"], labels: ["Default", "Default", "Default"],
        treinos: ["", "", ""]
    }
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
            adicionarExercicios(ficha, treinos[i]);
            if (i > 0) {
                container.appendChild(ficha);
            }
            bindFicha(ficha);
        });

        salvarFichas();
        modal_close();
    });
});