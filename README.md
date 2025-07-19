# Semesterprojekt Typescript Journal

## Anleitung

### Setup

1. Node.js muss installiert sein
2. npm install
3. npm i prisma --save-dev
4. Erzeugen Sie eine .env Datei mit der Variable DATABASE_URL:"file:./dev.db"
5. npx prisma generate
6. npx prisma db push
7. npm run dev

### Run

Für jede weitere Ausführung reicht npm run dev.

## Implementierte Features

Ich habe in meiner Anwendung alle Pflicht- und optionale Features verbaut.

### Pflicht: 1. Anzeige aller Tagebucheinträge

Die Anzeige der Tagebucheinträge wird über das Component displayEntries (und auch switchEntries) gesteuert. Die Einträge werden mithilfe von Cards (src: shadcn) dargestellt, welche Titel, Tags, Kontent und Erstellungsdatum beinhalten.

Durch ein orderBy beim Fetching der Einträge von der Datenbank wird die Reihenfolge der angezeigten Einträge gewährleistet: der neuste wird zurerst, der älteste zuletzt angezeigt.

### Pflicht: 2. Erstellung und Anzeige neuer Tagebucheinträge

Über den "Write new"-Button oben rechts kann ein neuer Eintrag erzeugt werden. Die Daten werden mithilfe von Input, Toggle und Textarea (src: shadcn, mit eigenen Anpassungen) Komponenten erhoben. Durch klicken auf den "Submit"-Button unter dem Texteingabe-Feld wird der neue Eintrag in der Datenbank, über die formAction (bzw. createAction) gespeichert.

Das Attribut "createdAt" hat des aktuelle Datum als Defaultwert.

### Pflicht 3. Wichtige/besondere Tagebucheinträge können markiert werden

Einträge können beim Erstellen oder auch dort wo sie Angezeigt werden durch klick auf den Stern markiert/nicht-markiert werden. Dies wird auch in der Datenbank gespeichert über die updateHighlight-Action bzw. ein Toggle (src: shadcn).

Bei der Anzeige besteht die Möglichekeit über zwei Buttons oben zu entscheiden, ob alle oder nur die markierten Einträge angezeigt werden sollen.

Optisch unterschieden sich die markierten Einträge durch ein gelbes Sternsymbol.

### Pflicht 4. In der Tageuchübersicht wird der Text mit größer gleich 250 Zeichen des Eintrags nur als Vorschau angezeigt

Hier empfand ich persönlich die Vorgabe als etwas ungenau. Es heißt einmal maximal 250 (einschließlich 250) und einmal weniger als 250 (nicht einschließlich 250) Zeichen. Ich habe es so implementiert das Texte bis einschließlich 250 Zeichen komplett angezeigt werden (maximal 250). Wird diese Grenze (250 Zeichen) überschritten werden nur diese 250, konkatiniert mit einem "...", angezeigt.

Über das klicken des "Read"-Buttons kann der gesamte Eintrag (mit voller Textlänge) als scrollable Sheet (shadcn) angezeigt werden.

---

### Optional: 1. Tagebucheinträge werden persistent gespeichert

Alle Tagebucheinträge werden persistent in einer sqlite-Datenbank gespeichert. Als Schnittstelle zur Datenbank wurde Prisma verwendet.

### Optional: 2. Nutzer können ein alternatives Erstellungsdatum festlegen

Bei der Erstellung eines neuen Eintrages wird das Attribut "createdAt" das aktuelle Datum als Defautlwert mitgegeben. Der Nutzer hat die Möglichkeit bei dem Erstellen eines Eintrages ein eigenes Datum festzulegen über ein "input" mit dem "type='date'".

### Optional: 3. Neue Tagebucheinträge können mit Schlagworten versehen werden

Für die Schlagworte ("Tags") existierte eine eigene Tabelle die über einen Foreign Key mit den Entries verknüpft ist. Alle Elemente dieser Tag Tabelle, dessen Label unique sein müssen, werden dem Nutzer beim Erstellen angezeigt. Die geschieht mithilfe der modifizierten Toggle-Komponente (src: shadcn). Darunter kann der Nutzer über ein Input-Feld ebenfalls neue Tags erzeugen die sofot mit angezeigt werden. Diese neuen Tags werden erst mit dem Klick des Submit-Buttons auch persistent in der Tag-Tabelle gespeichert.

Die Tags werden ebenfalls in der Übersicht mit angezeigt.

### Optional: 4. Die vorhandenen Tagebucheinträge werden nicht alle auf einmal geladen und wietere Einträge werden durch Nutzeraktion nachgeladen

Diese Funktion wurde mithilfe eines useState implementiert. Es werden zunächst immer 10 Einträge angezeigt und mit jedem Klick des "Load more"-Buttons 5 weitere.

---

## Testing

Ich habe 3 Tests gebaut um 3 Pflichtfeatures zu testen

### display.test

Testet Feature 1 bzw. auch ein bisschen das 3. optionale Feature. Es wird geschaut ob alle gewollten Informationen tatsächlich dargestellt wurden. Die Reihenfolge habe ich nicht getestet, da diese beim fetching der Daten von der Datenbank (orderBy) gewährleistet wird.

### MaxContent.test

Testet Feature 4.

### SwitchDisplay.test

Testet Feature 3.1.
