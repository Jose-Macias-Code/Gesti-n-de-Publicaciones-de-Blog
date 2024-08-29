document.addEventListener('DOMContentLoaded', () => {
    const postIndex = localStorage.getItem('editPostIndex');
    if (postIndex !== null) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = posts[postIndex];

        if (post) {
            document.getElementById('title').value = post.title;
            document.getElementById('autor').value = post.autor;
            document.getElementById('content').value = post.content;
            document.getElementById('tags').value = post.tags.join(', ');
        }
    }

    // Asociar la función de validación y guardado al botón de edición
    document.getElementById('edit-post-button').addEventListener('click', (e) => {
        e.preventDefault();
        saveEditedPost();
    });

    // Validar los campos mientras se edita
    document.getElementById('title').addEventListener('input', function() {
        validateField(this, validateTitle);
    });

    document.getElementById('autor').addEventListener('input', function() {
        validateField(this, validateAutor);
    });

    document.getElementById('content').addEventListener('input', function() {
        validateField(this, validateContent);
    });

    document.getElementById('tags').addEventListener('input', function() {
        validateField(this, validateTags);
    });
});

function saveEditedPost() {
    const postIndex = localStorage.getItem('editPostIndex');
    if (postIndex === null) return;

    const title = document.getElementById('title').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const content = document.getElementById('content').value.trim();
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

    // Validar Todos Los Campos
    const isTitleValid = validateField(document.getElementById('title'), validateTitle);
    const isAutorValid = validateField(document.getElementById('autor'), validateAutor);
    const isContentValid = validateField(document.getElementById('content'), validateContent);
    const isTagsValid = validateField(document.getElementById('tags'), validateTags);

    // Si Alguno De Los Campos Es Inválido, No Enviar El Formulario
    if (!isTitleValid || !isAutorValid || !isContentValid || !isTagsValid) {
        return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts[postIndex] = {
        title,
        autor,
        content,
        tags,
        date: posts[postIndex].date 
    };

    localStorage.setItem('posts', JSON.stringify(posts));
    window.location.href = 'index.html'; 
}

// Botón de Cancelar
document.getElementById('cancel-button').addEventListener('click', () => {
    window.location.href = 'index.html'; 
});
