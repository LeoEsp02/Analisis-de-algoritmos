// Función para ordenar un arreglo utilizando el algoritmo de ordenamiento burbuja
function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Intercambia elementos si están en el orden incorrecto
      }
    }
  }
}

// Función para llenar la tabla con valores y tiempos de ejecución
function llenarTabla(valores, tiemposEjecucion) {
  const html = `
    <table class="tabla-valores">
      <thead>
        <tr>
          <th scope="col">Iteraciones</th>
          <th scope="col">Total Valores</th>
          <th scope="col">Tiempo de Ejecución</th>
        </tr>
      </thead>        
      <tbody>
        ${valores
          .map(
            (valor, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${valor}</td>
            <td>${tiemposEjecucion[i]}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>`;

  tablaValores.innerHTML = html; // Inserta la tabla en el contenedor
}
const size = document.getElementById("size");
const btn = document.getElementById("btn");
const tablaValores = document.getElementById("contenedorTabla");
const grafica = document.getElementById("grafica");
let min = 1000000;
let max = 10000000;
function graficar(valores, tiemposEjecucion) {
  const etiquetas = valores;
  /*
Estas líneas de código están seleccionando elementos del Document Object Model (DOM) 
utilizando JS, para luego, inicializan algunas variables, estableciendo valores mínimos y máximos,
 y preparan datos para ser utilizados en una función llamada graficar
 */

  const datosTiempo = {
    label: "Tiempo de ejecución",

    data: tiemposEjecucion,
  borderColor: 'rgb(162,100,42)', // Color de la línea 
      borderWidth: 5.5, 
  };

  const myChart = new Chart(grafica, {
    type: "line",
    data: {
      labels: etiquetas,
      datasets: [datosTiempo],
    },
    options: {
      animation: {
        duration: 0,
      },
    },
  });
  /*En este bloque de código se está creando una configuración para una gráfica 
utilizando la librería Chart.js, se define un objeto datosTiempo que contiene etiquetas y datos
 que se utilizarán en la gráfica, especifica el tipo de gráfica como "línea";
 Y establece opciones, como desactivar la animación de la gráfica, 
 para crear un gráfico de línea con una línea roja (borderColor: '#800000') 
 y un ancho de línea de 3.5 píxeles (borderWidth: 3.5). 
 Luego, se crea un objeto myChart que representa la gráfica utilizando los datos y configuraciones 
 proporcionados
*/
  gsap.fromTo(
    grafica,
    { y: -grafica.height },
    { y: 0, duration: 1.5, ease: "power3.out" }
  );
}

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!size.value) {
    alert("No hay datos para ejecutar el arreglo");
    return;
  }

  let tamanioArreglo = parseInt(size.value);
  const INCREMENTO = tamanioArreglo;
  let valores = [];
  let tiemposEjecucion = [];
  size.value = "";
  /*estos pasos preparan las variables y estructuras de datos necesarias 
antes de ejecutar el bucle que realizará una serie de operaciones que incluyen la generación de 
arreglos aleatorios, la ordenación de los arreglos y la medición del tiempo de ejecución. 
Los resultados de estas operaciones se almacenan en los arreglos valores y tiemposEjecucion para
 su posterior uso en la generación de una tabla y una gráfica.
*/
  for (let i = 0; i < 10; i++) {
    const array = Array(tamanioArreglo)
      .fill()
      .map(() => Math.floor(Math.random() * (max - min) + min));
    const start = performance.now();
    bubbleSort(array);
    const end = performance.now();
    const tiempo = (end - start) / 100;
    valores.push(tamanioArreglo);
    tiemposEjecucion.push(tiempo);
    tamanioArreglo += INCREMENTO;
    console.log(`Corrida ${i}\n${tiempo}`);
  }
  /* este código realiza una serie de ejecuciones del algoritmo de ordenamiento burbuja 
en diferentes arreglos de tamaños crecientes.
Registra el tiempo que tarda en ordenar cada arreglo y almacena estos tiempos 
junto con el tamaño del arreglo en dos arreglos separados (valores y tiemposEjecucion) 
para su posterior uso en la generación de una tabla y una gráfica. 
Además, muestra los tiempos de ejecución en la consola durante cada iteración.
*/
  llenarTabla(valores, tiemposEjecucion);
  graficar(valores, tiemposEjecucion);
});
