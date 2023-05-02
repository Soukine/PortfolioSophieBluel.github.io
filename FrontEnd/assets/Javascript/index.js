const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4';

const gallery = document.querySelector('.gallery');

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
    const filterContainer = document.getElementById('filter-container');

    // Bouton "Tous"
    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.addEventListener('click', async () => {
        const response = await fetch('http://localhost:5678/api/works');
        const works = await response.json();
        gallery.innerHTML = '';

        works.forEach(work => {
            const workElement = document.createElement('figure');
            workElement.classList.add('work');

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
                    workElement.classList.add('work');

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
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    });
    const data = await response.json();
    //ajout de la fonction
    console.log(data);
};

// appel des fonctions
fetchWorks();
fetchCategories();

// exemple d'utilisation de la fonction deleteWork lorsqu'un bouton est cliqué
const deleteButton = document.querySelector('#delete-button');
deleteButton.addEventListener('click', () => {
    const workId = `2`; // l'ID de l'œuvre à supprimer
    deleteWork(workId);
});
