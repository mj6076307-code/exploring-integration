/* =========================================================
   EXPLORING INTEGRATION
   Integrations-Navigator München

   KOMPLETTER INDEX.JS

   Enthält:
   - Supabase Registrierung
   - Supabase Login
   - Supabase Logout
   - Benutzername
   - Session beim Start
   - Kategorien
   - Missionen
   - Aufgaben
   - Punkte
   - erledigte Aufgaben
   - Rewards
   - Reward-Popup
   - Fortschritt pro Benutzer
   - Zurücksetzen
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "DEINE_SUPABASE_URL";

const SUPABASE_PUBLISHABLE_KEY =
    "DEIN_SUPABASE_PUBLISHABLE_KEY";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* =========================================================
   AKTUELLER BENUTZER
========================================================= */

let aktuellerBenutzer = null;


/* =========================================================
   GAMIFICATION
========================================================= */

let punkte = 0;

let erledigteMissionen = 0;

let missionsPositionen = {};


/* =========================================================
   REWARDS
========================================================= */

const rewards = [

    {
        id: "reward1",
        icon: "📚",
        name: "Lernmaterial",
        description:
            "Ein Lernmaterial oder Buch für deinen weiteren Weg.",
        points: 25
    },

    {
        id: "reward2",
        icon: "🎁",
        name: "Kleine Belohnung",
        description:
            "Eine kleine Anerkennung für deinen Fortschritt.",
        points: 50
    },

    {
        id: "reward3",
        icon: "🤝",
        name: "Patenschaft",
        description:
            "Unterstützung durch eine Patin oder einen Paten.",
        points: 100
    },

    {
        id: "reward4",
        icon: "🏆",
        name: "Integrations-Champion",
        description:
            "Du hast einen wichtigen Meilenstein erreicht.",
        points: 200
    }

];


/* =========================================================
   MISSIONEN
========================================================= */

