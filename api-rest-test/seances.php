<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Séances du film</title>
    <!-- Bootstrap CSS depuis CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome pour les icônes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .film-poster {
            max-height: 500px;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .film-info {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>

<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="index.php">
            <i class="fas fa-film me-2"></i>Ciné App
        </a>
    </div>
</nav>

<div class="container py-5">
    <?php
    // Vérifier si l'ID du film est fourni
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        echo '<div class="alert alert-danger" role="alert">';
        echo 'Erreur: Aucun film spécifié.';
        echo '</div>';
        echo '<a href="index.php" class="btn btn-primary">Retour à la liste des films</a>';
    } else {
        $film_id = intval($_GET['id']);

        // URL de l'API Fastify
        $api_url = "http://localhost:3000/api/films/{$film_id}";
        $api_url_seances = "http://localhost:3000/api/films/{$film_id}/seances";

        // Récupérer les données de l'API
        $response = file_get_contents($api_url);
        $response_seances = file_get_contents($api_url_seances);

        // Vérifier si la requête a réussi
        if ($response === false || $response_seances === false) {
            echo '<div class="alert alert-danger" role="alert">';
            echo 'Erreur: Impossible de se connecter à l\'API.';
            echo '</div>';
            echo '<a href="index.php" class="btn btn-primary">Retour à la liste des films</a>';
        } else {
            // Décoder la réponse JSON
            $data = json_decode($response, true);
            $dataSeances = json_decode($response_seances, true);

            // Vérifier si le film existe
            if (isset($data['data']) && !empty($data['data'])) {
                $film = $data['data'];
                if (isset($dataSeances['data']) && !empty($dataSeances['data'])) {
                    $seances = $dataSeances['data'];
                ?>
                <div class="mb-4">
                    <a href="details.php?id=<?= $film_id ?>" class="btn btn-outline-secondary">
                        <i class="fas fa-arrow-left me-2"></i>Retour aux détails du film
                    </a>
                </div>

                <div class="row">
                    <div class="col-md-4 mb-4">
                        <img src="<?php echo htmlspecialchars($film['affiche']); ?>" alt="<?php echo htmlspecialchars($film['titre']); ?>" class="film-poster img-fluid">
                    </div>
                    <div class="col-md-8">
                        <div class="film-info">
                            <h1 class="mb-4"><?php echo htmlspecialchars($film['titre']); ?></h1>
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>
                                        Date
                                    </th>
                                    <th>
                                        Heure
                                    </th>
                                    <th>
                                        Places disponibles
                                    </th>
                                </tr>
                                </thead>
                                <?php foreach ($seances as $seance) : ?>
                                    <tbody>
                                    <tr>
                                        <td><?php echo htmlspecialchars($seance['date']);?></td>
                                        <td><?php echo htmlspecialchars($seance['heure']);?></td>
                                        <td><?php echo htmlspecialchars($seance['places_disponibles']);?></td>
                                    </tr>
                                    </tbody>
                                <?php endforeach; ?>
                            </table>
                        </div>
                    </div>
                </div>
                <?php
                } else {
                    echo '<div class="alert alert-warning" role="alert">';
                    echo 'Aucune séance disponible pour ce film.';
                    echo '</div>';
                    echo '<a href="details.php?id=' . $film_id . '" class="btn btn-primary">Retour aux détails du film</a>';
                }
            } else {
                echo '<div class="alert alert-warning" role="alert">';
                echo 'Film non trouvé.';
                echo '</div>';
                echo '<a href="index.php" class="btn btn-primary">Retour à la liste des films</a>';
            }
        }
    }
    ?>
</div>

<footer class="bg-dark text-white py-4 mt-5">
    <div class="container text-center">
        <p>&copy; <?php echo date('Y'); ?> Ciné App - Projet API REST</p>
    </div>
</footer>

<!-- Bootstrap JS Bundle avec Popper depuis CDN -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>