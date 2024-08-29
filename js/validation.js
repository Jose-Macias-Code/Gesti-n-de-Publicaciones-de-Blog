// Validaciones Específicas
function validateTitle(title) {
    if (title === '' || title.length < 5 || title.length > 30) {
        return 'The title is required and must be at least 5 and no more than 30 characters long.';
    }
    return '';
}

function validateAutor(autor) {
    const autorRegex = /^[\p{L}\s]+$/u;
    if (autor === '' || !autorRegex.test(autor) || autor.length > 25) {
        return 'The author is required, can only contain letters and spaces, and must be up to 25 characters long.';
    }
    return '';
}

function validateContent(content) {
    const wordCount = content.split(/\s+/).length;
    if (content === '' || wordCount < 5 || wordCount > 20) {
        return 'The content is required, must be at least 5 words long, and cannot exceed 20 words.';
    }
    return '';
}

function validateTags(tags) {
    if (/,,|(^,)|(^$)|,$/.test(tags)) {
        return 'Tags must be separated by a single comma without extra spaces, and cannot start or end with a comma.';
    }

    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    if (tagsArray.length === 0 || tagsArray.length > 5) {
        return 'You must add between 1 and 5 tags.';
    }

    const maxLength = 15;
    for (let tag of tagsArray) {
        if (tag.length > maxLength) {
            return `Each tag cannot be more than ${maxLength} characters long.`;
        }
    }

    return '';
}

// Validar Campo Individual
function validateField(input, validationFunction) {
    const errorMessage = validationFunction(input.value.trim());
    const container = input.closest('.container-input'); 
    const errorSpan = container.querySelector('span'); 

    if (errorMessage) {
        input.classList.add('error'); 
        container.classList.add('error'); 
        errorSpan.textContent = errorMessage;
        return false;
    } else {
        input.classList.remove('error'); 
        container.classList.remove('error'); 
        errorSpan.textContent = '';
        return true;
    }
}