const missionen = {

    integration: [

        {
            id: "integration_1",
            icon: "🔎",
            title: "Integrationskurs finden",
            description:
                "Finde einen passenden Integrationskurs in deiner Nähe.",
            tasks: [

                {
                    id: "integration_1_1",
                    title: "BAMF-NAvI öffnen",
                    text:
                        "Öffne das BAMF-NAvI und suche nach Integrationskursen.",
                    points: 5,
                    link:
                        "https://bamf-navi.bamf.de/"
                },

                {
                    id: "integration_1_2",
                    title: "Postleitzahl eingeben",
                    text:
                        "Gib deine Postleitzahl ein und suche nach Kursen.",
                    points: 5
                },

                {
                    id: "integration_1_3",
                    title: "Kurs auswählen",
                    text:
                        "Wähle mindestens einen passenden Kurs aus.",
                    points: 5
                },

                {
                    id: "integration_1_4",
                    title: "Kursanbieter merken",
                    text:
                        "Notiere dir den Namen des Kursanbieters.",
                    points: 5
                }

            ]
        }

    ],


    kita: [

        {
            id: "kita_1",
            icon: "🏫",
            title: "Kita finden",
            description:
                "Finde eine passende Kindertageseinrichtung.",
            tasks: [

                {
                    id: "kita_1_1",
                    title: "Kita-Finder öffnen",
                    text:
                        "Öffne den Münchner Kita-Finder.",
                    points: 5,
                    link:
                        "https://kitafinder.muenchen.de/elternportal/de/"
                },

                {
                    id: "kita_1_2",
                    title: "Wohnort eingeben",
                    text:
                        "Suche nach Kitas in deiner Nähe.",
                    points: 5
                },

                {
                    id: "kita_1_3",
                    title: "Kita auswählen",
                    text:
                        "Wähle eine passende Kita aus.",
                    points: 5
                },

                {
                    id: "kita_1_4",
                    title: "Kontakt speichern",
                    text:
                        "Speichere die Kontaktdaten der Kita.",
                    points: 5
                }

            ]
        }

    ],


    sozial: [

        {
            id: "sozial_1",
            icon: "🏛️",
            title: "Zuständiges Sozialbürgerhaus finden",
            description:
                "Finde anhand deiner Postleitzahl dein zuständiges Sozialbürgerhaus.",
            tasks: [

                {
                    id: "sozial_1_1",
                    title: "Postleitzahl bereithalten",
                    text:
                        "Halte deine aktuelle Postleitzahl bereit.",
                    points: 5
                },

                {
                    id: "sozial_1_2",
                    title: "Zuständigkeit suchen",
                    text:
                        "Suche anhand deiner Postleitzahl nach dem zuständigen Sozialbürgerhaus.",
                    points: 5
                },

                {
                    id: "sozial_1_3",
                    title: "Adresse finden",
                    text:
                        "Notiere dir die Adresse.",
                    points: 5
                },

                {
                    id: "sozial_1_4",
                    title: "Kontakt speichern",
                    text:
                        "Speichere die Telefonnummer oder Website.",
                    points: 5
                }

            ]
        }

    ],


    mobilitaet: [

        {
            id: "mobilitaet_1",
            icon: "🚌",
            title: "Fahrt selbstständig planen",
            description:
                "Lerne, eine Fahrt mit Bus und Bahn selbst zu planen.",
            tasks: [

                {
                    id: "mobilitaet_1_1",
                    title: "Startpunkt eingeben",
                    text:
                        "Gib deinen Startpunkt in einer Fahrplan-App ein.",
                    points: 5
                },

                {
                    id: "mobilitaet_1_2",
                    title: "Ziel eingeben",
                    text:
                        "Gib dein Ziel ein.",
                    points: 5
                },

                {
                    id: "mobilitaet_1_3",
                    title: "Verbindung auswählen",
                    text:
                        "Wähle eine passende Verbindung.",
                    points: 5
                },

                {
                    id: "mobilitaet_1_4",
                    title: "Abfahrtszeit prüfen",
                    text:
                        "Prüfe Abfahrtszeit und Umstieg.",
                    points: 5
                }

            ]
        }

    ],


    auslaender: [

        {
            id: "auslaender_1",
            icon: "🛂",
            title: "Informationen selbst finden",
            description:
                "Lerne, Informationen der Ausländerbehörde selbstständig zu finden.",
            tasks: [

                {
                    id: "auslaender_1_1",
                    title: "Website öffnen",
                    text:
                        "Suche die offizielle Website der Münchner Ausländerbehörde.",
                    points: 5
                },

                {
                    id: "auslaender_1_2",
                    title: "Passendes Thema suchen",
                    text:
                        "Finde den Bereich, der zu deinem Anliegen passt.",
                    points: 5
                },

                {
                    id: "auslaender_1_3",
                    title: "Benötigte Unterlagen prüfen",
                    text:
                        "Prüfe, welche Unterlagen benötigt werden.",
                    points: 5
                },

                {
                    id: "auslaender_1_4",
                    title: "Termin oder Antrag finden",
                    text:
                        "Finde heraus, wie du den nächsten Schritt erledigen kannst.",
                    points: 5
                }

            ]
        }

    ],


    jobcenter: [

        {
            id: "jobcenter_1",
            icon: "💼",
            title: "Jobcenter-Aufgabe selbstständig erledigen",
            description:
                "Finde Informationen und erledige einen ersten Schritt selbstständig.",
            tasks: [

                {
                    id: "jobcenter_1_1",
                    title: "Jobcenter München öffnen",
                    text:
                        "Öffne die Website des Jobcenters München.",
                    points: 5,
                    link:
                        "https://www.arbeitsagentur.de/vor-ort/jobcenter/jobcenter-muenchen-muenchen-84381.html"
                },

                {
                    id: "jobcenter_1_2",
                    title: "Passendes Anliegen finden",
                    text:
                        "Suche den Bereich, der zu deinem Anliegen passt.",
                    points: 5
                },

                {
                    id: "jobcenter_1_3",
                    title: "Unterlagen prüfen",
                    text:
                        "Prüfe, welche Unterlagen benötigt werden.",
                    points: 5
                },

                {
                    id: "jobcenter_1_4",
                    title: "Nächsten Schritt bestimmen",
                    text:
                        "Finde heraus, was du als Nächstes erledigen musst.",
                    points: 5
                }

            ]
        }

    ],


    arbeit: [

        {
            id: "arbeit_1",
            icon: "👷",
            title: "Arbeit und Ausbildung entdecken",
            description:
                "Finde selbstständig Informationen zu Arbeit und Ausbildung.",
            tasks: [

                {
                    id: "arbeit_1_1",
                    title: "Agentur für Arbeit öffnen",
                    text:
                        "Öffne die Website der Agentur für Arbeit.",
                    points: 5,
                    link:
                        "https://www.arbeitsagentur.de/"
                },

                {
                    id: "arbeit_1_2",
                    title: "Berufe suchen",
                    text:
                        "Suche nach einem Beruf, der dich interessiert.",
                    points: 5
                },

                {
                    id: "arbeit_1_3",
                    title: "Ausbildung suchen",
                    text:
                        "Finde eine passende Ausbildung oder Weiterbildung.",
                    points: 5
                },

                {
                    id: "arbeit_1_4",
                    title: "Information speichern",
                    text:
                        "Speichere eine interessante Möglichkeit.",
                    points: 5
                }

            ]
        }

    ],


    wohnung: [

        {
            id: "wohnung_1",
            icon: "🏠",
            title: "Wohnungssuche",
            description:
                "Lerne, einen SOWON-Antrag selbstständig vorzubereiten.",
            tasks: [

                {
                    id: "wohnung_1_1",
                    title: "SOWON-Informationen finden",
                    text:
                        "Informiere dich über den SOWON-Antrag.",
                    points: 5
                },

                {
                    id: "wohnung_1_2",
                    title: "Voraussetzungen prüfen",
                    text:
                        "Prüfe, ob du die Voraussetzungen erfüllst.",
                    points: 5
                },

                {
                    id: "wohnung_1_3",
                    title: "Unterlagen vorbereiten",
                    text:
                        "Bereite die benötigten Unterlagen vor.",
                    points: 5
                },

                {
                    id: "wohnung_1_4",
                    title: "Antrag vorbereiten",
                    text:
                        "Bereite den nächsten Schritt für deinen Antrag vor.",
                    points: 5
                }

            ]
        }

    ]

};


