const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', // Remplacez par votre hôte
    user: 'root',      // Remplacez par votre utilisateur
    password: '', // Remplacez par votre mot de passe
    database: 'db_cinematic' // Remplacez par votre base de données
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL.');
});

module.exports = connection;