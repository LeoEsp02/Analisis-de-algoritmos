function selectionSort(array) {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            const temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }
    }
}

const size = document.getElementById('size');
const btn = document.getElementById('btn');
const tablaValores = document.getElementById('contenedorTabla');
const grafica = document.getElementById('grafica');
let min = 1000000;
let max = 10000000;

btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (size.value === '') {
        alert('No hay datos para ejecutar el arreglo');
    } else {
        let tamanioArreglo = parseInt(size.value);
        const INCREMENTO = tamanioArreglo;
        let array;
        let valores = [];
        let tiemposEjecucion = [];
        size.value = '';

        for (let i = 0; i < 10; i++) {
            array = Array(tamanioArreglo)
                .fill()
                .map(() => Math.floor(Math.random() * (max - min) + min));

            let start = performance.now();
            selectionSort(array);
            let end = performance.now();

            let tiempo = end / 100 - start / 100;
            valores.push(tamanioArreglo);
            tiemposEjecucion.push(tiempo);
            tamanioArreglo += INCREMENTO;
        }

        llenarTabla(valores, tiemposEjecucion);
        graficar(valores, tiemposEjecucion);
    }
});

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

function graficar(valores, tiemposEjecucion) {
    const etiquetas = valores;

    const datosTiempo = {
        label: 'Tiempo de ejecución',
        data: tiemposEjecucion,
        borderColor: 'rgb(162,100,42)',
        borderWidth: 5.5,
    };

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

gsap.fromTo(
    grafica,
    { y: -grafica.height },
    { y: 0, duration: 1.5, ease: "power3.out" }
);
