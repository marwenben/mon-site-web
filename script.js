/* Style général */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
    overflow: hidden; /* Pour éviter les barres de défilement */
}

/* Arrière-plan animé */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee, #84fab0);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
    z-index: -1; /* Pour placer l'arrière-plan derrière le contenu */
}

@keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

header {
    background-color: rgba(51, 51, 51, 0.8); /* Fond semi-transparent */
    color: #fff;
    padding: 20px;
    text-align: center;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin: 0 10px;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
}

section {
    padding: 20px;
    margin: 20px;
    background-color: rgba(255, 255, 255, 0.8); /* Fond semi-transparent */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

footer {
    text-align: center;
    padding: 10px;
    background-color: rgba(51, 51, 51, 0.8); /* Fond semi-transparent */
    color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
}

/* Style du formulaire */
form {
    display: flex;
    flex-direction: column;
}

form label {
    margin-top: 10px;
}

form input, form textarea, form button {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

form button {
    background-color: #333;
    color: #fff;
    cursor: pointer;
}

form button:hover {
    background-color: #555;
}
/* Style pour la section Compétences */
#skills {
    padding: 20px;
    margin: 20px;
    background-color: rgba(255, 255, 255, 0.8); /* Fond semi-transparent */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#skills h3 {
    color: #333;
    margin-top: 20px;
}

#skills ul {
    margin-left: 20px;
}

#skills li {
    margin-bottom: 10px;
    line-height: 1.6;
}
// Gestion des commentaires
document.getElementById('comment-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les valeurs du formulaire
    const name = document.getElementById('comment-name').value;
    const email = document.getElementById('comment-email').value;
    const comment = document.getElementById('comment-text').value;
    const rating = document.getElementById('rating').value;

    // Créer un nouvel élément de commentaire
    const commentItem = document.createElement('div');
    commentItem.classList.add('comment-item');

    commentItem.innerHTML = `
        <p><strong>${name}</strong> (${email})</p>
        <p>${comment}</p>
        <p class="rating">Note : ${rating} étoiles</p>
    `;

    // Ajouter le commentaire à la liste
    document.getElementById('comment-list').appendChild(commentItem);

    // Réinitialiser le formulaire
    document.getElementById('comment-form').reset();
});
