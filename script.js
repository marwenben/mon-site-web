// Gestion des commentaires
document.getElementById('comment-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les valeurs du formulaire
    const name = document.getElementById('comment-name').value.trim();
    const email = document.getElementById('comment-email').value.trim();
    const comment = document.getElementById('comment-text').value.trim();
    const rating = document.getElementById('rating').value;

    // Validation simple pour éviter les soumissions vides
    if (!name || !email || !comment) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    // Créer un nouvel élément de commentaire
    const commentItem = document.createElement('div');
    commentItem.classList.add('comment-item');
    commentItem.setAttribute('role', 'article'); // Amélioration accessibilité

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

// Exemple simple : changer la couleur du titre au clic (amélioré pour accessibilité)
const titre = document.querySelector('h1');
if (titre) {
    titre.addEventListener('click', () => {
        titre.style.color = '#ff6f61'; // Couleur professionnelle en harmonie
        titre.setAttribute('aria-label', 'Titre cliqué pour changer de couleur');
    });
}

// Amélioration du chatbot : Logique pour gérer les réponses prédéfinies
// Ajout de plus de réponses fiables, claires et professionnelles
// Le chatbot est maintenant plus interactif avec un champ de saisie et des suggestions
document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('itbot-messages');
    const chatInput = document.getElementById('itbot-input');
    const chatSend = document.getElementById('itbot-send');
    const suggestions = document.querySelectorAll('.itbot-chip');

    // Réponses prédéfinies étendues (plus fiables et professionnelles)
    const responses = {
        'Wi-Fi': 'Pour résoudre les problèmes de connexion Wi-Fi : 1. Vérifiez que le Wi-Fi est activé sur votre appareil. 2. Redémarrez votre routeur. 3. Oubliez le réseau et reconnectez-vous. Si le problème persiste, contactez-moi pour un diagnostic approfondi.',
        'Imprimantes': 'Problèmes d\'imprimante : 1. Assurez-vous que l\'imprimante est allumée et connectée. 2. Vérifiez les niveaux d\'encre. 3. Exécutez l\'outil de dépannage Windows/Mac. Pour ajouter une imprimante réseau, utilisez l\'assistant d\'ajout d\'imprimante dans les paramètres.',
        'AD': 'Problèmes avec Active Directory (AD) : Si votre mot de passe ne fonctionne pas, essayez de le réinitialiser via le portail self-service. Assurez-vous que votre compte n\'est pas verrouillé. Pour plus d\'aide, fournissez des détails sur l\'erreur.',
        'VPN': 'Connexion VPN échouée : 1. Vérifiez votre connexion internet. 2. Assurez-vous que les credentials sont corrects. 3. Mettez à jour le client VPN. Si vous utilisez un jeton virtuel, vérifiez sa configuration.',
        'Outlook': 'Synchronisation Outlook : 1. Vérifiez votre connexion internet. 2. Redémarrez Outlook. 3. Réparez le profil via le Panneau de configuration. Pour les problèmes avec Microsoft 365, contactez le support.',
        'Teams': 'Problèmes caméra/micro dans Teams : 1. Vérifiez les permissions dans les paramètres de Teams. 2. Testez avec un autre appareil. 3. Mettez à jour les drivers. Assurez-vous que l\'appareil est sélectionné correctly.',
        'Espace disque plein': 'Espace disque insuffisant : 1. Supprimez les fichiers temporaires via l\'outil de nettoyage de disque. 2. Désinstallez les applications inutiles. 3. Déplacez des fichiers vers un stockage externe ou cloud.',
        'Rapport Wi-Fi (wlanreport)': 'Pour générer un rapport Wi-Fi : Ouvrez l\'invite de commandes en admin et tapez "netsh wlan show wlanreport". Cela créera un rapport HTML pour analyser les problèmes de connexion.'
    };

    // Ajout de suggestions supplémentaires pour plus de couverture
    const additionalSuggestions = ['Mot de passe oublié', 'Mise à jour Windows', 'Sauvegarde données', 'Sécurité antivirus'];
    additionalSuggestions.forEach(sugg => {
        const chip = document.createElement('button');
        chip.classList.add('itbot-chip');
        chip.textContent = sugg;
        document.querySelector('.itbot-suggestions').appendChild(chip);
    });

    // Mise à jour des réponses pour les nouvelles suggestions
    responses['Mot de passe oublié'] = 'Pour réinitialiser un mot de passe : Utilisez le portail self-service de votre organisation. Si inaccessible, contactez l\'administrateur IT avec votre ID utilisateur.';
    responses['Mise à jour Windows'] = 'Problèmes de mise à jour Windows : 1. Vérifiez les mises à jour via Paramètres > Mise à jour et sécurité. 2. Redémarrez l\'ordinateur. 3. Utilisez l\'outil de résolution des problèmes de Windows Update.';
    responses['Sauvegarde données'] = 'Pour sauvegarder vos données : Utilisez OneDrive ou un disque externe. Configurez des sauvegardes automatiques via l\'historique des fichiers sur Windows.';
    responses['Sécurité antivirus'] = 'Conseils de sécurité : Installez un antivirus comme Microsoft Defender. Évitez les liens suspects et activez le pare-feu. Pour un scan, ouvrez Defender et lancez une analyse complète.';

    // Gestion des clics sur suggestions (accessible avec aria)
    suggestions.forEach(chip => {
        chip.setAttribute('aria-label', `Sélectionner suggestion : ${chip.textContent}`);
        chip.addEventListener('click', () => handleSuggestion(chip.textContent));
    });

    // Fonction pour gérer les suggestions
    function handleSuggestion(query) {
        addUserMessage(query);
        const response = responses[query] || 'Désolé, je n\'ai pas de réponse prédéfinie pour cela. Veuillez décrire votre problème en détail.';
        addBotMessage(response);
    }

    // Gestion de l'envoi manuel (plus fiable)
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const query = chatInput.value.trim();
        if (!query) return;
        addUserMessage(query);
        // Simulation de recherche dans les réponses (améliorable avec IA réelle si intégré)
        const matchedKey = Object.keys(responses).find(key => query.toLowerCase().includes(key.toLowerCase()));
        const response = matchedKey ? responses[matchedKey] : 'Je traite votre requête. Pour des problèmes complexes, contactez-moi directement au +1 438 526 3603.';
        addBotMessage(response);
        chatInput.value = '';
    }

    // Ajouter message utilisateur
    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.classList.add('itbot-msg', 'itbot-user');
        msg.textContent = text;
        msg.setAttribute('role', 'log');
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Ajouter message bot
    function addBotMessage(text) {
        const msg = document.createElement('div');
        msg.classList.add('itbot-msg', 'itbot-bot');
        msg.textContent = text;
        msg.setAttribute('role', 'log');
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Message d'accueil amélioré
    addBotMessage('Bonjour ! Je suis votre assistant IT. Cliquez sur une suggestion ou tapez votre question pour obtenir de l\'aide professionnelle.');

    // Fonctions open/close pour le chatbot (améliorées)
    const openBtn = document.getElementById('itbot-toggle');
    const closeBtn = document.querySelector('.itbot-close'); // Assumer un bouton close
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            document.getElementById('itbot-window').hidden = false;
            document.getElementById('itbot-root').classList.add('open');
            chatInput.focus();
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('itbot-window').hidden = true;
            document.getElementById('itbot-root').classList.remove('open');
        });
    }
});
