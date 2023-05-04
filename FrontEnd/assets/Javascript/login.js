// Récupérons le formulaire HTML
const formulaire = document.getElementById("login");

// Définissons une fonction qui sera appelée lors de la soumission du formulaire
async function soumettreFormulaire(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre

    const email = formulaire.email.value;
    const password = formulaire.password.value;

    const dataForm = {
        email: email,
        password: password
    };

    const response = await fetch(`http://localhost:5678/api/users/login`, {
        method: "POST",
        body: JSON.stringify(dataForm),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        const errorMessage = "Erreur dans l'identifiant ou le mot de passe";
        const messageErreur = document.getElementById("wrong-psw");
        messageErreur.textContent = errorMessage;
        return;
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
}

// Ajoutons un écouteur d'événements sur le formulaire
formulaire.addEventListener("submit", soumettreFormulaire);
