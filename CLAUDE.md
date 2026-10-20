# Handboll Målvakt Tracker

Fristående HTML-app (`handball_g_trk_ipad.html`), PWA via `manifest.json` och `sw.js`.

## Inloggning

Det finns ingen inloggning i betydelsen konto, lösenord eller PIN. Det finns en profilskärm (`#login`) som visas när det inte finns något aktivt lag (`activeClub()` är null).

**Vad användaren anger** (`#loginGo`, rad ca 3317):
- Lagnamn (obligatoriskt), ålderskull (valfri, t.ex. P14), logga (valfri, komprimeras till 256 px).
- Inget lösenord eller PIN. Lagfärgen sätts till `#ffd60a`.
- Alternativ: "Återställ från backup" (JSON) direkt på inloggningssidan.
- Fler lag skapas senare via "Mina lag" (`newClub`), med lagnamn, ålderskull, logga och färg.

**Vad som sparas och var:**
- IndexedDB, databas `handball_gk` (version 1), store `kv`, nyckel `root`. Hela appens data ligger i det ena objektet `{clubs:[…], activeClubId, theme}`. Sparas med `save()` (coalescad, fire-and-forget).
- localStorage: nyckeln `handball_gk_v3` används bara som legacy. `loadRoot()` läser den om IndexedDB är tom och migrerar över den en gång. Appen skriver ingenting nytt dit. Nollställ tar bort nyckeln.
- Service worker-cache: `handboll-tracker-v1`.
- Ingen sessionStorage. Tema ligger i `root.theme`.

**Är datan knuten till inloggningen?** Nej. Det finns inget konto. All data på enheten tillhör appen. Datan är uppdelad per lag (`clubs[]`) och `db`-proxyn pekar på det aktiva laget (`activeClubId`), men alla som öppnar appen på enheten ser alla lag och kan byta fritt. Ingen åtkomstkontroll.

**Utloggning:** Finns inte. Det går inte att logga ut och profilskärmen visas inte igen så länge något lag finns. Det som liknar det:
- "Byt lag" (`switchClub`) byter aktivt lag, ingen data raderas.
- Radera ett lag tar bort laget och dess data. Är det sista laget laddas sidan om (`location.reload()`) och profilskärmen visas.
- "Nollställ allt" (`#resetAllBtn`, två bekräftelser) kör `idbClear()`, tar bort `handball_gk_v3` och visar profilskärmen igen. Detta raderar all data.

**IndexedDB-databasnamn:** `handball_gk`.

Jämförelsen mellan Tracker, Teambuilder och Playbook (lika, skiljer, vad som krockar på samma webbadress) finns i sviterepot `trenchrox/handbollssviten`, `CLAUDE.md`.
