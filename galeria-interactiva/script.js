document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const elements = {
        input: document.getElementById('imageUrl'),
        addBtn: document.getElementById('addButton'),
        removeBtn: document.getElementById('removeButton'),
        gallery: document.getElementById('animalGallery')
    };
    
    // Estado de la aplicación
    let state = {
        selectedImage: null,
        defaultImages: [
            'img/leon.jpg',
            'img/elefante.jpg',
            'img/tigre.jpg'
        ]
    };
    
    // Funciones principales
    const methods = {
        // Agrega una nueva imagen (desde input o parámetro)
        addImage: function(imageUrl) {
            const url = imageUrl || elements.input.value.trim();
            
            if (!url) {
                alert('Por favor ingresa una URL válida');
                return;
            }
            
            const imgContainer = document.createElement('div');
            imgContainer.className = 'image-container';
            
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Imagen de animal';
            
            img.addEventListener('click', () => this.selectImage(img));
            
            imgContainer.appendChild(img);
            elements.gallery.appendChild(imgContainer);
            
            if (!imageUrl) elements.input.value = '';
        },
        
        // Selecciona/deselecciona una imagen
        selectImage: function(img) {
            if (state.selectedImage) {
                state.selectedImage.classList.remove('selected');
            }
            
            img.classList.add('selected');
            state.selectedImage = img;
        },
        
        // Elimina la imagen seleccionada
        removeImage: function() {
            if (!state.selectedImage) {
                alert('No hay ninguna imagen seleccionada');
                return;
            }
            
            state.selectedImage.parentElement.remove();
            state.selectedImage = null;
        },
        
        // Carga imágenes por defecto
        loadDefaults: function() {
            state.defaultImages.forEach(img => this.addImage(img));
        },
        
        // Maneja el evento keydown
        handleKeyDown: function(e) {
            if (e.key === 'Enter') this.addImage();
        }
    };
    
    // Event Listeners
    elements.addBtn.addEventListener('click', () => methods.addImage());
    elements.removeBtn.addEventListener('click', () => methods.removeImage());
    elements.input.addEventListener('keydown', (e) => methods.handleKeyDown(e));
    
    // Inicialización
    methods.loadDefaults();
});