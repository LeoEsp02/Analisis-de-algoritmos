// Función principal para QuickSort
function quickSort(array, low, high) {
    if (low < high) {
        // Encuentra la posición de partición y ordena los elementos a su izquierda y derecha
        const partitionIndex = partition(array, low, high);

        // Recursivamente ordenar los elementos antes y después de la partición
        quickSort(array, low, partitionIndex - 1);
        quickSort(array, partitionIndex + 1, high);
    }
}

// Función auxiliar para encontrar la posición de partición
function partition(array, low, high) {
    const pivot = array[high]; // Selecciona el último elemento como pivote
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            // Intercambia array[i] y array[j]
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    // Intercambia array[i+1] y array[high] (o el pivote)
    const temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    return i + 1; // Devuelve la posición del pivote después de la partición
}

// Elementos del DOM
const size = document.getElementById('size');
const btn = document.getElementById('btn');
const tablaValores = document.getElementById('contenedorTabla');
const grafica = document.getElementById('grafica');
let min = 1000000;
let max = 10000000;

// Evento click del botón
btn.addEventListener('click', (e) => {
    e.preventDefault();

    // Validación de entrada
    if (size.value === '') {
        alert('No hay datos para ejecutar el arreglo');
    } else {
        // Inicialización de variables y generación de arreglos
        let tamanioArreglo = parseInt(size.value);
        const INCREMENTO = tamanioArreglo;
        let array;
        let valores = [];
        let tiemposEjecucion = [];
        size.value = '';

        for (let i = 0; i < 10; i++) {
            // Genera un arreglo aleatorio
            array = Array(tamanioArreglo)
                .fill()
                .map(() => Math.floor(Math.random() * (max - min) + min));

            // Mide el tiempo de ejecución de QuickSort
            let start = performance.now();
            quickSort(array, 0, array.length - 1);
            let end = performance.now();

            // Calcula el tiempo y guarda el tamaño del arreglo
            let tiempo = end / 100 - start / 100;
            valores.push(tamanioArreglo);
            tiemposEjecucion.push(tiempo);
            tamanioArreglo += INCREMENTO;
        }

        // Llena la tabla con los resultados y grafica los tiempos
        llenarTabla(valores, tiemposEjecucion);
        graficar(valores, tiemposEjecucion);
    }
});

// Función para llenar la tabla con resultados
function llenarTabla(valores, tiemposEjecucion) {
    let html = `
      <table class="tabla-valores">
        <thead>
          <tr>
            <th scope="col">Iteraciones</th>
            <th scope="col">Total Valores</th>
            <th scope="col">Tiempo de Ejecución</th>
          </tr>
        </thead>        
      <tbody>
    `;

    for (let i = 0; i < valores.length; i++) {
        html += `
        <tr>
          <td>${i + 1}</td>
          <td>${valores[i]}</td>
          <td>${tiemposEjecucion[i]}</td>
        </tr>
      `;
    }

    html += `
        </tbody>
      </table>
    `;

    tablaValores.innerHTML = html;
}

// Función para graficar los tiempos de ejecución
function graficar(valores, tiemposEjecucion) {
    const etiquetas = valores;

    const datosTiempo = {
        label: 'Tiempo de ejecución',
        data: tiemposEjecucion,
        borderColor: 'rgb(162,100,42)',
        borderWidth: 5.5,
    };

    // Crea una gráfica utilizando la librería Chart.js
    new Chart(grafica, {
        type: 'line',
        data: {
            labels: etiquetas,
            datasets: [datosTiempo],
        },
        options: {
            animation: {
                duration: 0,
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    })}
