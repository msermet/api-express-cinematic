const API_BASE_URL = 'http://localhost:3000/api';

document.getElementById('current-year').textContent = new Date().getFullYear();

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function loadSeances() {
    const seancesContainer = document.getElementById('seances-container');
    const filmId = getUrlParameter('id');

    if (!filmId) {
        seancesContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Erreur: Aucun film spécifié.
            </div>
            <a href="index.html" class="btn btn-primary">Retour à la liste des films</a>
        `;
        return;
    }

    try {
        const filmResponse = await fetch(`${API_BASE_URL}/films/${filmId}`);
        const seancesResponse = await fetch(`${API_BASE_URL}/films/${filmId}/seances`);

        if (!filmResponse.ok || !seancesResponse.ok) {
            throw new Error(`Erreur HTTP: ${filmResponse.status} ou ${seancesResponse.status}`);
        }

        const filmData = await filmResponse.json();
        const seancesData = await seancesResponse.json();

        if (filmData.status === 'success' && filmData.data && seancesData.status === 'success' && seancesData.data) {
            const film = filmData.data;
            const seances = seancesData.data;
            seancesContainer.innerHTML = `
                <div class="mb-4">
                    <a href="details.html?id=${filmId}" class="btn btn-outline-secondary">
                        <i class="fas fa-arrow-left me-2"></i>Retour aux détails du film
                    </a>
                </div>
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <img src="${film.affiche}" alt="${film.titre}" class="film-poster img-fluid">
                    </div>
                    <div class="col-md-8">
                        <div class="film-info">
                            <h1 class="mb-4">${film.titre}</h1>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Heure</th>
                                        <th>Places disponibles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${seances.map(seance => `
                                        <tr>
                                            <td>${new Date(seance.date).toLocaleDateString('fr-FR')}</td>
                                            <td>${seance.heure}</td>
                                            <td>${seance.places_disponibles}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        } else {
            seancesContainer.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Film ou séances non trouvés.
                </div>
                <a href="index.html" class="btn btn-primary">Retour à la liste des films</a>
            `;
        }
    } catch (error) {
        console.error('Erreur lors du chargement des séances:', error);
        seancesContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    Erreur: Impossible de se connecter à l'API.
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadSeances);