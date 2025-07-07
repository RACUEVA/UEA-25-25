document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del formulario
    const form = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const edadInput = document.getElementById('edad');
    const submitBtn = document.getElementById('submitBtn');

    // Expresiones regulares para validaciones
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    // Objeto para rastrear el estado de validación de cada campo
    const validationState = {
        nombre: false,
        email: false,
        password: false,
        confirmPassword: false,
        edad: false
    };

    // Función para validar el nombre
    function validateNombre() {
        const value = nombreInput.value.trim();
        const errorElement = document.getElementById('nombreError');
        
        if (value.length < 3) {
            nombreInput.classList.add('invalid');
            nombreInput.classList.remove('valid');
            errorElement.textContent = 'El nombre debe tener al menos 3 caracteres';
            validationState.nombre = false;
        } else {
            nombreInput.classList.add('valid');
            nombreInput.classList.remove('invalid');
            errorElement.textContent = '';
            validationState.nombre = true;
        }
        updateSubmitButton();
    }

    // Función para validar el email
    function validateEmail() {
        const value = emailInput.value.trim();
        const errorElement = document.getElementById('emailError');
        
        if (!emailRegex.test(value)) {
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
            errorElement.textContent = 'Por favor ingresa un correo electrónico válido';
            validationState.email = false;
        } else {
            emailInput.classList.add('valid');
            emailInput.classList.remove('invalid');
            errorElement.textContent = '';
            validationState.email = true;
        }
        updateSubmitButton();
    }

    // Función para validar la contraseña
    function validatePassword() {
        const value = passwordInput.value;
        const errorElement = document.getElementById('passwordError');
        
        if (!passwordRegex.test(value)) {
            passwordInput.classList.add('invalid');
            passwordInput.classList.remove('valid');
            errorElement.textContent = 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial';
            validationState.password = false;
        } else {
            passwordInput.classList.add('valid');
            passwordInput.classList.remove('invalid');
            errorElement.textContent = '';
            validationState.password = true;
        }
        
        // Validar también la confirmación de contraseña cuando cambia la contraseña
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
        updateSubmitButton();
    }

    // Función para validar la confirmación de contraseña
    function validateConfirmPassword() {
        const value = confirmPasswordInput.value;
        const passwordValue = passwordInput.value;
        const errorElement = document.getElementById('confirmPasswordError');
        
        if (value !== passwordValue) {
            confirmPasswordInput.classList.add('invalid');
            confirmPasswordInput.classList.remove('valid');
            errorElement.textContent = 'Las contraseñas no coinciden';
            validationState.confirmPassword = false;
        } else {
            confirmPasswordInput.classList.add('valid');
            confirmPasswordInput.classList.remove('invalid');
            errorElement.textContent = '';
            validationState.confirmPassword = true;
        }
        updateSubmitButton();
    }

    // Función para validar la edad
    function validateEdad() {
        const value = parseInt(edadInput.value);
        const errorElement = document.getElementById('edadError');
        
        if (isNaN(value) || value < 18) {
            edadInput.classList.add('invalid');
            edadInput.classList.remove('valid');
            errorElement.textContent = 'Debes tener al menos 18 años';
            validationState.edad = false;
        } else {
            edadInput.classList.add('valid');
            edadInput.classList.remove('invalid');
            errorElement.textContent = '';
            validationState.edad = true;
        }
        updateSubmitButton();
    }

    // Función para actualizar el estado del botón de envío
    function updateSubmitButton() {
        const allValid = Object.values(validationState).every(state => state);
        submitBtn.disabled = !allValid;
    }

    // Función para manejar el envío del formulario
    function handleSubmit(event) {
        event.preventDefault();
        
        // Validar todos los campos nuevamente por si acaso
        validateNombre();
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        validateEdad();
        
        // Verificar si todos los campos son válidos
        const allValid = Object.values(validationState).every(state => state);
        
        if (allValid) {
            alert('¡Formulario enviado con éxito!');
            form.reset();
            
            // Limpiar clases de validación
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            
            // Deshabilitar el botón de envío nuevamente
            submitBtn.disabled = true;
            
            // Resetear el estado de validación
            Object.keys(validationState).forEach(key => {
                validationState[key] = false;
            });
        }
    }

    // Función para manejar el reinicio del formulario
    function handleReset() {
        // Limpiar mensajes de error
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Limpiar clases de validación
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
        // Deshabilitar el botón de envío
        submitBtn.disabled = true;
        
        // Resetear el estado de validación
        Object.keys(validationState).forEach(key => {
            validationState[key] = false;
        });
    }

    // Agregar event listeners
    nombreInput.addEventListener('input', validateNombre);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    edadInput.addEventListener('input', validateEdad);
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('reset', handleReset);
});