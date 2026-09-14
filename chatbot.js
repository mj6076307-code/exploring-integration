
// =========================================================
// chatbot.js
// Integrations-Helfer
// =========================================================

let chatbotTimer = null;
let chatbotAktiveMission = null;

const CHATBOT_WARTEZEIT = 3 * 60 * 1000; // 3 Minuten


// =========================================================
// Chatbot starten, wenn externe Website geöffnet wird
// =========================================================

function chatbotExterneWebsiteStarten(kategorie, missionId) {

    chatbotAktiveMission = {
        kategorie,
        missionId
    };

    // Alten Timer löschen
    if (chatbotTimer) {
        clearTimeout(chatbotTimer);
    }

    // Nach 3 Minuten Hilfe anbieten
    chatbotTimer = setTimeout(() => {

        localStorage.setItem(
            "chatbot_hilfe_bereit",
            "true"
        );

        localStorage.setItem(
            "chatbot_kategorie",
            kategorie
        );

        localStorage.setItem(
            "chatbot_mission",
            missionId
        );

    }, CHATBOT_WARTEZEIT);
}


// =========================================================
// Prüfen, ob der Nutzer zurückkommt
// =========================================================

function chatbotBeimZurueckkehrenPruefen() {

    const hilfeBereit =
        localStorage.getItem("chatbot_hilfe_bereit");

    if (hilfeBereit !== "true") {
        return;
    }

    const kategorie =
        localStorage.getItem("chatbot_kategorie");

    const missionId =
        localStorage.getItem("chatbot_mission");

    if (!kategorie || !missionId) {
        return;
    }

    chatbotAktiveMission = {
        kategorie,
        missionId
    };

    chatbotAnzeigen();
}


// =========================================================
// Chatbot anzeigen
// =========================================================

function chatbotAnzeigen() {

    const chatbot = document.getElementById("integrationChatbot");

    if (!chatbot) {
        return;
    }

    chatbot.classList.add("aktiv");
}


// =========================================================
// Chatbot schließen
// =========================================================

function chatbotSchliessen() {

    const chatbot = document.getElementById("integrationChatbot");

    if (chatbot) {
        chatbot.classList.remove("aktiv");
    }

    localStorage.removeItem("chatbot_hilfe_bereit");
}


// =========================================================
// Hilfe starten
// =========================================================

function chatbotHilfeOeffnen() {

    const frageBereich =
        document.getElementById("chatbotFragen");

    if (!frageBereich) {
        return;
    }

    frageBereich.innerHTML = `
        <div class="chatbot-frage-titel">
            🤖 Natürlich! Wie kann ich dir helfen?
        </div>

        <button onclick="chatbotAntwort('anfang')">
            ❓ Ich weiß nicht, wo ich anfangen soll
        </button>

        <button onclick="chatbotAntwort('website')">
            🌐 Ich verstehe die Website nicht
        </button>

        <button onclick="chatbotAntwort('aufgabe')">
            📋 Ich weiß nicht, was ich machen soll
        </button>

        <button onclick="chatbotAntwort('andere')">
            💬 Ich habe eine andere Frage
        </button>
    `;
}


// =========================================================
// Antworten
// =========================================================

function chatbotAntwort(typ) {

    const frageBereich =
        document.getElementById("chatbotFragen");

    if (!frageBereich) {
        return;
    }

    let antwort = "";

    switch (typ) {

        case "anfang":
            antwort = `
                <strong>Kein Problem 😊</strong><br><br>
                Schau dir zuerst die Informationen auf der
                Website an. Suche nach den Angaben, die für
                deine aktuelle Aufgabe wichtig sind.
            `;
            break;

        case "website":
            antwort = `
                <strong>Das ist völlig in Ordnung 😊</strong><br><br>
                Wenn du mir sagst, was du auf der Website
                nicht verstehst, können wir gemeinsam
                herausfinden, was du suchen musst.
            `;
            break;

        case "aufgabe":
            antwort = `
                <strong>Ich helfe dir gerne 👍</strong><br><br>
                Lies zuerst die Beschreibung deiner Mission
                in Exploring Integration. Danach kannst du
                die wichtigsten Informationen auf der
                externen Website suchen.
            `;
            break;

        case "andere":
            antwort = `
                <strong>Natürlich 😊</strong><br><br>
                Du kannst deine Frage später direkt an den
                Integrations-Helfer stellen.
            `;
            break;
    }

    frageBereich.innerHTML = `
        <div class="chatbot-antwort">
            ${antwort}
        </div>

        <button onclick="chatbotHilfeOeffnen()">
            ← Zurück
        </button>
    `;
}


// =========================================================
// Beim Zurückkehren zur App prüfen
// =========================================================

document.addEventListener("visibilitychange", () => {

    if (document.visibilityState === "visible") {
        chatbotBeimZurueckkehrenPruefen();
    }

});


// =========================================================
// Globale Funktionen
// =========================================================

window.chatbotExterneWebsiteStarten =
    chatbotExterneWebsiteStarten;

window.chatbotSchliessen =
    chatbotSchliessen;

window.chatbotHilfeOeffnen =
    chatbotHilfeOeffnen;

window.chatbotAntwort =
    chatbotAntwort;
