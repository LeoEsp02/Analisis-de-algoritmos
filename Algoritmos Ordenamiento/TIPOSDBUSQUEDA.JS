// Seleccionar elementos del DOM
const number = document.querySelector("#number"); // Input para el número a buscar
const btn = document.querySelector("#btn"); // Botón de búsqueda
const contenedorTablaLineal = document.querySelector("#contenedorTablaLineal"); // Contenedor para la tabla de búsqueda lineal
const contenedorTablaIterativa = document.querySelector(
  "#contenedorTablaIterativa"
); // Contenedor para la tabla de búsqueda binaria iterativa
const contenedorTablaRecursiva = document.querySelector(
  "#contenedorTablaRecursiva"
); // Contenedor para la tabla de búsqueda binaria recursiva
let min = 0;
let max = 10000000;

// Agregar evento de clic al botón
btn.addEventListener("click", (e) => {
  e.preventDefault();

  // Validar si el input está vacío
  if (number.value === "") {
    alert("Debes introducir un número");
    return;
  }

  // Crear un array de 10,000,000 elementos con números aleatorios
  const array = Array.from({ length: 10000000 }, () =>
    Math.floor(Math.random() * (max - min) + min)
  );

  // Convertir el valor del input a un entero
  const item = parseInt(number.value);
  number.value = ""; // Limpiar el input después de obtener el valor

  // Llenar las tablas con los resultados de las búsquedas
  llenarTabla(
    array,
    item,
    "Búsqueda Lineal",
    contenedorTablaLineal,
    linearSearch
  );
  llenarTabla(
    array.sort((a, b) => a - b),
    item,
    "Búsqueda Binaria Iterativa",
    contenedorTablaIterativa,
    binarySearchIterative
  );
  llenarTabla(
    array,
    item,
    "Búsqueda Binaria Recursiva",
    contenedorTablaRecursiva,
    binarySearchRecursive
  );
});

// Función para llenar una tabla con resultados de búsqueda
function llenarTabla(array, item, title, container, searchFunction) {
  // Medir el tiempo de ejecución de la función de búsqueda
  const { position, time } = medirTiempo(() => searchFunction(array, item));

  // Crear el HTML para la tabla y la información de búsqueda
  const html = `
    <table class="tabla-valores" id="#tabla-valores">
      <thead>
        <tr>
          <th scope="col">${title}</th>
        </tr>
      </thead>
      <tbody>
        ${array
          .slice(0, 10)
          .map((value) => `<tr><td>${value}</td></tr>`)
          .join("")}
      </tbody>
    </table>
    <p>Numero buscado: ${item}</p>
    <p>${position}</p>
    <p>Tiempo: ${time}</p>
  `;

  // Insertar el HTML en el contenedor
  container.innerHTML = html;
}

// Función para medir el tiempo de ejecución de una función
function medirTiempo(callback) {
  const start = performance.now();
  const result = callback(); // Ejecutar la función de búsqueda
  const end = performance.now();
  const time = (end - start) / 1000; // Convertir el tiempo a segundos
  return { position: result, time };
}

// Función de búsqueda lineal en un array
function linearSearch(arr, target) {
  const index = arr.findIndex((value) => value === target);
  return index !== -1 ? `Posición: ${index}` : "Numero no encontrado";
}

// Función de búsqueda binaria iterativa en un array ordenado
function binarySearchIterative(arr, item) {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    const middle = Math.floor((min + max) / 2);
    const guess = arr[middle];

    if (guess === item) {
      return `Posición: ${middle}`;
    }

    if (guess > item) {
      max = middle - 1;
    } else {
      min = middle + 1;
    }
  }

  return "Numero no encontrado";
}

// Función de búsqueda binaria recursiva en un array ordenado
function binarySearchRecursive(arr, l, r, x) {
  if (l > r) return "Numero no encontrado";

  const m = Math.floor((l + r) / 2);

  if (arr[m] === x) {
    return `Posición: ${m}`;
  }

  return arr[m] < x
    ? binarySearchRecursive(arr, m + 1, r, x)
    : binarySearchRecursive(arr, l, m - 1, x);
}
