// Diccionario con valores de INPC (tomando todos los decimales necesarios)
const inpc = {
    2015: { enero: 87.110103, febrero: 87.275377, marzo: 87.630717, abril: 87.40384, mayo: 86.967366, junio: 87.113108, julio: 87.24082, agosto: 87.424875, septiembre: 87.752419, octubre: 88.203919, noviembre: 88.685468, diciembre: 89.046818 },
    2016: { enero: 89.386381, febrero: 89.777781, marzo: 89.910001, abril: 89.625278, mayo: 89.225615, junio: 89.324028, julio: 89.556914, agosto: 89.809333, septiembre: 90.357744, octubre: 90.906154, noviembre: 91.616834, diciembre: 92.039035 },
    2017: { enero: 93.603882, febrero: 94.14478, marzo: 94.722489, abril: 94.838933, mayo: 94.725494, junio: 94.96364, julio: 95.322736, agosto: 95.793768, septiembre: 96.093515, octubre: 96.698269, noviembre: 97.695174, diciembre: 98.272883 },
    2018: { enero: 98.795, febrero: 99.171374, marzo: 99.492157, abril: 99.154847, mayo: 98.99408, junio: 99.376465, julio: 99.909, agosto: 100.492, septiembre: 100.917, octubre: 101.44, noviembre: 102.303, diciembre: 103.02 },
    2019: { enero: 103.108, febrero: 103.079, marzo: 103.476, abril: 103.531, mayo: 103.233, junio: 103.299, julio: 103.687, agosto: 103.67, septiembre: 103.942, octubre: 104.503, noviembre: 105.346, diciembre: 105.934 },
    2020: { enero: 106.447, febrero: 106.889, marzo: 106.838, abril: 105.755, mayo: 106.162, junio: 106.743, julio: 107.444, agosto: 107.867, septiembre: 108.114, octubre: 108.774, noviembre: 108.856, diciembre: 109.271 },
    2021: { enero: 110.21, febrero: 110.907, marzo: 111.824, abril: 112.19, mayo: 112.419, junio: 113.018, julio: 113.682, agosto: 113.899, septiembre: 114.601, octubre: 115.561, noviembre: 116.884, diciembre: 117.308 },
    2022: { enero: 118.002, febrero: 118.981, marzo: 120.159, abril: 120.809, mayo: 121.022, junio: 122.044, julio: 122.948, agosto: 123.803, septiembre: 124.571, octubre: 125.276, noviembre: 125.997, diciembre: 126.478 },
    2023: { enero: 127.336, febrero: 128.046, marzo: 128.389, abril: 128.363, mayo: 128.084, junio: 128.214, julio: 128.832, agosto: 129.545, septiembre: 130.12, octubre: 130.609, noviembre: 131.445, diciembre: 132.373 },
    2024: { enero: 133.555, febrero: 133.681, marzo: 134.065, abril: 134.336, mayo: 134.087, junio: 134.594, julio: 136.003, agosto: 136.013, septiembre: 136.08, octubre: 136.828, noviembre: 137.424, diciembre: 137.949 },
    2025: { enero: 138.343, febrero: 138.726, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0 }
};


// Función para calcular la actualización de la pérdida fiscal
function calcularActualizacion() {
    const perdidaInicial = parseFloat(document.getElementById('perdida').value);
    const anioInicio = parseInt(document.getElementById('anio_inicio').value);
    const anioFin = parseInt(document.getElementById('anio_final').value);

    if (isNaN(perdidaInicial) || !anioInicio || !anioFin || anioFin <= anioInicio) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Datos INPC para el cálculo
    let inpcInicio = inpc[anioInicio].julio;
    let inpcFin = inpc[anioFin].diciembre;

    // Cálculo del factor de actualización
    let factorActualizacion = inpcFin / inpcInicio;

    // Cálculo de la pérdida fiscal actualizada
    let perdidaFiscal = perdidaInicial * factorActualizacion;

    // Mostrar los resultados
    const resultadoDiv = document.getElementById('resultado');
    document.getElementById('perdida_actualizada_resultado_anual').innerHTML = 
        `<tr>
            <td>${anioInicio}</td>
            <td>${anioFin}</td>
            <td>${inpcInicio.toFixed(3)}</td>
            <td>${inpcFin.toFixed(3)}</td>
            <td>${factorActualizacion.toFixed(8)}</td>
            <td>${perdidaFiscal.toFixed(2)}</td>
        </tr>`;
    resultadoDiv.style.display = "block";
}

