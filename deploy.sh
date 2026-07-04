#!/bin/bash

echo "Controllo modifiche..."
git status

echo "Aggiungo i file..."
git add .

echo "Creo il commit..."
git commit -m "Aggiornamento sito matrimonio"

echo "Invio su GitHub..."
git push origin main

echo "Fatto. Controlla il sito tra 1-2 minuti."