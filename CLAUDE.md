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

## Inloggning / PIN

**Det finns ingen PIN och ingen riktig inloggning i koden.** Jag sökte efter `pin`, `lösenord`, `password`, kryptering och hashning utan träff.

- `#login` är en onboarding-skärm: "Skapa din lagprofil" med klubbnamn, ålderskull och valfri logga, eller "Återställ från backup".
- `boot()` visar login bara om `activeClub()` saknas, dvs. om det inte finns någon klubb i IndexedDB. Annars anropas `enterApp()` direkt.
- Det finns alltså ingen låsning vid appstart. Den som har enheten kommer in.
- Att "Nollställ allt" skickar tillbaka till login-skärmen är det enda sambandet med "inloggning".
- **Osäkert:** Du nämnde PIN i uppgiften. Om en PIN ska finnas (eller fanns i en tidigare version som inte ligger i repot) är den inte implementerad här. Lås-ikonerna (`#lockBtn`, `.mc-lock`, `.lockbadge`) gäller **låsning av en match** (`m.locked`), inte appåtkomst.

## Versionering

- Appversionen står **hårdkodad på ett enda ställe**: `<div class="app-version">v2.4</div>` i sidomenyn (rad ~720). Nuvarande version är **v2.4**.
- Det finns ingen konstant i scriptet, ingen automatisk uppräkning och inget versionsfält i datat eller backupen.
- Versionen räknas alltså upp **manuellt** genom att den texten ändras.
- Versionsnumret är inte kopplat till `CACHE_NAME` i `sw.js` (se nedan). De hålls inte synkade av något.
- **Osäkert:** Jag vet inte vilken regel som använts för att räkna upp (t.ex. vad som ger ny minor respektive major). Git-historiken består bara av "Add files via upload" och säger inget om det. Fråga användaren innan en konvention antas.

## Service worker (`sw.js`)

- **Cachenamn:** `CACHE_NAME = 'handboll-tracker-v1'`. Det står hårdkodat och har inte ändrats trots att appen är på v2.4.
- **Förcachas vid install** (`FILES_TO_CACHE`): `./handball_g_trk_ipad.html` och `./manifest.json`. `sw.js` själv cachas inte i listan.
- **install:** `cache.addAll(...)` och sedan `self.skipWaiting()`.
- **activate:** raderar alla cacher vars namn **inte** är lika med `CACHE_NAME`, och anropar sedan `clients.claim()`.
- **fetch:** *cache-first*. Om svaret finns i cachen returneras det. Annars hämtas det från nätet, en kopia läggs i cachen med `cache.put` (så all hämtad GET-resurs cachas, även sådant som inte står i listan), och vid nätfel returneras den cachade huvudsidan.
- Registreras i HTML-filen med `navigator.serviceWorker.register('sw.js')` vid `window load`.

**Viktig konsekvens:** Eftersom fetch är cache-first och `CACHE_NAME` är oförändrat, får användare **inte** en uppdaterad HTML-fil när den ändras i repot. De ser den gamla cachade versionen tills cachenamnet byts (eller cachen rensas). **Vid varje ändring av `handball_g_trk_ipad.html` som ska nå användare måste `CACHE_NAME` räknas upp** (t.ex. `handboll-tracker-v2`). Det görs idag inte automatiskt.

## Osäkerheter och saker att kontrollera

- **PIN:** finns inte i koden (se ovan). Oklart om det är ett missförstånd eller en funktion som saknas.
- **Versionsregel:** oklart hur `v2.4` ska räknas upp.
- **Cache-version vs appversion:** `v1` i `sw.js` mot `v2.4` i appen. Oklart om det är medvetet. Troligen en miss.
- **Hosting:** repot visar inte var appen serveras ifrån (inga GitHub Pages-inställningar, ingen workflow-fil, ingen `.github`-mapp). Oklart om användarna kör den via Pages, som lokal fil eller på annat sätt. Det avgör hur uppdateringar når enheterna.
- **Ikoner:** `manifest.json` har `icons: []`, så ingen hemskärmsikon definieras där. Oklart om det är avsiktligt (appen kan ha `apple-touch-icon` eller liknande, det har jag inte kontrollerat).
- **Datafälten ovan** är härledda från de ställen som skapar objekt (`newComp`, `commit`, `teamModal`, `playerEditor`, `goalieEditor`). Det kan finnas fler valfria fält som sätts på andra ställen. Läs koden för respektive fält innan du förlitar dig på listan.
- **Radnummer** i detta dokument är ungefärliga.
- **Tester:** det finns inga automatiska tester, ingen lint-konfiguration och ingen CI.

## Arbetssätt

- Läs bara de delar av HTML-filen som behövs (den är stor, och rad 1041–1042 och typsnittsraderna är enorma base64-rader). Använd `grep -n` för att hitta funktioner, och undvik att skriva ut hela rader.
- Verifiera ändringar genom att öppna filen i en webbläsare (t.ex. Playwright med Chromium). Testa både tomt tillstånd (login) och med data, i både mörkt och ljust tema, samt i stående och liggande format.
- Behåll gammal data bakåtkompatibel: lägg till fält med standardvärden i `normalizeRoot()` i stället för att kräva ny data.
- Commit-meddelanden på svenska.
