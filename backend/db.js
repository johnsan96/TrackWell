import sqlite3 from 'sqlite3';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

/*
 *fileURLToPath(import.meta.url): Wandelt den URL des aktuellen Moduls in einen Dateipfad um.
 *dirname(__filename): Ermittelt das Verzeichnis, in dem sich die aktuelle Datei befindet (ähnlich wie __dirname in CommonJS).
 *resolve(__dirname, 'database.db'): Kombiniert den aktuellen Verzeichnispfad mit dem relativen Pfad zur Datenbank.
 */

// Den aktuellen Dateipfad ermitteln
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Verbindung zur SQLite-Datenbank
const db = new sqlite3.Database(resolve(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank:', err.message);
    } else {
        console.log('Verbunden mit der SQLite-Datenbank.');
    }
});

export default db;