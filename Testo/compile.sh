#!/bin/bash
FILE="tesi"
latex -synctex=1 -interaction=nonstopmode ${FILE}.tex
bibtex ${FILE}.aux
makeindex ${FILE}.idx
latex -synctex=1 -interaction=nonstopmode ${FILE}.tex
pdflatex -synctex=1 -interaction=nonstopmode ${FILE}.tex
evince ${FILE}.pdf
