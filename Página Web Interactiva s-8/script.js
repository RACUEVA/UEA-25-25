// Botón de alerta personalizada
document.getElementById("alerta-btn").addEventListener("click", function() {
    alert("¡Bienvenido! Esta es una alerta personalizada usando JavaScript.");
});

// Validación dinámica del formulario de contacto
document.getElementById("form-contacto").addEventListener("submit", function(e) {
    let valido = true;

["nombre", "correo", "mensaje"].forEach((campo) => {
    const input = document.getElementById(campo);
    if (!input.value.trim()) {
        input.classList.add("is-invalid");
        valido = false;
    } else {
        input.classList.remove("is-invalid");
    }
    });

    if (!valido) {
        e.preventDefault();
    }
});
