# src/ — källfilerna till teambuilder.html

`teambuilder.html` i rotkatalogen är **genererad**. Redigera aldrig den direkt —
ändra här och kör bygget:

    python3 build.py            # bygger teambuilder.html + preview/
    python3 build.py --check    # verifierar bara att bygget är i synk

Slutfilen är fortfarande helt fristående: typsnitt, CSS och JS bakas in, inga
externa beroenden, fungerar offline direkt från disk eller GitHub Pages.

| Fil | Innehåll |
|---|---|
| `shell.html` | Dokumentskelettet med platshållare för delarna nedan |
| `fonts.css`  | De tre inbäddade typsnitten (base64). Ändras aldrig |
| `style.css`  | All CSS – designtokens, komponenter, ljust tema, utskrift |
| `body.html`  | All markup – onboarding, sidomeny, de fem vyerna |
| `app.js`     | All JS – lagring, algoritm, vyer, import/export |
