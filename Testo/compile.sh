#!/bin/bash
FILE="tesi"
VIEWER="okular"
latex -synctex=1 -interaction=nonstopmode ${FILE}.tex
bibtex ${FILE}.aux
makeindex ${FILE}.idx
pdflatex -synctex=1 -interaction=nonstopmode ${FILE}.tex
makeglossaries ${FILE}
pdflatex -synctex=1 -interaction=nonstopmode ${FILE}.tex
pdflatex -synctex=1 -interaction=nonstopmode ${FILE}.tex
#${VIEWER} ${FILE}.pdf
