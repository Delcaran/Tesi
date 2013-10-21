#!/bin/bash

# usa pandoc per convertire un file in markdown in file tex e viceversa
# il file avrà lo stesso nome con diversa estensione

LIST=`ls ${1}/*.${1}`

for INPUT in $LIST
do

	BIBLIOGRAFIA="/home/delcaran/Tesi/Testo/bibliografia.bib"

	filename=$(basename "$INPUT")
	extension="${filename##*.}"
	filename="${filename%.*}"

	OUT_DIR=""
	OUT_EXT=""
	IN_TYPE=""
	OUT_TYPE=""
	OPTIONS=""

	case $extension in
		md|markdown)
			OUT_DIR="tex/"
			OUT_EXT=".tex"
			IN_TYPE="markdown"
			OUT_TYPE="latex"
			OPTIONS="--parse-raw --smart --chapters"
			#OPTIONS="--parse-raw --smart --bibliography=\"${BIBLIOGRAFIA}\" --biblatex --chapters"
			;;
		tex)
			OUT_DIR="md/"
			OUT_EXT=",md"
			IN_TYPE="latex"
			OUT_TYPE="markdown"
			;;
	esac

	OUTPUT="${OUT_DIR}${filename}${OUT_EXT}"

	echo "From ${INPUT} to ${OUTPUT}"
	echo "pandoc --from=${IN_TYPE} --to=${OUT_TYPE} ${OPTIONS} --output=${OUTPUT} ${INPUT}"

	pandoc --from=${IN_TYPE} --to=${OUT_TYPE} ${OPTIONS} --output=${OUTPUT} ${INPUT}

done
