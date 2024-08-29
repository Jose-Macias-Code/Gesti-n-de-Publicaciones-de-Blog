document.addEventListener('DOMContentLoaded', () => {
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

function savePost(event) {
    event.preventDefault();

    const title = document.getElementById('title');
    const autor = document.getElementById('autor');
    const content = document.getElementById('content');
    const tagsInput = document.getElementById('tags');

    // Validar Todos Los Campos
    const isTitleValid = validateField(title, validateTitle);
    const isAutorValid = validateField(autor, validateAutor);
    const isContentValid = validateField(content, validateContent);
    const isTagsValid = validateField(tagsInput, validateTags);

    // Si Alguno De Los Campos Es Inválido, No Enviar El Formulario
    if (!isTitleValid || !isAutorValid || !isContentValid || !isTagsValid) {
        return;
    }

    // Crear Un Objeto Si Todo Es Válido
    const post = {
        title: title.value.trim(),
        autor: autor.value.trim(),
        content: content.value.trim(),
        tags: tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        date: new Date().toLocaleDateString()
    };

    // Guardar El Post En El LocalStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    window.location.href = 'index.html';
}

// Botón de Cancelar
document.getElementById('cancel-button').addEventListener('click', () => {
    window.location.href = 'index.html'; 
});

// Asociar La función savePost Al Botón Create-Post
document.getElementById('create-post-button').addEventListener('click', savePost);
