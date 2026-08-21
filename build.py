#!/usr/bin/env python3
"""Bygger teambuilder.html och förhandsvisningen från delarna i src/.

teambuilder.html är genererad – redigera aldrig den direkt, ändra i src/ och
kör det här skriptet. Slutfilen är fortfarande helt fristående: typsnitt, CSS
och JS bakas in, inga externa beroenden, fungerar offline direkt från disk.

  python3 build.py           bygg teambuilder.html + preview
  python3 build.py --check   bygg inget, verifiera bara att filen är i synk
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
OUT = ROOT / "teambuilder.html"
PREVIEW = ROOT / "preview" / "teambuilder.preview.html"

# Platshållare i shell.html -> källfil. Raden med platshållaren byts i sin
# helhet, så radbrytningarna i utdata blir exakt som i källdelarna.
PARTS = {
    "/*__FONTS__*/\n": "fonts.css",
    "/*__STYLE__*/\n": "style.css",
    "<!--__BODY__-->\n": "body.html",
    "/*__APP__*/\n": "app.js",
}


def render() -> str:
    html = (SRC / "shell.html").read_text(encoding="utf-8")
    for placeholder, name in PARTS.items():
        if placeholder not in html:
            raise SystemExit(f"FEL: platshållaren {placeholder.strip()} saknas i shell.html")
        html = html.replace(placeholder, (SRC / name).read_text(encoding="utf-8"))
    return html


def build_preview(html: str) -> None:
    """Artifacts lindar innehållet i <!doctype html><head></head><body>, så
    dokumenttaggarna måste bort. <title> läggs först eftersom bara filens
    första 8 kB genomsöks efter den – typsnitten är större än så."""
    title_match = re.search(r"<title>(.*?)</title>", html, re.S)
    title = title_match.group(1).strip() if title_match else "Teambuilder"
    head = html[html.index("<style>"):html.index("</head>")]
    body = html[html.index("<body>") + len("<body>"):html.rindex("</body>")]
    out = "\n".join([
        f"<title>{title}</title>",
        "<!-- Genererad av build.py – redigera src/ i stället. -->",
        head.strip(),
        body.strip(),
    ]) + "\n"
    for tag in ("<!DOCTYPE", "<html", "</html>", "<head>", "</head>", "<body>", "</body>"):
        if tag.lower() in out.lower():
            raise SystemExit(f"FEL: {tag} finns kvar i förhandsvisningen")
    PREVIEW.parent.mkdir(exist_ok=True)
    PREVIEW.write_text(out, encoding="utf-8")


def main() -> int:
    html = render()
    check = "--check" in sys.argv

    if check:
        current = OUT.read_text(encoding="utf-8") if OUT.exists() else ""
        if current != html:
            print("FEL: teambuilder.html är inte i synk med src/.", file=sys.stderr)
            print("      Någon har redigerat den byggda filen direkt, eller glömt", file=sys.stderr)
            print("      köra bygget. Kör: python3 build.py", file=sys.stderr)
            return 1
        print(f"teambuilder.html är i synk med src/ ({len(html)} byte)")
        return 0

    OUT.write_text(html, encoding="utf-8")
    build_preview(html)
    print(f"Skrev {OUT.name} ({OUT.stat().st_size} byte)")
    print(f"Skrev {PREVIEW.relative_to(ROOT)} ({PREVIEW.stat().st_size} byte)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
