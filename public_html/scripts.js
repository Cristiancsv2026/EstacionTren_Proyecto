
document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');
    const formEncuesta = document.getElementById('formEncuesta');

    // Manejo del registro de viajero
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const dpi = document.getElementById('dpi').value;
        const clase = document.getElementById('clase').value;

        // Guardar datos temporalmente
        localStorage.setItem('pasajero', nombre);

        // Mostrar boleto
        const datosBoleto = document.getElementById('datosBoleto');
        datosBoleto.innerHTML = `
            <p><strong>Pasajero:</strong> ${nombre}</p>
            <p><strong>DPI:</strong> ${dpi}</p>
            <p><strong>Clase:</strong> ${clase}</p>
            <p><strong>Hora Salida:</strong> 08:00 AM | <strong>Hora Llegada:</strong> 10:30 AM</p>
        `;

        document.getElementById('registro').classList.add('oculto');
        document.getElementById('boleto').classList.remove('oculto');
        document.getElementById('evaluacion').classList.remove('oculto');
    });

    // Manejo de la evaluación
    formEncuesta.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombrePasajero = localStorage.getItem('pasajero') || 'Viajero Ilustre';
        document.getElementById('diplomaNombre').textContent = nombrePasajero;

        document.getElementById('evaluacion').classList.add('oculto');
        document.getElementById('diploma').classList.remove('oculto');
    });
});