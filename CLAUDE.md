# Handboll Målvakt Tracker

PWA för iPad där en tränare registrerar skott mot egen målvakt under matcher, scoutar motståndarlag och ser statistik. Appen är på svenska (UI, kommentarer och commit-meddelanden). Utvecklingen skedde tidigare i en chatt där filen skickades fram och tillbaka. Från och med nu utvecklas den i det här repot.

## Hårda regler

- **Appen är en enda HTML-fil**, `handball_g_trk_ipad.html`. Dela inte upp CSS eller JS i separata filer.
- Inget byggsteg, inga beroenden, ingen paketfil. Filen öppnas direkt i webbläsaren eller serveras statiskt.
- Allt är på klientsidan. Ingen server, ingen inloggning mot backend.
- Ändra aldrig IndexedDB-strukturen eller datamodellen utan migrering. Användarna har riktig data på sina enheter (se "Datamodell").

## Filer

| Fil | Innehåll |
|---|---|
| `handball_g_trk_ipad.html` | Hela appen (~3360 rader, ~460 kB). Mycket av storleken är base64-inbäddade typsnitt och bilder. |
| `manifest.json` | PWA-manifest: `display: standalone`, svart tema, `start_url: ./handball_g_trk_ipad.html`, `icons: []`. |
| `sw.js` | Service worker för offline-stöd. |

## Filens struktur (`handball_g_trk_ipad.html`)

Ungefärliga radnummer, de flyttar sig när filen ändras. Sök på namnen.

1. **`<head>`** (rad 1–677): meta (viewport utan zoom, `apple-mobile-web-app-capable`), `<link rel="manifest">`, `@font-face` med base64-woff (två typsnitt, bl.a. `Big Shoulders` och `Instrument Sans`) och ett stort `<style>`-block.
   - CSS-variabler på `:root` för mörkt tema, med ljust tema via `body.light`. Exempel: `--shadow`, `--login-grad`, `--accent`, `--save`, `--goal`.
   - Sektioner markerade med kommentarer, t.ex. `/* ---------- Login / onboarding ---------- */`.
   - Responsivt via `@media (max-width: 820px), (orientation: portrait)` m.fl. Hjälpklassen `.hidden` döljer vyer.
2. **`<body>`-markup** (rad ~679–1038): först `#login`, sedan `<nav>` (sidomeny), sedan `<main>` med en `<div class="view" id="v…">` per vy.
3. **Ett `<script>`-block** (rad 1039–3357), ett enda globalt script utan moduler. Ordning:
   - Konstanter (`KEY`, `APP_LOGO` och `LOGIN_BG` som base64, `POSITIONS`, `FAN`, `TYPES`, `ZONES`, `COLORS`, `SVG`-ikoner).
   - Tillstånd: `root`, `db` (proxy), `cur`, `pick`.
   - Lagringslager (IndexedDB), `normalizeRoot`, `loadRoot`, `save`, `updateStorageMeter`.
   - Hjälpfunktioner: `uid`, `esc`, `compressImage`, `show`, `updateCtx`.
   - Lagbank/scouting, säsonger/cuper, matchregistrering, statistik, PDF-export, backup/import, tema, modaler, klubbval, login, `boot()`, registrering av service worker.

### Vyer

`show(id)` visar en vy och döljer övriga. Vyerna listas i arrayen `views`:

| Vy-id | Syfte |
|---|---|
| `vStats` | Målvakter (startvy), sammanfattning |
| `vGoalie` | Enskild målvakt |
| `vCompare` | Jämför målvakter |
| `vSeasons` / `vCups` | Lista över säsonger / cuper |
| `vComp` | En säsong eller cup med dess matcher |
| `vMatch` | Matchregistrering (helskärm via `body.match-fullscreen`) |
| `vBank` | Lagbank (motståndarlag) |
| `vScout` / `vScoutPlayer` | Scoutingrapport för lag / spelare |
| `vHelp` | Hjälp ("Så funkar appen") |

