function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
      let current = array[i];
      let j = i - 1;
  
      while (j >= 0 && array[j] > current) {
        array[j + 1] = array[j];
        j--;
      }
  
      array[j + 1] = current;
    }
  }
  

  const size = document.getElementById('size'); 
  const tablaValores = document.getElementById('contenedorTabla'); 
  const grafica = document.getElementById('grafica'); 
  let min = 1000000; 
  let max = 10000000; 
  
  // Evento submit en el formulario
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
  
      // Realiza 10 iteraciones para generar datos y medir el tiempo de ejecución
      for (let i = 0; i < 10; i++) {
        // Genera un arreglo de números aleatorios
        array = Array(tamanioArreglo)
          .fill()
          .map(() => Math.floor(Math.random() * (max - min) + min));
  
        let start = performance.now(); 
        insertionSort(array); 
        let end = performance.now(); 
  
        let tiempo = end / 100 - start / 100;
        valores.push(tamanioArreglo);
        tiemposEjecucion.push(tiempo); 
        tamanioArreglo += INCREMENTO;
        console.log('Corrida ' + i);
        console.log(tiempo);
      }
  
      llenarTabla(valores, tiemposEjecucion); // Llena la tabla con los valores
      graficar(valores, tiemposEjecucion); 
    }
  });
  
  // Función para llenar la tabla con valores y tiempos de ejecución
  function llenarTabla(valores, tiemposEjecucion) {
    let html = /* html */ `
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
      html += /* html */ `
        <tr>
          <td>${i + 1}</td>
          <td>${valores[i]}</td>
          <td>${tiemposEjecucion[i]}</td>
        </tr>
      `;
    }
  
    html += /* html */ `
        </tbody>
      </table>
    `;
  
    tablaValores.innerHTML = html; // Inserta la tabla en el contenedor
  }
  
  // Función para generar y mostrar la gráfica
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
  