/* =========================================================
   HILFSFUNKTIONEN
========================================================= */

function holeBenutzerId() {

    if (!aktuellerBenutzer) {
        return null;
    }

    return aktuellerBenutzer.id;

}


function userStorageKey(name) {

    const userId =
        holeBenutzerId();

    if (!userId) {
        return null;
    }

    return `${name}_${userId}`;

}


/* =========================================================
   AUTH STATUS
========================================================= */

function zeigeAuthStatus(
    nachricht,
    fehler = false
) {

    const status =
        document.getElementById("authStatus");

    if (!status) {
        return;
    }

    status.textContent =
        nachricht;

    status.style.color =
        fehler
            ? "#dc2626"
            : "#16a34a";

}


/* =========================================================
   REGISTRIERUNG
========================================================= */

async function registrieren() {

    const name =
        document.getElementById("authName")?.value.trim();

    const email =
        document.getElementById("authEmail")?.value.trim();

    const password =
        document.getElementById("authPassword")?.value;


    if (!name || !email || !password) {

        zeigeAuthStatus(
            "⚠️ Bitte fülle alle Felder aus.",
            true
        );

        return;
    }


    if (password.length < 6) {

        zeigeAuthStatus(
            "⚠️ Das Passwort muss mindestens 6 Zeichen haben.",
            true
        );

        return;
    }


    zeigeAuthStatus(
        "⏳ Konto wird erstellt..."
    );


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.signUp({

                email: email,

                password: password,

                options: {

                    data: {
                        username: name
                    },

                    emailRedirectTo:
                        window.location.href

                }

            });


        if (error) {

            console.error(
                "Registrierungsfehler:",
                error
            );

            zeigeAuthStatus(
                "❌ " + error.message,
                true
            );

            return;
        }


        if (!data.session) {

            zeigeAuthStatus(
                "✅ Registrierung erfolgreich! Bitte bestätige deine E-Mail-Adresse.",
                false
            );

            return;
        }


        benutzerIstAngemeldet(
            data.user
        );

    }

    catch (fehler) {

        console.error(
            fehler
        );

        zeigeAuthStatus(
            "❌ Bei der Registrierung ist ein Fehler aufgetreten.",
            true
        );

    }

}


/* =========================================================
   LOGIN
========================================================= */

