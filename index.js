```javascript
/* =========================================================
   EXPLORING INTEGRATION
   Integrations-Navigator München

   AUTHENTIFIZIERUNG
   - Registrierung
   - E-Mail-Bestätigung
   - Login
   - Logout
   - Benutzername
   - Benutzerbezogene Gamification-Daten
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
   BENUTZER-ID
========================================================= */

function holeBenutzerId() {

    if (!aktuellerBenutzer) {
        return null;
    }

    return aktuellerBenutzer.id;
}


/* =========================================================
   BENUTZERBEZOGENER LOCALSTORAGE-SCHLÜSSEL
========================================================= */

function userStorageKey(name) {

    const userId =
        holeBenutzerId();

    if (!userId) {
        return null;
    }

    return `${name}_${userId}`;

}


/* =========================================================
   REGISTRIERUNG
========================================================= */

async function registrieren() {

    const name =
        document.getElementById(
            "authName"
        )?.value.trim();

    const email =
        document.getElementById(
            "authEmail"
        )?.value.trim();

    const password =
        document.getElementById(
            "authPassword"
        )?.value;


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
        "⏳ Konto wird erstellt...",
        false
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
                    }

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


        console.log(
            "Registrierung erfolgreich:",
            data
        );


        /*
         * E-Mail-Bestätigung aktiviert:
         * data.session ist zunächst null.
         */

        if (!data.session) {

            zeigeAuthStatus(
                "✅ Registrierung erfolgreich! Bitte bestätige deine E-Mail-Adresse. Danach kannst du dich anmelden.",
                false
            );

            return;
        }


        /*
         * Falls E-Mail-Bestätigung deaktiviert ist.
         */

        aktuellerBenutzer =
            data.user;


        benutzerIstAngemeldet(
            data.user
        );

    }

    catch (fehler) {

        console.error(
            "Registrierungsfehler:",
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
        document.getElementById(
            "authEmail"
        )?.value.trim();

    const password =
        document.getElementById(
            "authPassword"
        )?.value;


    if (!email || !password) {

        zeigeAuthStatus(
            "⚠️ Bitte E-Mail und Passwort eingeben.",
            true
        );

        return;
    }


    zeigeAuthStatus(
        "⏳ Anmeldung läuft...",
        false
    );


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.signInWithPassword({

                email: email,

                password: password

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
                "⚠️ Es konnte keine aktive Sitzung erstellt werden.",
                true
            );

            return;
        }


        aktuellerBenutzer =
            data.user;


        zeigeAuthStatus(
            "✅ Erfolgreich angemeldet!",
            false
        );


        benutzerIstAngemeldet(
            data.user
        );

    }

    catch (fehler) {

        console.error(
            "Login-Fehler:",
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

    try {

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


        /*
         * App schließen / Login anzeigen
         */

        benutzerIstNichtAngemeldet();


        zeigeAuthStatus(
            "👋 Du wurdest erfolgreich abgemeldet.",
            false
        );

    }

    catch (fehler) {

        console.error(
            "Logout-Fehler:",
            fehler
        );

        zeigeAuthStatus(
            "❌ Beim Abmelden ist ein Fehler aufgetreten.",
            true
        );

    }

}


/* =========================================================
   BENUTZER ANGEMELDET
========================================================= */

function benutzerIstAngemeldet(
    user
) {

    if (!user) {
        return;
    }


    aktuellerBenutzer =
        user;


    console.log(
        "✅ Benutzer angemeldet:",
        user.email
    );


    console.log(
        "👤 Supabase User-ID:",
        user.id
    );


    const authSection =
        document.getElementById(
            "authSection"
        );


    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    const main =
        document.querySelector(
            "main"
        );


    if (authSection) {

        authSection.style.display =
            "none";

    }


    if (logoutButton) {

        logoutButton.style.display =
            "block";

    }


    if (main) {

        main.style.display =
            "block";

    }


    /*
     * Benutzername
     */

    const username =
        user.user_metadata?.username ||
        user.email ||
        "Benutzer";


    console.log(
        "👤 Benutzername:",
        username
    );


    /*
     * Benutzerbezogene Daten laden
     */

    ladeBenutzerFortschritt();

}


/* =========================================================
   BENUTZER NICHT ANGEMELDET
========================================================= */

function benutzerIstNichtAngemeldet() {

    aktuellerBenutzer =
        null;


    const authSection =
        document.getElementById(
            "authSection"
        );


    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    const main =
        document.querySelector(
            "main"
        );


    if (authSection) {

        authSection.style.display =
            "flex";

    }


    if (logoutButton) {

        logoutButton.style.display =
            "none";

    }


    if (main) {

        main.style.display =
            "none";

    }


    /*
     * Anzeige zurücksetzen.
     *
     * Die Daten des Benutzers werden NICHT gelöscht.
     */

    punkte = 0;

    erledigteMissionen = 0;

    missionsPositionen = {};


    aktualisiereHUD();


    const rewardsContainer =
        document.getElementById(
            "rewardsContainer"
        );


    if (rewardsContainer) {

        rewardsContainer.innerHTML =
            "";

    }

}


/* =========================================================
   AUTH STATUS
========================================================= */

function zeigeAuthStatus(
    nachricht,
    fehler = false
) {

    const status =
        document.getElementById(
            "authStatus"
        );


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
   FORTSCHRITT DES BENUTZERS LADEN
========================================================= */

function ladeBenutzerFortschritt() {

    if (!aktuellerBenutzer) {
        return;
    }


    const punkteKey =
        userStorageKey(
            "integrations_punkte"
        );


    const erledigtKey =
        userStorageKey(
            "integrations_erledigte_anzahl"
        );


    const positionKey =
        userStorageKey(
            "integrations_missions_positionen"
        );


    punkte =
        parseInt(
            localStorage.getItem(
                punkteKey
            ) || "0"
        );


    erledigteMissionen =
        parseInt(
            localStorage.getItem(
                erledigtKey
            ) || "0"
        );


    missionsPositionen =
        JSON.parse(
            localStorage.getItem(
                positionKey
            ) || "{}"
        );


    aktualisiereHUD();

    renderRewards();


    Object.keys(
        missionen
    ).forEach(
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
   AUTH BEIM START
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


        /*
         * Änderungen der Session überwachen.
         */

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
```
