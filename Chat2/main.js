const chat = document.getElementById("chat");
const inputField = document.getElementById("userInput");
const character = document.getElementById("character");


const answers = {
    "Ce faci|ce mai faci": [
        "Învăț pentru sesiune.",
        "Studiez, ca de obicei.",
        "Lupt cu materia 😅"
    ],
    "cum ești|ce mai e nou": [
        "Obosit, dar motivat.",
        "Bine. Focusat.",
        "Supraviețuiesc 😄"
    ],
    "salut|hei|buna": [
        "Salut!",
        "Hei 👋",
        "Salutare!"
    ],
    "Profesie|ce inveti": [
        "Studiez ingineria.",
        "Inginer în devenire."
    ],
    "Universitate|unde inveti": [
        "Universitatea Tehnică «Gheorghe Asachi» din Iași.",
        "Facultatea ETTI."
    ]
};

const fallback = [
    "Nu înțeleg.",
    "Nu mă distrage, te rog.",
    "Am sesiune, nu am timp.",
    "Întrebare inutilă 😐"
];

const hintPhrases = [];
for (let key in answers) {
    hintPhrases.push(...key.split("|"));
}


function sendMessage() {
    const text = inputField.value.trim().toLowerCase();
    if (!text) return;
    addMessage(text, "user");
    inputField.value = "";
    setTimeout(() => respond(text), 400);
}

function sendPreset(text) {
    addMessage(text, "user");
    setTimeout(() => respond(text), 300);
}

function respond(text) {
    for (let key in answers) {
        const variants = key.split("|");
        for (let v of variants) {
            if (text.includes(v)) {
                addMessage(random(answers[key]), "bot");
                return;
            }
        }
    }
    addMessage(random(fallback), "bot");
}

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

inputField.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});


const clickReplies = ["Hei!", "Nu mă distrage!", "Studiez!", "I'm busy!"];

character.addEventListener("click", () => {
    showBubble(random(clickReplies));
});

function showBubble(text) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    const rect = character.getBoundingClientRect();
    const radius = 120;

    let angle;
    do {
        angle = Math.random() * Math.PI * 2;
    } while (Math.sin(angle) > 0.2);

    bubble.style.left =
        rect.left + rect.width / 2 + radius * Math.cos(angle) + "px";
    bubble.style.top =
        rect.top + rect.height / 2 + radius * Math.sin(angle) + "px";

    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 3500);
}


const items = ["📘", "💻", "⌨️", "📡", "📐", "🧠"];

function createItem() {
    const el = document.createElement("div");
    el.className = "item";
    el.textContent = random(items);

    el.style.left = Math.random() * window.innerWidth + "px";
    el.style.setProperty("--wind", Math.random() * 200 - 100 + "px");
    el.style.animationDuration = Math.random() * 6 + 5 + "s";

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 11000);
}

setInterval(createItem, 450);
