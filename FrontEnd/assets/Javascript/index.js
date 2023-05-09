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
            workElement.appendChild(iconTrashElement);

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




const deleteWork = async () => {
    const deleteIcons = document.querySelectorAll('.fa-trash-can');
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', async (event) => {
            const workElement = event.target.closest('.imgEdit');
            const imageElement = workElement.querySelector('img');
            const imageSrc = imageElement.getAttribute('src');
            const workId = workElement.dataset.workId;

            const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                method: 'DELETE',
                headers: {
                    accept: "application/json",
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${tokenValue}`
                }
            });
            if (response.ok) {
                workElement.remove();
                console.log('Supprimé');
            } else {
                console.error(`HTTP error! Status: ${response.status}`);
            }
        });
    });
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
//ouvrir modal
change.addEventListener('click', () => {
    const myModal = document.getElementById('modalEdit');
    myModal.style.display = "block";

    const close = document.querySelector('.close');
    close.addEventListener('click', () => {
        myModal.style.display = "none";

    });
    const buttonEdit = document.getElementById('buttonEdit');
    const modalFile = document.getElementById('modalFile');
    buttonEdit.addEventListener('click', () => {
        myModal.style.display = "none";
        modalFile.style.display = "block";
    });
});




// appel des fonctions
fetchWorks();
fetchWorksEdit();
fetchCategories();
adminMode();
deleteWork();

// exemple d'utilisation de la fonction deleteWork lorsqu'un bouton est cliqué

