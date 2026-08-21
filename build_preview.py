#!/usr/bin/env python3
"""Bygger en förhandsvisningsversion av teambuilder.html för publicering som Artifact.

Artifacts lindar filens innehåll i <!doctype html><head></head><body>, så
dokumenttaggarna måste bort. <title> läggs först eftersom bara filens första
8 kB genomsöks efter den – de inbäddade typsnitten är större än så.

Kör:  python3 build_preview.py
"""
import re
import sys
from pathlib import Path

SRC = Path(__file__).parent / "teambuilder.html"
OUT = Path(__file__).parent / "preview" / "teambuilder.preview.html"


def main() -> int:
    html = SRC.read_text(encoding="utf-8")

    title_match = re.search(r"<title>(.*?)</title>", html, re.S)
    title = title_match.group(1).strip() if title_match else "Teambuilder"

    head = html[html.index("<style>"):html.index("</head>")]
    body = html[html.index("<body>") + len("<body>"):html.rindex("</body>")]

    parts = [
        f"<title>{title}</title>",
        "<!-- Genererad av build_preview.py – redigera teambuilder.html i stället. -->",
        head.strip(),
        body.strip(),
    ]
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text("\n".join(parts) + "\n", encoding="utf-8")

    for tag in ("<!DOCTYPE", "<html", "</html>", "<head>", "</head>", "<body>", "</body>"):
        if tag.lower() in OUT.read_text(encoding="utf-8").lower():
            print(f"FEL: {tag} finns kvar i utdatafilen", file=sys.stderr)
            return 1

    print(f"Skrev {OUT} ({OUT.stat().st_size} byte)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
