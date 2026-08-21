# Teambuilder

Lagindelning för ungdomshandboll. En fristående HTML-fil som delar upp truppen i
jämna lag och träningsgrupper – offline, på iPad, utan konto och utan moln.

## Snabbstart

Öppna `teambuilder.html` i Safari eller Chrome. Inget mer behövs: filen har all
CSS, all JavaScript och alla typsnitt inbakade och fungerar utan nätverk. På iPad
lägger du till den på hemskärmen för att få den i helskärm.

## Vad appen gör

* **Trupp** – spelarregister med position, hänthet, serienivå, foto och relationer.
  Egen flik som visar positionerna grafiskt på en halvplan.
* **Träning** – bocka i vilka som är på plats och skapa dagens grupper.
* **Cup** – lag som består över en hel dag eller helg.
* **Historik** – tidigare indelningar, underlag för ”variera mot förra gången”.
* **Inställningar** – PIN, laglogga, standardregler, backup och import.

Indelningen görs med en snake draft på nivå följt av slumpade byten som testar
förbättringar. Hårda villkor (låsta par, målvaktstäckning) väger tyngre än de
mjuka (nivåbalans, försvarsbalans, positionsspridning, relationer, vänsterhänta,
variation mot historiken).

## Integritet

Appen är byggd för att veta så lite som möjligt om barn.

* All data ligger i enhetens IndexedDB. Ingen synk, ingen server, inget konto.
* Bedömningar (gradering 1–10 och försvar 1–5) är grova, PIN-skyddade och visas
  **aldrig** i resultat, utskrifter eller exporter.
* `Exportera backup` tar allt och är till för din egen enhet. `Dela trupp` tar
  namn, position, hänthet och serienivå – utan bedömningar och anteckningar.

## Bygga

`teambuilder.html` är **genererad**. Redigera aldrig den direkt – ändra i `src/`
och bygg om:

```sh
python3 build.py           # skriver teambuilder.html + preview/
python3 build.py --check    # verifierar att filen är i synk med src/
```

Se `src/README.md` för hur delarna sätts ihop.