Sidomenyn markerar aktiv länk via `navMap` i `show()`. Under-vyer mappas till sin huvudvy.

### Huvudfunktioner

- **Matchregistrering:** `openMatch`, `buildCaptureUI`, `commit(outcome)` (`save`/`goal`/`out`), matchklocka (`matchElapsedSec`, `toggleClock`, `checkPeriodBoundary`), perioder (`PERIOD_NAMES`), målvaktsminuter (`setGoalieMinutes`), låsning av match (`m.locked`, `applyLockUI`).
- **Statistik:** `aggregate`, `groupPct`, `shotsForGoalie`, `renderStats`, `renderGoalieView`, `renderCompare`.
- **PDF/utskrift:** `buildGoaliePDF` och `buildMatchPDF` bygger en separat HTML-sträng med egen CSS (`@page` A4) och öppnar den för utskrift.
- **Backup:** `exportBackup` (JSON-nedladdning), `importBackup` (accepterar nytt format och äldre "legacy"-format).
- **Klubbar:** flera klubbar stöds (`openClubSwitcher`, `switchClub`, `newClub`). `activeClub()` ger aktiv klubb.
- **Tema:** `applyTheme`, sparas i `root.theme`.

### Konventioner i koden

- Vanilla JS, `var`/`let`/`const` blandat, ingen ramverkskod.
- Rendering sker genom att bygga HTML-strängar och sätta `innerHTML`. Användartext ska alltid gå genom `esc()`.
- Eventhanterare sätts oftast som `el.onclick = …`.
- `db` är en proxy över aktiv klubb (`db.teams`, `db.seasons`, `db.cups`, `db.profileId`) plus `db.theme`. Skriv ändringar via `db`/`root` och anropa sedan `save()`.
- ID:n skapas med `uid()`: `Date.now().toString(36)` plus fyra slumptecken.

## Datamodell (IndexedDB)

- **Databasnamn:** `handball_gk`
- **Schemaversion:** `1` (andra argumentet till `indexedDB.open(IDB_NAME, 1)`). Det finns ingen `onupgradeneeded`-logik utöver att skapa storen.
- **Object store:** `kv` (utan keyPath, nycklar anges vid `put`).
- **Nyckel:** `root`. **Hela appens data ligger som ett enda JSON-objekt under den nyckeln.** Det finns alltså inga separata stores för matcher, skott eller lag.
- **Skrivning:** `save()` skriver hela `root` varje gång. Den är asynkron, sammanslår snabba anrop (`_saveInFlight`/`_saveQueued`) och visar en dialog vid full lagring (QuotaExceeded) eller andra fel.

Form på `root`:

```
root = { clubs: [club], activeClubId, theme: 'dark'|'light' }

club = { id, name, logo, color, ageGroup?, profileId,
         goalies: [{ id, name, photo, number }],
         teams:   [team],      // motståndarlag (och ev. egna lag)
         seasons: [comp],
         cups:    [comp] }

comp  = { id, name, matches: [match] }

team  = { id, name, logo, color, own, scope?: {type, id}, players?: [player], ... }
player = { id, placements: [], ...fält från playerEditor }

match = { id, oppId, date, gkId, gk, shots: [shot], halfLen, fullLen,
          clockSec, clockRunning, clockStartedAt?, gkInClock, home,
          scoreOwn, scoreOpp, kind, period?, locked? }

shot  = { id, t, zone, pos, type, saved, shotGk, period, clock,
          breakthrough?, out? }
```

Migreringar som redan finns:
- **localStorage → IndexedDB:** `loadRoot()` läser IndexedDB först. Om den är tom och det finns data i `localStorage['handball_gk_v3']` (konstanten `KEY`) kopieras den över en gång. localStorage-nyckeln tas bort först vid "Nollställ allt".
- **Äldre enklubbsformat** (`{teams, seasons, cups, profileId, theme}`) konverteras till `{clubs:[…]}` i `normalizeRoot()` och i `importBackup()`.

