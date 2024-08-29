document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('container-post');

    const filterPopup = document.getElementById('filter-popup');
    const closePopup = document.getElementById('close-popup');
    const filterLink = document.getElementById('filter-link');
    const applyFiltersButton = document.getElementById('apply-filters');
    const resetFiltersButton = document.getElementById('reset-filters');
    const filterTagsInput = document.getElementById('filter-tags');

    // Recuperar Los Post De LocalStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Función Para Renderizar Los Posts
    function renderPosts(posts) {
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p>There are no posts available.</p>';
        } else {
            postsContainer.innerHTML = posts.map((post, index) => `
                <div class="post">
                    <h3>${post.title}</h3>
                    <p><strong>Autor:</strong> ${post.autor}</p>
                    <p>${post.content}</p>
                    <p><strong>Tags:</strong> ${post.tags.join(', ')}</p>
                    <p><small>${post.date}</small></p>
                    <div class="post-actions">
                        <button class="edit-button" title="Edit" onclick="editPost(${index})"><i class="fas fa-edit"></i></button>
                        <button class="delete-button" title="Delete" onclick="deletePost(${index})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Mostrar Los Posts Al Cargar
    renderPosts(posts);

    // Abrir Ventana Emergente
    filterLink.addEventListener('click', () => {
        filterPopup.style.display = 'block';
    });

    // Cerrar Ventana Emergente
    closePopup.addEventListener('click', () => {
        filterPopup.style.display = 'none';
    });

    // Aplicar Filtros
    applyFiltersButton.addEventListener('click', () => {
        const filterTags = filterTagsInput.value.trim().split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        const filteredPosts = posts.filter(post => 
            filterTags.every(tag => post.tags.includes(tag))
        );
        renderPosts(filteredPosts);
        filterPopup.style.display = 'none';
    });

    // Restablecer Filtros
    resetFiltersButton.addEventListener('click', () => {
        filterTagsInput.value = '';
        renderPosts(posts);
        filterPopup.style.display = 'none';
    });
});

// Función Para Editar Un Post 
function editPost(index) {
    localStorage.setItem('editPostIndex', index);
    window.location.href = 'edit.html';
}

// Función Para Eliminar Un Post
function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    location.reload(); 
}
