// Función principal para el algoritmo de Merge Sort
function mergeSort(array) {
    if (array.length <= 1) {
        return array; // Retorna el arreglo si su longitud es 1 o menos
    }

    // Divide el arreglo en dos partes y aplica mergeSort recursivamente
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    // Combina las partes ordenadas usando la función merge
    return merge(mergeSort(left), mergeSort(right));
}

// Función para combinar dos arreglos ordenados
function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compara elementos de left y right, agrega el menor al resultado
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Agrega los elementos restantes de left y right (si los hay)
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Elementos del DOM
const size = document.getElementById('size');
const btn = document.getElementById('btn');
const tablaValores = document.getElementById('contenedorTabla');
const grafica = document.getElementById('grafica');
let min = 1000000;
let max = 10000000;

// click del botón
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

        // Realiza 10 iteraciones para diferentes tamaños de arreglos
        for (let i = 0; i < 10; i++) {
            // Genera un arreglo aleatorio
            array = Array(tamanioArreglo)
                .fill()
                .map(() => Math.floor(Math.random() * (max - min) + min));

            // Mide el tiempo de ejecución de mergeSort
            let start = performance.now();
            mergeSort(array);
            let end = performance.now();

            // Calcula el tiempo y guarda el tamaño del arreglo
            let tiempo = end - start;
            valores.push(tamanioArreglo);
            tiemposEjecucion.push(tiempo);
            tamanioArreglo += INCREMENTO;
        }

        // Llena la tabla con los resultados y grafica los tiempos
        llenarTabla(valores, tiemposEjecucion);
        graficar(valores, tiemposEjecucion);
    }
});

// Llena la tabla con los tamaños de los arreglos y tiempos de ejecución
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

// Grafica los tiempos de ejecución en gráfica 
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
    });
}

// Animación de entrada para la gráfica 
gsap.fromTo(
    grafica,
    { y: -grafica.height },
    { y: 0, duration: 1.5, ease: "power3.out" }
);