// Función para calcular la pérdida fiscal por año
function calcularPorAnio() {
    const perdidaInicial = parseFloat(document.getElementById('perdida').value);
    const anioInicio = parseInt(document.getElementById('anio_inicio').value);
    const anioFin = parseInt(document.getElementById('anio_final').value);

    if (isNaN(perdidaInicial) || !anioInicio || !anioFin || anioFin <= anioInicio) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Mostrar los resultados de la actualización por año
    const resultadoDiv = document.getElementById('resultadoPorAnio');
    let htmlResultado = '';
    for (let anio = anioInicio; anio <= anioFin; anio++) {
        let inpcInicio = inpc[anio].julio;
        let inpcFin = inpc[anio].diciembre;

        // Cálculo del factor de actualización
        let factorActualizacion = inpcFin / inpcInicio;

        // Cálculo de la pérdida fiscal actualizada
        let perdidaFiscal = perdidaInicial * factorActualizacion;

        htmlResultado += 
            `<tr>
                <td>${anio}</td>
                <td>${anio}</td>
                <td>${inpcInicio.toFixed(3)}</td>
                <td>${inpcFin.toFixed(3)}</td>
                <td>${factorActualizacion.toFixed(8)}</td>
                <td>${perdidaFiscal.toFixed(2)}</td>
            </tr>`;
    }
    document.getElementById('perdida_actualizada_resultado_anio').innerHTML = htmlResultado;
    resultadoDiv.style.display = "block";
}

// Función para calcular la pérdida fiscal para el segundo año
function calcularSegundoAnio() {
    const perdidaInicial = parseFloat(document.getElementById('perdida').value);
    const anioInicio = parseInt(document.getElementById('anio_inicio').value);
    const anioFin = parseInt(document.getElementById('anio_final').value);

    if (isNaN(perdidaInicial) || !anioInicio || !anioFin || anioFin <= anioInicio) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Datos INPC para el segundo año (diciembre 2023 y junio 2024)
    let inpcInicio = inpc[anioInicio].diciembre;
    let inpcFin = inpc[anioFin].junio;

    // Cálculo del factor de actualización
    let factorActualizacion = inpcFin / inpcInicio;

    // Cálculo de la pérdida fiscal actualizada para el segundo año
    let perdidaFiscal = perdidaInicial * factorActualizacion;

    // Mostrar los resultados en la nueva tabla
    const resultadoDiv = document.getElementById('resultadoSegundoAnio');
    document.getElementById('perdida_fiscal_segundo_anio').innerHTML = 
        `<tr>
            <td>${anioInicio}</td>
            <td>${anioFin}</td>
            <td>${inpcInicio.toFixed(3)}</td>
            <td>${inpcFin.toFixed(3)}</td>
            <td>${factorActualizacion.toFixed(8)}</td>
            <td>${perdidaFiscal.toFixed(2)}</td>
        </tr>`;
    resultadoDiv.style.display = "block";
}

