#!/bin/bash

# usa pandoc per convertire un file in markdown in file tex
# il file avrà lo stesso nome con diversa estensione

SORGENTE=$1
DESTINAZIONE=${SORGENTE%.md}.tex
BIBLIOGRAFIA="/home/delcaran/Tesi/Testo/bibliografia.bib"

#pandoc --from=markdown --to=latex --parse-raw --bibliography="${BIBLIOGRAFIA}" --biblatex --smart --chapters --output="${DESTINAZIONE}" "${SORGENTE}"
pandoc --from=markdown --to=latex --parse-raw --smart --biblatex --chapters --output="${DESTINAZIONE}" "${SORGENTE}"
