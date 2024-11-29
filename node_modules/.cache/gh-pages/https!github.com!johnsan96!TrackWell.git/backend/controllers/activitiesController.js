import db from "../db.js";

// GET: Alle Aktivitäten abrufen
export const getAllActivities = (req, res) => {
    const query = 'SELECT * FROM activities';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ activities: rows });
    });
};

// POST: Neue Aktivität hinzufügen
export const createActivity = (req, res) => {
    const { date, mobile_time, steps, gym, jogging } = req.body;
    const query = `
        INSERT INTO activities (date, mobile_time, steps, gym, jogging)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [date, mobile_time, steps, gym, jogging], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Aktivität erfolgreich erstellt', id: this.lastID });
    });
};
