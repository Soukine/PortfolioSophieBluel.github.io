let tokenValue = localStorage.token;
const filterContainer = document.getElementById('filter-container');
const gallery = document.querySelector('.gallery');
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

const fetchCategories = async () => {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();


    // Bouton "Tous"
    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.addEventListener('click', async () => {
        const response = await fetch('http://localhost:5678/api/works');
        const works = await response.json();
        gallery.innerHTML = ''; 0

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






const deleteWork = async (workId) => {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    });
    const data = await response.json();
    // vérifier que la réponse est bien de type JSON avant de l'utiliser
    if (response.ok) {
        console.log(data);
    } else {
        console.error(data);
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



const loginElement = document.querySelector('#logout');

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


// appel des fonctions
fetchWorks();
fetchCategories();
adminMode();

// exemple d'utilisation de la fonction deleteWork lorsqu'un bouton est cliqué
//const deleteButton = document.querySelector('#delete-button');
//deleteButton.addEventListener('click', () => {
//    const workId = '2'; // l'ID de l'œuvre à supprimer
//    deleteWork(workId);
//});

