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


### Jämförelse mellan sviteappar (Tracker, Teambuilder, Playbook)

| | Tracker | Teambuilder | Playbook |
| --- | --- | --- | --- |
| Inloggning | Profil (lagnamn) | Välkomstruta (valfria fält) | Ingen |
| Konto/server | Nej | Nej | Nej |
| IndexedDB-namn | `handball_gk` | `teambuilder` | `handball_playbook` |
| Store / nyckel | `kv` / `root` | `kv` / `root` | `kv` / `root` |
| localStorage | Bara `handball_gk_v3` (legacy, läses/rensas) | Används inte | Används inte |
| Datamodell | `{clubs[], activeClubId, theme}`, flera lag | En trupp, enda root | En bank, enda root |
| Utloggning | Finns inte (bara "Nollställ allt") | Finns inte ("Lås" gäller bara PIN) | Finns inte |
| Service worker-cache | `handboll-tracker-v1` | Ingen SW | `handboll-playbook-v1` |

**Lika:** allt lokalt, ingen server. Samma IndexedDB-mönster (`idbOpen/idbGet/idbSet/idbClear`, store `kv`, nyckel `root`, version 1). Inget riktigt konto: den som har enheten har datan. Backup som JSON-export/import. Nollställ allt = `idbClear()`.

**Skiljer:** bara Tracker har en profil som måste skapas före appen kan användas, och bara den hanterar flera lag. Teambuilder har valfri välkomstruta och en PIN som låser delar av appen, inte appen. Playbook har inget alls. Teambuilder saknar service worker och manifest.

**Skulle krocka på samma webbadress med delad lagring:**
- Samma origin delar IndexedDB och localStorage. De tre databasnamnen är olika, så IndexedDB-datan krockar *inte* idag. Det gäller bara så länge nya namn inte återanvänds.
- `idbOpen` anropar `indexedDB.open(NAMN, 1)` med version 1 och skapar store `kv` i `onupgradeneeded`. Läggs en app till som öppnar en befintlig databas med högre version, eller byter store-namn, går det inte att öppna den på ett säkert sätt.
- localStorage: bara Tracker använder `handball_gk_v3`. Nyckeln är unik idag, men det finns inget prefix som skyddar nya nycklar.
- Service workers: `sw.js` i samma mapp/scope registreras av flera sidor. En `sw.js` per app på samma origin och scope ersätter den andra. Cache-namnen är olika (`handboll-tracker-v1`, `handboll-playbook-v1`), men `activate` i varje SW raderar **alla** cachar som inte har dess eget namn, så den ena appens SW tömmer den andras cache.
- `manifest.json` har `start_url` per app. Två manifest på samma origin kan inte bägge vara "appen" för installation.
- "Nollställ allt" rensar bara appens egen databas, men Trackers rensar även localStorage-nyckeln. En gemensam sviteinloggning måste bestämma vad utloggning betyder, eftersom ingen app har något utloggningsbegrepp idag.
- Profil: Trackers `clubs` är en egen lagmodell. Teambuilders `squadName`/`logo` och Trackers klubbnamn/logga är separata kopior av samma sak, utan koppling.
- Onboarding: Trackers `#login` täcker hela skärmen tills profil finns. Teambuilders `#welcome` visas om `root.onboarded` är falsk. Delar apparna ett skal måste en gemensam ingång avgöra vilken som gäller.
