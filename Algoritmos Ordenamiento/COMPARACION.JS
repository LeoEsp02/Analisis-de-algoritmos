// Definición de objetos DOM para acceder a elementos HTML
const elements = {
  size: document.querySelector("#size"), // Input para el tamaño del arreglo
  btn: document.querySelector("#btn"), // Botón de comparación
  contenedorTablaBubble: document.querySelector("#contenedorTablaBurbuja"), // Contenedor de la tabla de Burbuja
  contenedorTablaInsertion: document.querySelector("#contenedorTablaInsercion"), // Contenedor de la tabla de Inserción
  contenedorTablaSelection: document.querySelector("#contenedorTablaSeleccion"), // Contenedor de la tabla de Selección
  contenedorTablaMerge: document.querySelector("#contenedorTablaMerge"), // Contenedor de la tabla de Merge
  contenedorTablaQuick: document.querySelector("#contenedorTablaQuick"), // Contenedor de la tabla de Quick
  grafica: document.querySelector("#grafica"), // Canvas para la gráfica
};

// Rangos para valores aleatorios
const min = 10;
const max = 100;

// Agregar un manejador de eventos para el botón
elements.btn.addEventListener("click", handleClick);

// Función principal al hacer clic en el botón
function handleClick(e) {
  e.preventDefault();

  // Validar el tamaño del arreglo
  if (elements.size.value === "") {
    alert("Debes introducir el tamaño del arreglo");
  } else {
    let tamanioArreglo = parseInt(elements.size.value);
    const INCREMENTO = tamanioArreglo;
    let valores = [];
    let tiemposEjecucionBurbuja = [];
    let tiemposEjecucionInsercion = [];
    let tiemposEjecucionSeleccion = [];
    let tiemposEjecucionMerge = [];
    let tiemposEjecucionQuick = [];
    let tiempo;
    let start;
    let end;
    let array;

    // Limpiar el campo de entrada
    elements.size.value = "";

    // Iterar para realizar las pruebas en diferentes tamaños de arreglos
    for (let i = 0; i < 10; i++) {
      // Generar un nuevo arreglo aleatorio
      array = generarArrayAleatorio(tamanioArreglo);

      // Crear copias del arreglo para cada algoritmo de ordenamiento
      const arrays = {
        arrayBurbuja: [...array],
        arrayInsercion: [...array],
        arraySeleccion: [...array],
        arrayMerge: [...array],
        arrayQuick: [...array],
      };

      // Ordenar y medir el tiempo para el algoritmo de Burbuja
      start = performance.now();
      burbujaSort(arrays.arrayBurbuja);
      end = performance.now();
      tiempo = end / 1000 - start / 1000;
      tiemposEjecucionBurbuja.push(tiempo);

      // Ordenar y medir el tiempo para el algoritmo de Inserción
      start = performance.now();
      insercionSort(arrays.arrayInsercion);
      end = performance.now();
      tiempo = end / 1000 - start / 1000;
      tiemposEjecucionInsercion.push(tiempo);

      // Ordenar y medir el tiempo para el algoritmo de Selección
      start = performance.now();
      seleccionSort(arrays.arraySeleccion);
      end = performance.now();
      tiempo = end / 1000 - start / 1000;
      tiemposEjecucionSeleccion.push(tiempo);

      // Ordenar y medir el tiempo para el algoritmo de QuickSort
      start = performance.now();
      quickSort(arrays.arrayQuick, 0, arrays.arrayQuick.length - 1);
      end = performance.now();
      tiempo = end / 1000 - start / 1000;
      tiemposEjecucionQuick.push(tiempo);

      // Ordenar y medir el tiempo para el algoritmo de MergeSort
      start = performance.now();
      arrays.arrayMerge = mergeSort(arrays.arrayMerge);
      end = performance.now();
      tiempo = end / 1000 - start / 1000;
      tiemposEjecucionMerge.push(tiempo);

      // Almacenar el tamaño del arreglo actual
      valores.push(arrays.arrayBurbuja.length);
      // Incrementar el tamaño del arreglo para la próxima iteración
      tamanioArreglo += INCREMENTO;
    }

    // Llenar tablas y graficar resultados
    llenarTabla(
      valores,
      tiemposEjecucionBurbuja,
      elements.contenedorTablaBubble,
      "Burbuja"
    );
    llenarTabla(
      valores,
      tiemposEjecucionInsercion,
      elements.contenedorTablaInsertion,
      "Insercion"
    );
    llenarTabla(
      valores,
      tiemposEjecucionSeleccion,
      elements.contenedorTablaSelection,
      "Seleccion"
    );
    llenarTabla(
      valores,
      tiemposEjecucionMerge,
      elements.contenedorTablaMerge,
      "Mezcla (Merge)"
    );
    llenarTabla(
      valores,
      tiemposEjecucionQuick,
      elements.contenedorTablaQuick,
      "Rapido (Quick)"
    );
    graficar(
      valores,
      tiemposEjecucionBurbuja,
      tiemposEjecucionInsercion,
      tiemposEjecucionSeleccion,
      tiemposEjecucionMerge,
      tiemposEjecucionQuick
    );
  }
}

