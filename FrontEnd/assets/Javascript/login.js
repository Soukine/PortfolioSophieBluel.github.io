const emailCorrect = "sophie.bluel@test.tld";
const pswCorrect = "S0phie";

// Récupérons les champs d'identifiant et de mot de passe du formulaire HTML
const emailInput = document.getElementById("email");
const pswInput = document.getElementById("password");

// Récupérons le bouton de soumission du formulaire HTML
const formulaire = document.getElementById("login");
const boutonSoumettre = document.getElementById("connect");

// Définissons une fonction qui sera appelée lors de la soumission du formulaire
function soumettreFormulaire(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre

    // Récupérons les valeurs entrées par l'utilisateur dans les champs d'email et de mot de passe
    const email = emailInput.value;
    const psw = pswInput.value;

    // Vérifions si l'email et le mot de passe sont corrects
    if (email === emailCorrect && psw === pswCorrect) {
        // Si c'est le cas, redirigeons l'utilisateur vers la page avec les boutons d'actions
        window.location.href = "index.html";
    } else {
        // Sinon, affichons un message d'erreur
        const messageErreur = document.getElementById("wrong-psw");
        messageErreur.textContent = "Erreur dans l'email ou le mot de passe";
    }
}

// Ajoutons un écouteur d'événements sur le bouton de soumission
boutonSoumettre.addEventListener("click", soumettreFormulaire);