Backupfilen är `JSON.stringify(root)` (filnamn `handboll-tracker-backup-ÅÅÅÅ-MM-DD.json`). Den har **inget eget versionsfält**.

## Inloggning

Det finns ingen inloggning i betydelsen konto, lösenord eller PIN, och det är avsiktligt. Lägg inte till PIN eller lösenord utan att användaren ber om det. Det finns en profilskärm (`#login`) som visas när det inte finns något aktivt lag (`activeClub()` är null).

**Vad användaren anger** (`#loginGo`, rad ca 3317):
- Lagnamn (obligatoriskt), ålderskull (valfri, t.ex. P14), logga (valfri, komprimeras till 256 px).
- Inget lösenord eller PIN. Lagfärgen sätts till `#ffd60a`.
- Alternativ: "Återställ från backup" (JSON) direkt på inloggningssidan.
- Fler lag skapas senare via "Mina lag" (`newClub`), med lagnamn, ålderskull, logga och färg.

**Vad som sparas och var:**
- IndexedDB, databas `handball_gk` (version 1), store `kv`, nyckel `root`. Hela appens data ligger i det ena objektet `{clubs:[…], activeClubId, theme}`. Sparas med `save()` (coalescad, fire-and-forget).
- localStorage: nyckeln `handball_gk_v3` används bara som legacy. `loadRoot()` läser den om IndexedDB är tom och migrerar över den en gång. Appen skriver ingenting nytt dit. Nollställ tar bort nyckeln.
- Service worker-cache: `handboll-tracker-v<APP_VERSION>` (se Service worker).
- Ingen sessionStorage. Tema ligger i `root.theme`.

**Är datan knuten till inloggningen?** Nej. Det finns inget konto. All data på enheten tillhör appen. Datan är uppdelad per lag (`clubs[]`) och `db`-proxyn pekar på det aktiva laget (`activeClubId`), men alla som öppnar appen på enheten ser alla lag och kan byta fritt. Ingen åtkomstkontroll.

**Utloggning:** Finns inte. Det går inte att logga ut och profilskärmen visas inte igen så länge något lag finns. Det som liknar det:
- "Byt lag" (`switchClub`) byter aktivt lag, ingen data raderas.
- Radera ett lag tar bort laget och dess data. Är det sista laget laddas sidan om (`location.reload()`) och profilskärmen visas.
- "Nollställ allt" (`#resetAllBtn`, två bekräftelser) kör `idbClear()`, tar bort `handball_gk_v3` och visar profilskärmen igen. Detta raderar all data.

**IndexedDB-databasnamn:** `handball_gk`.

Jämförelsen mellan Tracker, Teambuilder och Playbook (lika, skiljer, vad som krockar på samma webbadress) finns i sviterepot `trenchrox/handbollssviten`, `CLAUDE.md`.

## Versionering

- Versionen står i **en enda konstant**: `const APP_VERSION = '2.5'` överst i scriptet i `handball_g_trk_ipad.html`. Den visas i sidomenyn (`#appVersion`, som `v2.5`) och styr service workerns cache (se nedan). Ändra den inte på något annat ställe.
- **Regel:**
  - **Andra siffran höjs** vid nya funktioner och fixar (2.4 → 2.5).
  - **Första siffran höjs** när IndexedDB-datamodellen ändras (2.x → 3.0). Då krävs **alltid en migrering** av befintlig data (`normalizeRoot()` och/eller en riktig `onupgradeneeded`).
- **Höj alltid versionen vid varje ändring av `handball_g_trk_ipad.html`.** Utan ny version får användarna inte den nya filen (se cache nedan).
- **Teambuilder** (en annan app) använder hela versioner (v1, v2, ...). Reglerna skiljer sig alltså mellan apparna. Använd inte Teambuilders schema här.
- Backupfilen och datat har inget eget versionsfält.

