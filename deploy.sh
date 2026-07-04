#!/bin/bash

echo "🔍 Controllo repository..."
git status

echo ""
echo "➕ Aggiungo le modifiche..."
git add .

echo ""
echo "💾 Creo il commit..."

git commit -m "Aggiornamento sito matrimonio"

if [ $? -ne 0 ]; then
    echo ""
    echo "✅ Nessuna modifica da pubblicare."
    exit 0
fi

echo ""
echo "🚀 Push su GitHub..."
git push origin main

echo ""
echo "🎉 Deploy inviato!"
echo "🌍 Tra circa un minuto il sito sarà aggiornato."