async function anmelden() {

    const email =
        document.getElementById("authEmail")?.value.trim();

    const password =
        document.getElementById("authPassword")?.value;


    if (!email || !password) {

        zeigeAuthStatus(
            "⚠️ Bitte E-Mail und Passwort eingeben.",
            true
        );

        return;
    }


    zeigeAuthStatus(
        "⏳ Anmeldung läuft..."
    );


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.signInWithPassword({

                email,
                password

            });


        if (error) {

            console.error(
                "Login-Fehler:",
                error
            );

            zeigeAuthStatus(
                "❌ " + error.message,
                true
            );

            return;
        }


        if (!data.session) {

            zeigeAuthStatus(
                "⚠️ Keine aktive Sitzung gefunden.",
                true
            );

            return;
        }


        zeigeAuthStatus(
            "✅ Erfolgreich angemeldet!"
        );


        benutzerIstAngemeldet(
            data.user
        );

    }

    catch (fehler) {

        console.error(
            fehler
        );

        zeigeAuthStatus(
            "❌ Beim Anmelden ist ein Fehler aufgetreten.",
            true
        );

    }

}


/* =========================================================
   LOGOUT
========================================================= */

async function abmelden() {

    const {
        error
    } =
        await supabaseClient.auth.signOut();


    if (error) {

        console.error(
            "Logout-Fehler:",
            error
        );

        zeigeAuthStatus(
            "❌ Fehler beim Abmelden.",
            true
        );

        return;
    }


    aktuellerBenutzer =
        null;


    benutzerIstNichtAngemeldet();

    zeigeAuthStatus(
        "👋 Du wurdest erfolgreich abgemeldet."
    );

}


/* =========================================================
   BENUTZER ANGEMELDET
========================================================= */

function benutzerIstAngemeldet(user) {

    if (!user) {
        return;
    }


    aktuellerBenutzer =
        user;


    const authSection =
        document.getElementById("authSection");

    const logoutButton =
        document.getElementById("logoutButton");

    const main =
        document.querySelector("main");


    if (authSection) {
        authSection.style.display = "none";
    }


    if (logoutButton) {
        logoutButton.style.display = "block";
    }


    if (main) {
        main.style.display = "block";
    }


    const username =
        user.user_metadata?.username ||
        user.email ||
        "Benutzer";


    console.log(
        "👤 Angemeldet:",
        username
    );


    ladeBenutzerFortschritt();

}


/* =========================================================
   BENUTZER NICHT ANGEMELDET
========================================================= */

function benutzerIstNichtAngemeldet() {

    aktuellerBenutzer =
        null;


    const authSection =
        document.getElementById("authSection");

    const logoutButton =
        document.getElementById("logoutButton");

    const main =
        document.querySelector("main");


    if (authSection) {
        authSection.style.display = "flex";
    }


    if (logoutButton) {
        logoutButton.style.display = "none";
    }


    if (main) {
        main.style.display = "none";
    }


    punkte = 0;

    erledigteMissionen = 0;

    missionsPositionen = {};


    aktualisiereHUD();


    const rewardsContainer =
        document.getElementById("rewardsContainer");


    if (rewardsContainer) {
        rewardsContainer.innerHTML = "";
    }

}


/* =========================================================
   FORTSCHRITT LADEN
========================================================= */

function ladeBenutzerFortschritt() {

    if (!aktuellerBenutzer) {
        return;
    }


    const punkteKey =
        userStorageKey("integrations_punkte");

    const erledigtKey =
        userStorageKey("integrations_erledigte_anzahl");

    const positionKey =
        userStorageKey("integrations_missions_positionen");


    punkte =
        parseInt(
            localStorage.getItem(punkteKey) || "0",
            10
        );


    erledigteMissionen =
        parseInt(
            localStorage.getItem(erledigtKey) || "0",
            10
        );


    try {

        missionsPositionen =
            JSON.parse(
                localStorage.getItem(positionKey) || "{}"
            );

    }

    catch {

        missionsPositionen = {};

    }


    aktualisiereHUD();

    renderRewards();


    Object.keys(missionen).forEach(
        kategorie => {

            renderKategorie(
                kategorie
            );

        }
    );


    console.log(
        "⭐ Punkte:",
        punkte
    );

    console.log(
        "✅ Aufgaben:",
        erledigteMissionen
    );

}


/* =========================================================
   FORTSCHRITT SPEICHERN
========================================================= */

function speichereFortschritt() {

    if (!aktuellerBenutzer) {
        return;
    }


    localStorage.setItem(
        userStorageKey("integrations_punkte"),
        String(punkte)
    );


    localStorage.setItem(
        userStorageKey("integrations_erledigte_anzahl"),
        String(erledigteMissionen)
    );


    localStorage.setItem(
        userStorageKey("integrations_missions_positionen"),
        JSON.stringify(missionsPositionen)
    );

}


/* =========================================================
   HUD AKTUALISIEREN
========================================================= */

