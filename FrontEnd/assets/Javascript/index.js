let tokenValue = localStorage.token;
const filterContainer = document.getElementById('filter-container');
const gallery = document.querySelector('.gallery');
const galleryEdit = document.querySelector('.galleryEdit');
const change = document.getElementById('change');

const fetchWorks = async () => {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    // Parcourir les données et créer un élément image pour chaque image
    if (data) {
        data.forEach(work => {
            const workElement = document.createElement('figure');
            const imageElement = document.createElement('img');
            imageElement.setAttribute('src', work.imageUrl);
            imageElement.setAttribute('alt', work.title);
            workElement.appendChild(imageElement);

            const titleElement = document.createElement('figcaption');
            titleElement.textContent = work.title;
            workElement.appendChild(titleElement);

            gallery.appendChild(workElement);
        });
    } else {
        console.log(data);
    }
};

const fetchWorksEdit = async () => {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();

    // Parcourir les données et créer un élément image pour chaque image
    if (data) {
        data.forEach((work, index) => {
            const workElement = document.createElement('div');
            workElement.classList.add("imgEdit");

            const imageElement = document.createElement('img');
            imageElement.setAttribute('src', work.imageUrl);
            imageElement.setAttribute('alt', work.title);
            workElement.appendChild(imageElement);
            //Arrow position 
            if (index === 0) {
                const iconArrowElement = document.createElement('i');
                iconArrowElement.classList.add('fa-solid', 'fa-arrows-up-down-left-right', 'absolute');
                workElement.appendChild(iconArrowElement);
            }

            const iconTrashElement = document.createElement('i');
            iconTrashElement.classList.add('fa-solid', 'fa-trash-can', 'absolute', 'delete');
            iconTrashElement.id = work.id;
            workElement.appendChild(iconTrashElement);
            iconTrashElement.addEventListener('click', () => deleteWork(work.id)
            );

            const titleElement = document.createElement('p');
            titleElement.textContent = 'éditer';
            workElement.appendChild(titleElement);

            galleryEdit.appendChild(workElement);
        });
    } else {
        console.log(data);
    }
};



const fetchCategories = async () => {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    // Bouton "Tous"
    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.addEventListener('click', async () => {
        const response = await fetch('http://localhost:5678/api/works');
        const works = await response.json();
        gallery.innerHTML = '';

        works.forEach(work => {
            const workElement = document.createElement('figure');

            const imageElement = document.createElement('img');
            imageElement.src = work.imageUrl;
            imageElement.alt = work.title;
            workElement.appendChild(imageElement);

            const titleElement = document.createElement('figcaption');
            titleElement.textContent = work.title;
            workElement.appendChild(titleElement);

            gallery.appendChild(workElement);
        });
    });

    filterContainer.appendChild(allButton);

    categories.forEach(category => {
        const filterElement = document.createElement('button');
        filterElement.textContent = category.name;

        filterElement.addEventListener('click', async () => {
            const response = await fetch(`http://localhost:5678/api/works?categoryId=${category.id}`);
            const works = await response.json();
            gallery.innerHTML = '';
            const workElement = document.createElement('figure');
            works.forEach(work => {
                if (work.categoryId === category.id) {
                    const workElement = document.createElement('figure');

                    const imageElement = document.createElement('img');
                    imageElement.src = work.imageUrl;
                    imageElement.alt = work.title;
                    workElement.appendChild(imageElement);

                    const titleElement = document.createElement('figcaption');
                    titleElement.textContent = work.title;
                    workElement.appendChild(titleElement);

                    gallery.appendChild(workElement);
                }
            });
        });
        filterContainer.appendChild(filterElement);
    });
};




const deleteWork = async (id) => {
    //const deleteIcons = document.querySelectorAll('.fa-trash-can');
    console.log(id);
    // deleteIcons.forEach(icon => {
    //         const workElement = event.target.closest('.imgEdit');
    //         console.log(icon.id);
    //         console.log('ok');
    //         const imageElement = workElement.querySelector('img');
    //         const imageSrc = imageElement.getAttribute('src');
    //         const workId = workElement.dataset.workId;

    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            //accept: "application/json",
            'Content-Type': "application/json",
            'Authorization': `Bearer ${tokenValue}`
        }
    });
    if (response.ok) {
        //workElement.remove();
        console.log('Supprimé');
    } else {
        console.error(`HTTP error! Status: ${response.status}`);
    }
};