// Función para calcular la pérdida fiscal para el tercer año
function calcularTercerAnio() {
    const perdidaInicial = parseFloat(document.getElementById('perdida').value);
    const anioInicio = parseInt(document.getElementById('anio_inicio').value);
    const anioFin = parseInt(document.getElementById('anio_final').value);

    if (isNaN(perdidaInicial) || !anioInicio || !anioFin || anioFin <= anioInicio) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Datos INPC para el tercer año (junio 2023 y junio 2024)
    let inpcInicio = inpc[anioInicio].junio;
    let inpcFin = inpc[anioFin].junio;

    // Cálculo del factor de actualización
    let factorActualizacion = inpcFin / inpcInicio;

    // Cálculo de la pérdida fiscal actualizada para el tercer año
    let perdidaFiscal = perdidaInicial * factorActualizacion;

    // Mostrar los resultados en la nueva tabla
    const resultadoDiv = document.getElementById('resultadoTercerAnio');
    document.getElementById('perdida_fiscal_tercer_anio').innerHTML = 
        `<tr>
            <td>${anioInicio}</td>
            <td>${anioFin}</td>
            <td>${inpcInicio.toFixed(3)}</td>
            <td>${inpcFin.toFixed(3)}</td>
            <td>${factorActualizacion.toFixed(8)}</td>
            <td>${perdidaFiscal.toFixed(2)}</td>
        </tr>`;
    resultadoDiv.style.display = "block";
}

// Función para calcular la pérdida fiscal para el cuarto año
function calcularCuartoAnio() {
    const perdidaInicial = parseFloat(document.getElementById('perdida').value);
    const anioInicio = parseInt(document.getElementById('anio_inicio').value);
    const anioFin = parseInt(document.getElementById('anio_final').value);

    if (isNaN(perdidaInicial) || !anioInicio || !anioFin || anioFin <= anioInicio) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Datos INPC para el cuarto año 
    let inpcInicio = inpc[anioInicio].junio;
    let inpcFin = inpc[anioFin].junio;

    // Cálculo del factor de actualización
    let factorActualizacion = inpcFin / inpcInicio;

    // Cálculo de la pérdida fiscal actualizada para el cuarto año
    let perdidaFiscal = perdidaInicial * factorActualizacion;

    // Mostrar los resultados en la nueva tabla
    const resultadoDiv = document.getElementById('resultadoCuartoAnio');
    document.getElementById('perdida_fiscal_cuarto_anio').innerHTML = 
        `<tr>
            <td>${anioInicio}</td>
            <td>${anioFin}</td>
            <td>${inpcInicio.toFixed(3)}</td>
            <td>${inpcFin.toFixed(3)}</td>
            <td>${factorActualizacion.toFixed(8)}</td>
            <td>${perdidaFiscal.toFixed(2)}</td>
        </tr>`;
    resultadoDiv.style.display = "block";
}

// Función para calcular la pérdida fiscal para el quinto año
function calcularQuintoAnio() {
    const perdidaInicial = parseFloat(document.getElementById('perdida').value);
    const anioInicio = parseInt(document.getElementById('anio_inicio').value);
    const anioFin = parseInt(document.getElementById('anio_final').value);

    if (isNaN(perdidaInicial) || !anioInicio || !anioFin || anioFin <= anioInicio) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Datos INPC para el quinto año (junio 2024 y junio 2025)
    let inpcInicio = inpc[anioInicio].junio;
    let inpcFin = inpc[anioFin].junio;

    // Cálculo del factor de actualización
    let factorActualizacion = inpcFin / inpcInicio;

    // Cálculo de la pérdida fiscal actualizada para el quinto año
    let perdidaFiscal = perdidaInicial * factorActualizacion;

    // Mostrar los resultados en la nueva tabla
    const resultadoDiv = document.getElementById('resultadoQuintoAnio');
    document.getElementById('perdida_fiscal_quinto_anio').innerHTML = 
        `<tr>
            <td>${anioInicio}</td>
            <td>${anioFin}</td>
            <td>${inpcInicio.toFixed(3)}</td>
            <td>${inpcFin.toFixed(3)}</td>
            <td>${factorActualizacion.toFixed(8)}</td>
            <td>${perdidaFiscal.toFixed(2)}</td>
        </tr>`;
    resultadoDiv.style.display = "block";
}
