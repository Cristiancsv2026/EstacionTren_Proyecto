document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formEncuesta');
    const mensajeExito = document.getElementById('mensajeExito');
    const btnReiniciar = document.getElementById('btnReiniciar');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const datosFormulario = new FormData(form);

            fetch('evaluacion.php', {
                method: 'POST',
                body: datosFormulario
            })
            .then(response => response.text())
            .then(resultado => {
                if (resultado.trim() === 'success') {
                    form.style.display = 'none';
                    if (mensajeExito) {
                        mensajeExito.style.display = 'block';
                    }
                } else {
                    alert('Error al guardar en la base de datos.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('No se pudo conectar con el servidor.');
            });
        });
    }

    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', function () {
            if (form) {
                form.reset();
                form.style.display = 'block';
            }
            if (mensajeExito) {
                mensajeExito.style.display = 'none';
            }
        });
    }
});