## Service worker (`sw.js`)

- **Cachenamn:** `handboll-tracker-v` + `APP_VERSION`, t.ex. `handboll-tracker-v2.5`. Versionen läses ur `sw.js`:s egen URL. HTML-filen registrerar `sw.js?v=<APP_VERSION>`. Ny version ger alltså ny URL, en ny service worker och en ny cache. **Ändra aldrig versionen i `sw.js`.** Där finns ingen hårdkodad version. Saknas `?v=` används `0`.
- **Förcachas vid install** (`FILES_TO_CACHE`): `./handball_g_trk_ipad.html` och `./manifest.json`, hämtade med `cache: 'reload'` så att webbläsarens HTTP-cache inte ger en gammal fil. `sw.js` själv cachas inte.
- **install:** `cache.addAll(...)` och sedan `self.skipWaiting()`.
- **activate:** raderar bara Cache API-cacher vars namn börjar med `handboll-tracker-v` och inte är den aktuella, och anropar sedan `clients.claim()`. **Det rör aldrig IndexedDB eller localStorage.** Koden använder bara `caches.keys()` och `caches.delete()`, så användarnas data påverkas inte av en ny version.
- **fetch:** *cache-first*. Hittas svaret i cachen returneras det. Annars hämtas det från nätet och en kopia läggs i den aktuella cachen. Vid nätfel returneras den cachade huvudsidan.
- **Följd:** eftersom fetch är cache-first måste versionen höjas för att ändrad HTML ska nå användarna (se Versionering).

## Servering

- Appen serveras från GitHub Pages ur det här repot (`trenchrox/handball_g_trk`).
- **Byt aldrig namn på repot eller på `handball_g_trk_ipad.html`.** IndexedDB och service worker är knutna till adressen (origin och sökväg) på varje iPad. Ändras adressen ser användarna en tom app och förlorar tillgång till sin data.
- Den exakta adressen är inte angiven av användaren och står inte i repot. Fyll i den här när den är känd: `[adress]`.
- `manifest.json` (`start_url`) pekar på filnamnet och ska inte ändras. `icons: []` lämnas som det är tills vidare.

## Osäkerheter och saker att kontrollera

- **Datafälten ovan** är härledda från de ställen som skapar objekt (`newComp`, `commit`, `teamModal`, `playerEditor`, `goalieEditor`). Det kan finnas fler valfria fält som sätts på andra ställen. Läs koden för respektive fält innan du förlitar dig på listan.
- **Radnummer** i detta dokument är ungefärliga.
- **Tester:** det finns inga automatiska tester, ingen lint-konfiguration och ingen CI.
- **Uppdatering hos användare:** nytt cachenamn tas i bruk när webbläsaren upptäcker den ändrade `sw.js?v=`-URL:en vid nästa besök. En iPad som varit offline får uppdateringen först efter ett besök online. Jag har bara provat det i Chromium lokalt (cache skapas med rätt namn, ingen konsolfel), inte på en iPad.

## Arbetssätt

- **Fråga alltid före commit och push.** Efter varje ändring: beskriv vad som ändrats och fråga om det ska pushas till repot. Committa och pusha inte på eget initiativ, så att småändringar kan samlas i en push. Skapa aldrig PR utan att användaren ber om det.
- Läs bara de delar av HTML-filen som behövs (den är stor, och rad 1041–1042 och typsnittsraderna är enorma base64-rader). Använd `grep -n` för att hitta funktioner, och undvik att skriva ut hela rader.
- Verifiera ändringar genom att öppna filen i en webbläsare (t.ex. Playwright med Chromium). Testa både tomt tillstånd (login) och med data, i både mörkt och ljust tema, samt i stående och liggande format.
- Behåll gammal data bakåtkompatibel: lägg till fält med standardvärden i `normalizeRoot()` i stället för att kräva ny data.
- Commit-meddelanden på svenska.
