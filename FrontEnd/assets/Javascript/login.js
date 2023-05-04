const emailCorrect = "sophie.bluel@test.tld";
const pswCorrect = "S0phie";

// Récupérons le formulaire HTML
const formulaire = document.getElementById("login");

// Définissons une fonction qui sera appelée lors de la soumission du formulaire
function soumettreFormulaire(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre

    // Créons un objet FormData à partir du formulaire
    const formData = new FormData(formulaire);

    // Récupérons les valeurs entrées par l'utilisateur dans les champs d'email et de mot de passe
    const email = formData.get("email");
    const psw = formData.get("password");

    // Récupérons le token d'authentification depuis le localStorage
    const token = localStorage.getItem("token");

    // Créons une requête AJAX pour vérifier les informations de connexion
    fetch(`http://localhost:5678/api/users/login`, {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erreur dans l'identifiant ou le mot de passe");
            }
        })
        .then(data => {
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        })
        .catch(error => {
            const messageErreur = document.getElementById("wrong-psw");
            messageErreur.textContent = error.message;
        });
}

// Ajoutons un écouteur d'événements sur le formulaire
formulaire.addEventListener("submit", soumettreFormulaire);
