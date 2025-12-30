const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const snowman = document.getElementById("snowman");

const DATA_ANULUI_NOU = "1 ianuarie 🎄";

const speech = document.getElementById("speech");

const positions = [
    "top",
    "left",
    "right"
];

snowman.addEventListener("click", () => {
    showSpeechRandom("☃️ Hei!");
});

function showSpeechRandom(text) {
    speech.textContent = text;

    // сброс стилей
    speech.style.top = "";
    speech.style.bottom = "";
    speech.style.left = "";
    speech.style.right = "";
    speech.style.margin = "0";

    // стрелочка сброс
    speech.style.setProperty("--arrow", "");

    const pos = positions[Math.floor(Math.random() * positions.length)];

    if (pos === "top") {
        speech.style.bottom = "100%";
        speech.style.left = "50%";
        speech.style.transform = "translateX(-50%) scale(1)";
    }

    if (pos === "left") {
        speech.style.right = "100%";
        speech.style.top = "50%";
        speech.style.transform = "translateY(-50%) scale(1)";
    }

    if (pos === "right") {
        speech.style.left = "100%";
        speech.style.top = "50%";
        speech.style.transform = "translateY(-50%) scale(1)";
    }

    speech.classList.add("show");

    setTimeout(() => {
        speech.classList.remove("show");
    }, 2000);
}


const raspunsuri = {
    salut: [
        "Salut! Mă bucur să te văd ❄️",
        "Hei! Spirit de sărbătoare activat 😄",
        "Salutare! Omul de zăpadă e aici ☃️"
    ],
    stare: [
        "Sunt bine, mulțumesc!",
        "Merge treaba, e cam frig 😅",
        "Foarte bine, vibe de Anul Nou"
    ],
    activitate: [
        "Vorbesc cu tine 😊",
        "Număr zilele până la Anul Nou",
        "Aduc atmosferă festivă"
    ],
    anulNou: [
        "Anul Nou este pe " + DATA_ANULUI_NOU,
        "Mai e puțin până la " + DATA_ANULUI_NOU,
        "Pe " + DATA_ANULUI_NOU + " începe distracția 🎉"
    ],
    urari: [
        "Îți doresc sănătate, liniște și bani 💸",
        "Un an nou fără stres și cu reușite",
        "Mult noroc și oameni buni 🎁"
    ],
    implicit: [
        "Interesantă întrebare 🤔",
        "Chiar m-ai pus pe gânduri",
        "Nu știu tot, sunt din zăpadă ❄️"
    ]
};

sendBtn.onclick = sendMessage;

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("Tu: " + text, "user");
    input.value = "";

    setTimeout(() => raspunsBot(text), randomDelay());
}

function quickQuestion(text) {
    addMessage("Tu: " + text, "user");
    setTimeout(() => raspunsBot(text), randomDelay());
}

function raspunsBot(textUser) {
    const text = textUser.toLowerCase();
    let r;

    if (contine(text, ["salut", "bună", "buna"])) {
        r = random(raspunsuri.salut);

    } else if (contine(text, ["ce faci", "cum ești", "cum esti"])) {
        r = random(raspunsuri.stare) + ". " + random(raspunsuri.activitate);

    } else if (contine(text, ["anul nou", "când"])) {
        r = random(raspunsuri.anulNou);

    } else if (contine(text, ["urare", "dorești"])) {
        r = random(raspunsuri.urari);

    } else {
        r = random(raspunsuri.implicit);
        if (Math.random() < 0.3) r += " Apropo, Anul Nou e pe " + DATA_ANULUI_NOU;
    }

    animateSnowman();
    addMessage("Omul de zăpadă: " + r, "bot");
}

function animateSnowman() {
    snowman.classList.add("talk");
    setTimeout(() => snowman.classList.remove("talk"), 500);
}

function addMessage(text, cls) {
    const d = document.createElement("div");
    d.className = cls;
    d.textContent = text;
    chatBox.appendChild(d);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function contine(text, arr) {
    return arr.some(w => text.includes(w));
}

function randomDelay() {
    return 400 + Math.random() * 600;
}

/* ❄️ ZĂPADĂ CU VÂNT */
const snowContainer = document.getElementById("snow-container");
const SNOW_COUNT = 60;

function createSnowflake() {
    const flake = document.createElement("div");
    flake.className = "snowflake";
    flake.textContent = "❄";

    const size = Math.random() * 10 + 8;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 5 + 5;
    const drift = Math.random() * 200 - 100;

    flake.style.fontSize = size + "px";
    flake.style.left = startX + "px";

    snowContainer.appendChild(flake);

    flake.animate([
        { transform: "translate(0, 0)" },
        { transform: `translate(${drift}px, ${window.innerHeight}px)` }
    ], {
        duration: duration * 1000,
        easing: "linear"
    });

    setTimeout(() => {
        flake.remove();
        createSnowflake();
    }, duration * 1000);
}

for (let i = 0; i < SNOW_COUNT; i++) {
    setTimeout(createSnowflake, Math.random() * 2000);
}
