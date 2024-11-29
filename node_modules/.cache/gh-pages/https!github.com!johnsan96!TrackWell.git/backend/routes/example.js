import express from "express";
import db from "../db.js"; // Importiere die Datenbankverbindung

let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Teste die Verbindung zur Datenbank durch eine einfache Abfrage
  db.get("SELECT 1", [], (err, result) => {
    if (err) {
      console.error("Datenbankverbindung fehlgeschlagen:", err.message);
      return res.status(500).send("Datenbankverbindung fehlgeschlagen!");
    }

    res.send("Datenbankverbindung erfolgreich: " + JSON.stringify(result));
  });
});

export {router};
