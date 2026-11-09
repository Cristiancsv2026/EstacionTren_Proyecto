document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formBoletos');
    const boletoDigital = document.getElementById('boletoDigital');
    const btnVolver = document.getElementById('btnVolver');
    const selectRuta = document.getElementById('ruta');
    const selectClase = document.getElementById('clase');
    const inputPasajeros = document.getElementById('pasajeros');
    const spanTotal = document.getElementById('spanTotal');
    const contenedorExtra = document.getElementById('contenedorPasajerosExtra');

    function calcularTotal() {
        if (!selectRuta || !selectClase || !inputPasajeros || !spanTotal) return;
        const optionRuta = selectRuta.options[selectRuta.selectedIndex];
        const precioRuta = parseFloat(optionRuta.getAttribute('data-precio')) || 0;
        
        const optionClase = selectClase.options[selectClase.selectedIndex];
        const precioClase = parseFloat(optionClase.getAttribute('data-precio')) || 0;
        
        const cantidad = parseInt(inputPasajeros.value) || 1;
        
        const total = (precioRuta + precioClase) * cantidad;
        spanTotal.textContent = '$' + total.toFixed(2);
    }

    if (selectRuta && selectClase && inputPasajeros) {
        selectRuta.addEventListener('change', calcularTotal);
        selectClase.addEventListener('change', calcularTotal);
        inputPasajeros.addEventListener('input', calcularTotal);
    }

    if (inputPasajeros && contenedorExtra) {
        inputPasajeros.addEventListener('input', function() {
            const cantidad = parseInt(inputPasajeros.value) || 1;
            contenedorExtra.innerHTML = '';
            
            for (let i = 2; i <= cantidad; i++) {
                const div = document.createElement('div');
                div.className = 'pasajero-extra-box';
                div.innerHTML = `
                    <h4 style="color: #ffb7c5; margin: 15px 0 10px 0; font-size: 0.95em;">Pasajero Adicional #${i}</h4>
                    <label>Nombre:</label>
                    <input type="text" class="extra-nombre" placeholder="Nombre completo" required>
                    
                    <label>Pasaporte:</label>
                    <input type="text" class="extra-pasaporte" placeholder="Número de pasaporte" required>
                `;
                contenedorExtra.appendChild(div);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const pasajeros = document.getElementById('pasajeros').value;
            const rutaSelect = document.getElementById('ruta');
            const rutaTexto = rutaSelect.options[rutaSelect.selectedIndex].text;
            const fechaIda = document.getElementById('fechaIda').value;
            const horarioIdaSelect = document.getElementById('horarioIda');
            const horarioIdaTexto = horarioIdaSelect.options[horarioIdaSelect.selectedIndex].text;
            const fechaRegreso = document.getElementById('fechaRegreso').value;
            const horarioRegresoSelect = document.getElementById('horarioRegreso');
            const horarioRegresoTexto = horarioRegresoSelect.options[horarioRegresoSelect.selectedIndex].text;
            const metodoPago = document.getElementById('metodoPago').value;
            const totalFinal = spanTotal ? spanTotal.textContent : '$0';

            const numPasajero = "JAP-" + Math.floor(1000 + Math.random() * 9000);

            document.getElementById('resNombre').textContent = nombre;
            document.getElementById('resPasajeros').textContent = pasajeros;
            document.getElementById('resRuta').textContent = rutaTexto;
            document.getElementById('resFechaIda').textContent = fechaIda;
            document.getElementById('resHorarioIda').textContent = horarioIdaTexto;
            document.getElementById('resFechaRegreso').textContent = fechaRegreso;
            document.getElementById('resHorarioRegreso').textContent = horarioRegresoTexto;
            document.getElementById('resPago').textContent = metodoPago;
            document.getElementById('resTotal').textContent = totalFinal;
            document.getElementById('resNumero').textContent = numPasajero;

            form.style.display = 'none';
            if (boletoDigital) {
                boletoDigital.style.display = 'block';
            }
        });
    }

    if (btnVolver) {
        btnVolver.addEventListener('click', function () {
            if (form) {
                form.reset();
                if (spanTotal) spanTotal.textContent = '$0';
                if (contenedorExtra) contenedorExtra.innerHTML = '';
                form.style.display = 'block';
            }
            if (boletoDigital) {
                boletoDigital.style.display = 'none';
            }
        });
    }
});