
// =====================================================
// EXPLORING INTEGRATION
// Nutzer-Chat
// =====================================================

let aktuelleConversation = null;
let chatSubscription = null;


// =====================================================
// Chat öffnen
// =====================================================

async function beraterChatOeffnen(
    kategorie = null,
    missionId = null
) {

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();

    if (!user) {
        alert("Bitte melde dich zuerst an.");
        return;
    }

    const {
        data,
        error
    } = await supabase
        .from("chat_conversations")
        .insert({
            user_id: user.id,
            category: kategorie,
            mission_id: missionId
        })
        .select()
        .single();

    if (error) {

        console.error(error);

        alert(
            "Der Chat konnte leider nicht gestartet werden."
        );

        return;
    }

    aktuelleConversation = data;

    chatFensterAnzeigen();

    chatNachrichtenLaden();

    chatRealtimeStarten();
}


// =====================================================
// Chatfenster
// =====================================================

function chatFensterAnzeigen() {

    let chat = document.getElementById(
        "beraterChat"
    );

    if (chat) {
        chat.classList.add("aktiv");
        return;
    }

    chat = document.createElement("div");

    chat.id = "beraterChat";

    chat.innerHTML = `

        <div class="berater-chat-box">

            <div class="berater-chat-header">

                <div>
                    👩🏻‍💼💬
                    <strong>Berater-Chat</strong>
                </div>

                <button
                    onclick="beraterChatSchliessen()"
                >
                    ×
                </button>

            </div>


            <div
                id="beraterChatNachrichten"
                class="berater-chat-nachrichten"
            >
            </div>


            <div class="berater-chat-input">

                <input
                    id="beraterChatInput"
                    type="text"
                    placeholder="Nachricht schreiben..."
                >

                <button
                    onclick="beraterNachrichtSenden()"
                >
                    ➤
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(chat);
}


// =====================================================
// Nachrichten laden
// =====================================================

async function chatNachrichtenLaden() {

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();

    if (!user || !aktuelleConversation) {
        return;
    }

    const {
        data,
        error
    } = await supabase
        .from("chat_messages")
        .select("*")
        .eq(
            "conversation_id",
            aktuelleConversation.id
        )
        .order("created_at", {
            ascending: true
        });

    if (error) {
        console.error(error);
        return;
    }

    const container =
        document.getElementById(
            "beraterChatNachrichten"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    data.forEach(
        nachricht => {

            const eigeneNachricht =
                nachricht.sender_id === user.id;

            const div =
                document.createElement("div");

            div.className =
                eigeneNachricht
                    ? "chat-nachricht eigene"
                    : "chat-nachricht berater";

            div.textContent =
                nachricht.message;

            container.appendChild(div);
        }
    );

    container.scrollTop =
        container.scrollHeight;
}


// =====================================================
// Nachricht senden
// =====================================================

async function beraterNachrichtSenden() {

    const input =
        document.getElementById(
            "beraterChatInput"
        );

    if (!input) {
        return;
    }

    const text =
        input.value.trim();

    if (!text || !aktuelleConversation) {
        return;
    }

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();

    if (!user) {
        return;
    }

    const {
        error
    } = await supabase
        .from("chat_messages")
        .insert({

            conversation_id:
                aktuelleConversation.id,

            sender_id:
                user.id,

            message:
                text
        });

    if (error) {

        console.error(error);

        alert(
            "Nachricht konnte nicht gesendet werden."
        );

        return;
    }

    input.value = "";

    chatNachrichtenLaden();
}


// =====================================================
// Realtime
// =====================================================

function chatRealtimeStarten() {

    if (!aktuelleConversation) {
        return;
    }

    if (chatSubscription) {
        supabase.removeChannel(
            chatSubscription
        );
    }

    chatSubscription =
        supabase
            .channel(
                "chat-" +
                aktuelleConversation.id
            )
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "chat_messages",
                    filter:
                        "conversation_id=eq." +
                        aktuelleConversation.id
                },
                () => {

                    chatNachrichtenLaden();
                }
            )
            .subscribe();
}


// =====================================================
// Chat schließen
// =====================================================

function beraterChatSchliessen() {

    const chat =
        document.getElementById(
            "beraterChat"
        );

    if (chat) {
        chat.classList.remove("aktiv");
    }
}


window.beraterChatOeffnen =
    beraterChatOeffnen;

window.beraterChatSchliessen =
    beraterChatSchliessen;

window.beraterNachrichtSenden =
    beraterNachrichtSenden;
