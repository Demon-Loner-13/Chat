const chatBox = document.getElementById("chat-box");

const DATA_ANULUI_NOU = "1 ianuarie 🎄";

const raspunsuri = {
    salut: [
        "Salut! Mă bucur să te văd ❄️",
        "Hei! Ești gata de Anul Nou?",
        "Salutare! Omul de zăpadă e aici ☃️"
    ],
    anulNou: [
        "Anul Nou este pe " + DATA_ANULUI_NOU,
        "Pe " + DATA_ANULUI_NOU + " începe distracția 🎉",
        "Mai e puțin până la " + DATA_ANULUI_NOU
    ],
    abilitati: [
        "Vorbesc cu oamenii și aduc vibe de sărbătoare 😎",
        "Sunt expert în spirit de Anul Nou",
        "Îmi place să fac conversația mai veselă ❄️"
    ],
    urari: [
        "Îți doresc sănătate, liniște și bani 💸",
        "Un an nou fără stres și cu multe reușite",
        "Să ai parte de bucurii și oameni buni 🎁"
    ],
    implicit: [
        "Interesantă întrebare 🤔",
        "Chiar m-ai pus pe gânduri",
        "Nu știu tot, sunt doar din zăpadă ❄️",
        "Bună întrebare, recunosc"
    ],
    stare: [
    	"Sunt bine, mulțumesc! Mă bucur de iarnă ❄️",
    	"Totul e ok, aștept Anul Nou 🎄",
    	"Sincer? Cam frig, dar merge ☃️",
    	"Foarte bine, vibe de sărbătoare 😄",
    	"Merge treaba, ca un om de zăpadă"
    ],
    activitate: [
    	"Stau aici și vorbesc cu tine 😊",
    	"Aștept Anul Nou și păzesc spiritul sărbătorii 🎄",
    	"Mă topesc încet, dar cu stil 😎",
    	"Număr zilele până la Anul Nou",
    	"Fac conversație și aduc bună dispoziție"
]

};

function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if (!text) return;

    addMessage("Tu: " + text, "user");
    input.value = "";

    setTimeout(() => {
        raspunsBot(text);
    }, intarziereRandom());
}

function quickQuestion(text) {
    addMessage("Tu: " + text, "user");

    setTimeout(() => {
        raspunsBot(text);
    }, intarziereRandom());
}

function raspunsBot(textUtilizator) {
    const text = textUtilizator.toLowerCase();
    let raspuns;

    if (contine(text, ["salut", "hello", "bună", "buna"])) {
        raspuns = random(raspunsuri.salut);

    } else if (contine(text, ["anul nou", "când", "data"])) {
        raspuns = random(raspunsuri.anulNou);

    } else if (contine(text, ["poți", "face", "știi"])) {
        raspuns = random(raspunsuri.abilitati);

    } else if (contine(text, ["urare", "dorești", "vreau"])) {
        raspuns = random(raspunsuri.urari);

    } else if (contine(text, ["ce faci", "ce mai faci", "cum ești", "cum esti"])) {
        raspuns = Math.random() < 0.5
        ? random(raspunsuri.stare)
        : random(raspunsuri.stare) + ". " + random(raspunsuri.activitate);
    } else {
        raspuns = random(raspunsuri.implicit);

        // uneori amintește de Anul Nou
        if (Math.random() < 0.3) {
            raspuns += " Apropo, Anul Nou este pe " + DATA_ANULUI_NOU;
        }
    }

    addMessage("Omul de zăpadă: " + raspuns, "bot");
}

function addMessage(text, className) {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function contine(text, cuvinte) {
    return cuvinte.some(cuv => text.includes(cuv));
}

function intarziereRandom() {
    return 400 + Math.random() * 600;
}