// Función para generar un arreglo aleatorio de un tamaño dado
function generarArrayAleatorio(tamanio) {
  return Array(tamanio)
    .fill()
    .map(() => Math.floor(Math.random() * (max - min) + min));
}

// Algoritmo de ordenamiento de burbuja
function burbujaSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // Intercambiar elementos si están en el orden incorrecto
        let aux = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = aux;
      }
    }
  }
}

// Algoritmo de ordenamiento de inserción
function insercionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let valorActual = arr[i];
    let j;
    // Desplazar elementos mayores que el valor actual hacia la derecha
    for (j = i - 1; j >= 0 && arr[j] > valorActual; j--) {
      arr[j + 1] = arr[j];
    }
    // Colocar el valor actual en su posición correcta
    arr[j + 1] = valorActual;
  }
}

// Algoritmo de ordenamiento de selección
function seleccionSort(arr) {
  let menor;
  for (let i = 0; i < arr.length; i++) {
    menor = i;
    // Encontrar el índice del elemento más pequeño en la porción no ordenada
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[menor]) {
        menor = j;
      }
    }
    // Intercambiar el elemento más pequeño con el primero no ordenado
    if (menor !== i) {
      let temp = arr[i];
      arr[i] = arr[menor];
      arr[menor] = temp;
    }
  }
}

// Algoritmo de ordenamiento Merge Sort
// Función auxiliar para combinar dos arreglos ordenados
function merge(left, right) {
  let sortedArr = [];

  // Combinar elementos en orden ascendente
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }

  // Concatenar los elementos restantes
  return [...sortedArr, ...left, ...right];
}

// Función principal de Merge Sort
function mergeSort(arr) {
  const half = arr.length / 2;

  // Caso base: arreglo de tamaño 0 o 1 ya está ordenado
  if (arr.length <= 1) {
    return arr;
  }

  // Dividir el arreglo en mitades izquierda y derecha
  const left = arr.splice(0, half);
  const right = arr;

  // Combinar y ordenar recursivamente las mitades
  return merge(mergeSort(left), mergeSort(right));
}

// Algoritmo de ordenamiento Quick Sort
// Función para particionar el arreglo y seleccionar un pivote
function partition(arr, start, end) {
  const pivotValue = arr[end];
  let pivotIndex = start;

  // Mover elementos menores que el pivote a la izquierda
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      pivotIndex++;
    }
  }

  // Colocar el pivote en su posición final
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}

// Función principal de Quick Sort
function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }

  // Obtener el índice del pivote después de la partición
  let index = partition(arr, start, end);

  // Ordenar recursivamente las sub-listas a ambos lados del pivote
  quickSort(arr, start, index - 1);
  quickSort(arr, index + 1, end);
}

// Función para llenar la tabla
function llenarTabla(valores, tiemposEjecucion, contenedor, titulo) {
  contenedor.innerHTML = `
    <h2>${titulo}</h2>
    <table class="tabla-valores" id="tabla-valores">
      <thead>
        <tr>
          <th scope="col">Ejecución</th>
          <th scope="col">Total Valores</th>
          <th scope="col">Tiempo de Ejecución</th>
        </tr>
      </thead>
      <tbody>
        ${valores
          .map(
            (valor, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${valor}</td>
            <td>${tiemposEjecucion[index]}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}

// Función para graficar los resultados
function graficar(
  valores,
  tiemposEjecucionBurbuja,
  tiemposEjecucionInsercion,
  tiemposEjecucionSeleccion,
  tiemposEjecucionMerge,
  tiemposEjecucionQuick
) {
  const etiquetas = valores;

  // Crear un gráfico de líneas
  new Chart(elements.grafica, {
    type: "line",
    data: {
      labels: valores,
      datasets: [
        {
          label: "Burbuja",
          data: tiemposEjecucionBurbuja,
          borderColor: "rgba(4, 73, 241, 0.8)",
          borderWidth: 2.5,
        },
        {
          label: "Insercion",
          data: tiemposEjecucionInsercion,
          borderColor: "rgba(0, 255, 207, 1)",
          borderWidth: 2.5,
        },
        {
          label: "Seleccion",
          data: tiemposEjecucionSeleccion,
          borderColor: "rgba(178, 0, 237, 1)",
          borderWidth: 2.5,
        },
        {
          label: "Mezcla",
          data: tiemposEjecucionMerge,
          borderColor: "rgba(249, 10, 10, 1)",
          borderWidth: 2.5,
        },
        {
          label: "Rapido",
          data: tiemposEjecucionQuick,
          borderColor: "rgba(57, 152, 0, 1)",
          borderWidth: 2.5,
        },
      ],
    },
    options: {
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