function adminMode() {
    const changeBar = document.getElementById('changeBar');
    if (localStorage.getItem('token')) {
        filterContainer.style.display = "none";
        gallery.style.marginTop = "4rem";
        change.style.display = "flex";
        changeBar.style.display = "flex";

    } else {
        // si l'élément avec l'ID "container-filter" n'existe pas dans le document HTML
    }
    console.log(filterContainer);
};

const loginElement = document.getElementById('logout');

if (localStorage.getItem('token')) {
    loginElement.textContent = 'logout';
} else {
    loginElement.textContent = 'login';
};

loginElement.addEventListener('click', () => {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        loginElement.textContent = 'Login';
    }
});





const modalEdit = document.getElementById('modalEdit');
const openerEdit = document.getElementById('change');
let closeEdit = document.querySelector('#modalEdit .close');
const buttonEdit = document.getElementById('buttonEdit');
const modalFile = document.getElementById('modalFile');
let closeFile = document.querySelector('#modalFile .close');
let currentModal = null; // stocke la référence au modal actuellement ouvert

// Ajouter un écouteur d'événement au document
document.addEventListener('click', function (e) {
    // Vérifier si l'élément cliqué est le bouton d'ouverture du modal "modalEdit"
    if (e.target === openerEdit) {
        if (currentModal !== modalEdit) { // si un autre modal est ouvert
            if (currentModal) currentModal.style.display = 'none'; // fermer le modal actuel
            modalEdit.style.display = 'block'; // ouvrir le modal "modalEdit"
            currentModal = modalEdit; // mettre à jour la référence au modal actuel
        }
    }
    // Vérifier si l'élément cliqué est le bouton d'ouverture du modal "modalFile"
    else if (e.target === buttonEdit) {
        if (currentModal !== modalFile) { // si un autre modal est ouvert
            if (currentModal) currentModal.style.display = 'none'; // fermer le modal actuel
            modalFile.style.display = 'block'; // ouvrir le modal "modalFile"
            currentModal = modalFile; // mettre à jour la référence au modal actuel
        }
    }
    // Fermer le modal actuel si on clique en dehors de celui-ci
    else if (currentModal && ((!currentModal.contains(e.target) && e.target !== closeEdit) || (currentModal === modalFile && e.target === closeFile))) {
        currentModal.style.display = 'none';
        currentModal = null; // mettre à jour la référence au modal actuel
    }
});




//test
function fetchAddWork() {
    const titreInput = document.getElementById('titre');
    const categorieInput = document.getElementById('choix');
    const sendInput = document.getElementById('send');
    const addFile = document.getElementById('file');

    const formData = new FormData();
    formData.append('title', titreInput.value);
    formData.append('category', categorieInput.value);
    formData.append('image', addFile.files[0]);
    const previewDiv = document.getElementById('preview');

    titreInput.addEventListener('input', (e) => {
        titreInput = e.target.value;
    });

    categorieInput.addEventListener('input', (e) => {
        categorieInput = e.target.selectedIndex;
    });

    if (previewDiv && titreInput && categorieInput) {
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tokenValue}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Ajout de travail réussi :', data);
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        console.error('Tous les champs doivent être remplis');
    }
};





//voir l'image
const fileInput = document.getElementById("file");
const previewDiv = document.getElementById("preview");

fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            previewDiv.innerHTML = `<img src="${this.result}" alt="preview image">`;
        });

        reader.readAsDataURL(file);

        // Hide the upload icon
        const uploadIcon = document.querySelector("#fileImg i");
        uploadIcon.style.display = "none";
    }
});


// appel des fonctions

function initScript() {
    fetchWorks();
    fetchWorksEdit();
    fetchCategories();
    adminMode();
    deleteWork();
    fetchAddWork();
}
initScript();