function aktualisiereHUD() {

    const punkteElement =
        document.getElementById("punkte");

    const punkteGross =
        document.getElementById("punkteGross");

    const erledigtElement =
        document.getElementById("erledigt");


    if (punkteElement) {
        punkteElement.textContent =
            punkte;
    }


    if (punkteGross) {
        punkteGross.textContent =
            punkte;
    }


    if (erledigtElement) {
        erledigtElement.textContent =
            erledigteMissionen;
    }

}


/* =========================================================
   KATEGORIE ANZEIGEN
========================================================= */

function zeigeKategorie(
    kategorie,
    element
) {

    document
        .querySelectorAll(".category-card")
        .forEach(card => {

            card.classList.remove("active");

        });


    if (element) {
        element.classList.add("active");
    }


    document
        .querySelectorAll(".category-content")
        .forEach(content => {

            content.classList.remove("active");

        });


    const content =
        document.getElementById(kategorie);


    if (content) {

        content.classList.add("active");

        renderKategorie(kategorie);

        content.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    const backButton =
        document.getElementById("backButton");


    if (backButton) {

        backButton.classList.add("show");

    }

}


/* =========================================================
   STARTSEITE
========================================================= */

function zeigeStartseite() {

    document
        .querySelectorAll(".category-content")
        .forEach(content => {

            content.classList.remove("active");

        });


    document
        .querySelectorAll(".category-card")
        .forEach(card => {

            card.classList.remove("active");

        });


    const backButton =
        document.getElementById("backButton");


    if (backButton) {

        backButton.classList.remove("show");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   KATEGORIE RENDERN
========================================================= */

function renderKategorie(kategorie) {

    const container =
        document.getElementById(
            `missionContainer-${kategorie}`
        );


    if (!container) {
        return;
    }


    const liste =
        missionen[kategorie];


    if (!liste) {
        return;
    }


    container.innerHTML = "";


    liste.forEach(
        mission => {

            const position =
                missionsPositionen[mission.id] || 0;


            const abgeschlossen =
                position >= mission.tasks.length;


            const missionElement =
                document.createElement("div");


            missionElement.className =
                "mission";


            missionElement.innerHTML = `

                <div class="mission-top">

                    <div class="mission-icon">
                        ${mission.icon}
                    </div>

                    <div class="points">
                        ${mission.tasks.reduce(
                            (sum, task) =>
                                sum + task.points,
                            0
                        )} ⭐
                    </div>

                </div>


                <h3>
                    ${mission.title}
                </h3>


                <p>
                    ${mission.description}
                </p>


                <div
                    class="mission-workspace show"
                >

                    <div class="task">

                        ${
                            abgeschlossen

                            ? `

                                <strong>
                                    🎉 Mission abgeschlossen!
                                </strong>

                                <p>
                                    Du hast alle Aufgaben dieser Mission erledigt.
                                </p>

                            `

                            : `

                                <strong>
                                    🎯 Aufgabe ${
                                        position + 1
                                    } von ${
                                        mission.tasks.length
                                    }
                                </strong>

                                <p>
                                    ${
                                        mission.tasks[position].title
                                    }
                                </p>

                                <p style="margin-top:8px;">
                                    ${
                                        mission.tasks[position].text
                                    }
                                </p>

                                ${
                                    mission.tasks[position].link

                                    ? `

                                        <button
                                            class="game-button"
                                            style="margin-top:15px;"
                                            onclick="oeffneAufgabe('${mission.tasks[position].link}')"
                                        >
                                            🌐 Website öffnen
                                        </button>

                                    `

                                    : ""
                                }


                                <button
                                    class="mission-button"
                                    style="margin-top:15px;"
                                    onclick="aufgabeErledigt(
                                        '${kategorie}',
                                        '${mission.id}',
                                        '${mission.tasks[position].id}',
                                        ${mission.tasks[position].points}
                                    )"
                                >
                                    ✅ Aufgabe erledigt
                                </button>

                            `

                        }

                    </div>

                </div>

            `;


            container.appendChild(
                missionElement
            );

        }
    );

}


/* =========================================================
   WEBSITE ÖFFNEN
========================================================= */

function oeffneAufgabe(link) {

    if (!link) {
        return;
    }


    window.open(
        link,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   AUFGABE ERLEDIGT
========================================================= */

function aufgabeErledigt(
    kategorie,
    missionId,
    taskId,
    taskPoints
) {

    if (!aktuellerBenutzer) {

        zeigeAuthStatus(
            "⚠️ Bitte zuerst anmelden.",
            true
        );

        return;
    }


    const mission =
        missionen[kategorie]?.find(
            m => m.id === missionId
        );


    if (!mission) {
        return;
    }


    const position =
        missionsPositionen[missionId] || 0;


    const task =
        mission.tasks[position];


    if (!task) {
        return;
    }


    if (task.id !== taskId) {
        return;
    }


    punkte +=
        Number(taskPoints) || task.points;


    erledigteMissionen++;


    missionsPositionen[missionId] =
        position + 1;


    speichereFortschritt();


    aktualisiereHUD();


    renderRewards();


    renderKategorie(
        kategorie
    );


    zeigeErfolg(
        task.points
    );


    pruefeRewardFreischaltung();

}


/* =========================================================
   ERFOLGSANZEIGE
========================================================= */

function zeigeErfolg(
    taskPoints
) {

    const overlay =
        document.getElementById(
            "rewardModalOverlay"
        );


    if (!overlay) {
        return;
    }


    overlay.innerHTML = `

        <div
            class="reward-modal"
            onclick="event.stopPropagation()"
        >

            <button
                class="reward-modal-close"
                onclick="schliesseRewardModal()"
            >
                ✕
            </button>

            <div class="reward-modal-badge">
                Aufgabe geschafft!
            </div>

            <div class="reward-modal-icon">
                🎉
            </div>

            <h2>
                Sehr gut!
            </h2>

            <p class="reward-modal-text">
                Du hast eine Aufgabe erfolgreich abgeschlossen.
            </p>

            <div class="reward-modal-points">
                ⭐ +${taskPoints} Punkte
            </div>

            <br>

            <button
                class="reward-modal-button"
                onclick="schliesseRewardModal()"
            >
                Weiter 🚀
            </button>

        </div>

    `;


    overlay.classList.add("show");


    erzeugeKonfetti();

}


/* =========================================================
   REWARD FREISCHALTUNG
========================================================= */

function pruefeRewardFreischaltung() {

    const vorherige =
        JSON.parse(
            localStorage.getItem(
                userStorageKey("integrations_rewards")
            ) || "[]"
        );


    const neueFreigeschaltete =
        [];


    rewards.forEach(
        reward => {

            if (
                punkte >= reward.points &&
                !vorherige.includes(reward.id)
            ) {

                vorherige.push(
                    reward.id
                );

                neueFreigeschaltete.push(
                    reward
                );

            }

        }
    );


    localStorage.setItem(
        userStorageKey("integrations_rewards"),
        JSON.stringify(vorherige)
    );


    renderRewards();


    if (neueFreigeschaltete.length > 0) {

        zeigeRewardFreigeschaltet(
            neueFreigeschaltete[0]
        );

    }

}


/* =========================================================
   REWARDS RENDERN
========================================================= */

function renderRewards() {

    const container =
        document.getElementById(
            "rewardsContainer"
        );


    if (!container) {
        return;
    }


    if (!aktuellerBenutzer) {

        container.innerHTML =
            "";

        return;
    }


    const freigeschaltet =
        JSON.parse(
            localStorage.getItem(
                userStorageKey("integrations_rewards")
            ) || "[]"
        );


    container.innerHTML = "";


    rewards.forEach(
        reward => {

            const unlocked =
                freigeschaltet.includes(
                    reward.id
                );


            const div =
                document.createElement("div");


            div.className =
                "reward" +
                (
                    unlocked
                        ? " unlocked"
                        : ""
                );


            div.innerHTML = `

                <div class="reward-icon">
                    ${reward.icon}
                </div>

                <h3>
                    ${reward.name}
                </h3>

                <p>
                    ${reward.description}
                </p>

                <div class="reward-points">
                    ${reward.points} ⭐
                </div>

                <div class="reward-status">
                    ${
                        unlocked
                            ? "✅ Freigeschaltet"
                            : `🔒 Noch ${Math.max(
                                0,
                                reward.points - punkte
                              )} Punkte`
                    }
                </div>

            `;


            container.appendChild(
                div
            );

        }
    );

}


/* =========================================================
   REWARD FREIGESCHALTET POPUP
========================================================= */

function zeigeRewardFreigeschaltet(
    reward
) {

    const overlay =
        document.getElementById(
            "rewardModalOverlay"
        );


    if (!overlay) {
        return;
    }


    overlay.innerHTML = `

        <div
            class="reward-modal"
            onclick="event.stopPropagation()"
        >

            <button
                class="reward-modal-close"
                onclick="schliesseRewardModal()"
            >
                ✕
            </button>

            <div class="reward-modal-badge">
                Neue Belohnung!
            </div>

            <div class="reward-modal-icon">
                ${reward.icon}
            </div>

            <h2>
                ${reward.name}
            </h2>

            <p class="reward-modal-text">
                ${reward.description}
            </p>

            <div class="reward-modal-points">
                🏆 Freigeschaltet!
            </div>

            <br>

            <button
                class="reward-modal-button"
                onclick="schliesseRewardModal()"
            >
                Großartig! 🎉
            </button>

        </div>

    `;


    overlay.classList.add("show");


    erzeugeKonfetti();

}


/* =========================================================
   REWARD MODAL SCHLIESSEN
========================================================= */

function schliesseRewardModal() {

    const overlay =
        document.getElementById(
            "rewardModalOverlay"
        );


    if (!overlay) {
        return;
    }


    overlay.classList.remove(
        "show"
    );


    overlay.innerHTML = "";

}


/* =========================================================
   KONFETTI
========================================================= */

function erzeugeKonfetti() {

    const overlay =
        document.getElementById(
            "rewardModalOverlay"
        );


    if (!overlay) {
        return;
    }


    for (
        let i = 0;
        i < 40;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti-piece";


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.animationDuration =
            (2 + Math.random() * 2) + "s";


        piece.style.animationDelay =
            Math.random() * .5 + "s";


        piece.style.setProperty(
            "--drift",
            (
                -100 +
                Math.random() * 200
            ) + "px"
        );


        piece.style.background =
            [
                "#2563eb",
                "#16a34a",
                "#f59e0b",
                "#dc2626",
                "#7c3aed"
            ][
                Math.floor(
                    Math.random() * 5
                )
            ];


        overlay.appendChild(
            piece
        );


        setTimeout(
            () => {

                piece.remove();

            },
            4500
        );

    }

}


/* =========================================================
   SPIEL ZURÜCKSETZEN
========================================================= */

function spielZuruecksetzen() {

    if (!aktuellerBenutzer) {

        return;
    }


    const bestaetigt =
        confirm(
            "Möchtest du deinen gesamten Fortschritt wirklich zurücksetzen?"
        );


    if (!bestaetigt) {
        return;
    }


    const keys = [

        "integrations_punkte",

        "integrations_erledigte_anzahl",

        "integrations_missions_positionen",

        "integrations_rewards"

    ];


    keys.forEach(
        key => {

            localStorage.removeItem(
                userStorageKey(key)
            );

        }
    );


    punkte = 0;

    erledigteMissionen = 0;

    missionsPositionen = {};


    aktualisiereHUD();

    renderRewards();


    Object.keys(missionen).forEach(
        kategorie => {

            renderKategorie(
                kategorie
            );

        }
    );


    alert(
        "🔄 Dein Fortschritt wurde zurückgesetzt."
    );

}


/* =========================================================
   SUPABASE SESSION BEIM START
========================================================= */

async function authBeimStart() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.getSession();


        if (error) {

            console.error(
                "Session-Fehler:",
                error
            );

            benutzerIstNichtAngemeldet();

            return;
        }


        if (data.session) {

            console.log(
                "✅ Bestehende Session gefunden."
            );


            benutzerIstAngemeldet(
                data.session.user
            );

        }

        else {

            console.log(
                "ℹ️ Kein Benutzer angemeldet."
            );


            benutzerIstNichtAngemeldet();

        }


        supabaseClient.auth.onAuthStateChange(
            (
                event,
                session
            ) => {

                console.log(
                    "Auth Event:",
                    event
                );


                if (session) {

                    benutzerIstAngemeldet(
                        session.user
                    );

                }

                else {

                    benutzerIstNichtAngemeldet();

                }

            }
        );

    }

    catch (fehler) {

        console.error(
            "Auth Startfehler:",
            fehler
        );

        benutzerIstNichtAngemeldet();

    }

}


/* =========================================================
   APP START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "🚀 Exploring Integration startet..."
        );


        /*
         * Hauptbereich zunächst verstecken.
         * Erst nach Login anzeigen.
         */

        const main =
            document.querySelector("main");


        if (main) {
            main.style.display = "none";
        }


        authBeimStart();

    }
);
