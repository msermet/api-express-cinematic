const express = require('express');
const app = express();
const port = 3000;
const connection = require('./db');
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:8000'
}));

app.get('/api/films', (req, res) => {
    const query =   'SELECT f.id,f.titre,f.realisateur,f.duree,DATE_FORMAT(f.date_sortie, "%Y-%m-%d") as date_sortie,f.affiche,f.genre_id,f.description,g.nom as genre_nom ' +
        '                   FROM films f ' +
        '                   INNER JOIN genres g on g.id=f.genre_id' +
        '                   WHERE f.genre_id=g.id';

    connection.query(query, (erreur, resultats) => {
        if (erreur) {
            console.error('Erreur lors de la récupération des données :', erreur);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
            return;
        }

        res.json({
            status: erreur === null ? 'success' : 'error',
            data: resultats
        });
    });
});

app.get(`/api/films/:id`, (req, res) => {
    const idFilm = req.params.id;
    const query =   'SELECT f.id,f.titre,f.realisateur,f.duree,DATE_FORMAT(f.date_sortie, "%Y-%m-%d") as date_sortie,f.affiche,f.genre_id,f.description,g.nom as genre_nom ' +
        '                   FROM films f ' +
        '                   INNER JOIN genres g on g.id=f.genre_id' +
        '                   WHERE f.genre_id=g.id' +
        '                   AND f.id=?';


    connection.query(query,[idFilm], (erreur, resultat) => {
        if (erreur) {
            console.error('Erreur lors de la récupération des données :', erreur);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
            return;
        }

        res.json({
            status: erreur === null ? 'success' : 'error',
            data: resultat[0]
        });
    });
});

app.get('/api/films/:id/seances', (req, res) => {
    const idFilm = req.params.id;
    const query =   'SELECT id,film_id,DATE_FORMAT(date, "%Y-%m-%d") as date,heure,places_disponibles ' +
        '                   FROM seances' +
        '                   WHERE film_id=?';

    connection.query(query,[idFilm], (erreur, resultatsSeances) => {
        if (erreur) {
            console.error('Erreur lors de la récupération des données :', erreur);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
            return;
        }

        res.json({
            status: erreur === null ? 'success' : 'error',
            data: resultatsSeances
        });
    });
});

app.listen(port, () => {
    console.log(`Le lien api : http://localhost:${port}`);
});