// Array donde guardaremos los nombres
let amigos = [];
console.log('[INIT] Lista inicial de amigos:', amigos);

// 1) CAPTURAR el valor del campo de entrada
// Referencias al DOM
const input = document.getElementById('amigo');        // <input id="amigo">
const lista = document.getElementById('listaAmigos');  // <ul id="listaAmigos">
const resultado = document.getElementById('resultado'); // <ul id="resultado">

/**
 * Pinta la lista <ul id="listaAmigos"> con los nombres del array "amigos"
 */
function renderLista() {
  console.log('Redibujando lista con:', amigos);
  lista.innerHTML = '';

  amigos.forEach((nombre, idx) => {
    const li = document.createElement('li');
    li.textContent = nombre;

    // Botón para eliminar (útil mientras practicas)
    const btnX = document.createElement('button');
    btnX.textContent = '✖';
    btnX.title = `Eliminar ${nombre}`;
    btnX.style.marginLeft = '8px';
    btnX.addEventListener('click', () => {
      console.log(`[DELETE] Eliminando "${nombre}" en índice ${idx}`);
      amigos.splice(idx, 1);
      renderLista();
      limpiarResultado();
      console.log('[DELETE] Lista actual:', amigos);
    });

    li.appendChild(btnX);
    lista.appendChild(li);
  });
}

/**
 * Limpia el área de resultado (por si haces varios sorteos)
 */
function limpiarResultado() {
  resultado.innerHTML = '';
  console.log('[RESULT] Limpieza del resultado en pantalla');
}

/**
 * 2) VALIDAR la entrada
 * 3) ACTUALIZAR el array (push)
 * 4) LIMPIAR el campo de texto
 */
function agregarAmigo() {
  // CAPTURAR
  const valorCrudo = input.value;
  console.log('[INPUT] Valor crudo:', valorCrudo);

  // NORMALIZAR (quita espacios a los lados)
  const nombre = (valorCrudo || '').trim();
  console.log('[INPUT] Valor normalizado:', nombre);

  // VALIDAR vacío
  if (!nombre) {
    console.log('[VALIDACIÓN] Nombre vacío → mostrar alerta');
    alert('Por favor, inserte un nombre.');
    input.focus();
    return;
  }

  // (Opcional) Evitar duplicados; coméntalo si no lo necesitas
  // if (amigos.some(n => n.toLowerCase() === nombre.toLowerCase())) {
  //   console.log('[VALIDACIÓN] Nombre duplicado');
  //   alert('Ese nombre ya está en la lista.');
  //   input.focus();
  //   return;
  // }

  // ACTUALIZAR array
  amigos.push(nombre);
  console.log('[UPDATE] Se agregó:', nombre);
  console.log('[UPDATE] Lista ahora es:', amigos);

  // Refrescar la lista visible
  renderLista();

  // LIMPIAR input
  input.value = '';
  input.focus();
  console.log('[INPUT] Campo limpiado y foco devuelto al input');

  // (opcional) limpiar el resultado si hubo un sorteo previo
  limpiarResultado();
}

/**
 * Función que selecciona aleatoriamente un amigo
 * Pasos (según tus imágenes):
 * 1) Validar que haya amigos disponibles
 * 2) Generar índice aleatorio con Math.random() y Math.floor()
 * 3) Obtener el nombre sorteado
 * 4) Mostrar el resultado en pantalla (innerHTML)
 */
function sortearAmigo() {
  console.log('[SORTEO] Iniciando sorteo… Lista actual:', amigos);

  // 1) Validar
  if (amigos.length === 0) {
    console.log('[SORTEO] Lista vacía → alerta');
    alert('No hay nombres en la lista para sortear.');
    input.focus();
    return;
  }

  // 2) Índice aleatorio
  const indice = Math.floor(Math.random() * amigos.length);
  console.log('[SORTEO] Índice aleatorio generado:', indice);

  // 3) Nombre sorteado
  const ganador = amigos[indice];
  console.log('[SORTEO] Ganador:', ganador);

  // 4) Mostrar resultado (innerHTML)
  resultado.innerHTML = `<li class="result-item">🎉 El amigo secreto es: <strong>${ganador}</strong></li>`;
  console.log('[SORTEO] Resultado mostrado en pantalla');
}

/* ====== Extras útiles para practicar con la consola ====== */
// Permite agregar con Enter
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') agregarAmigo();
});

// Expone las funciones al ámbito global para usarlas desde HTML (onclick)
// y también para que puedas llamarlas desde la consola si quieres
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;

/* Render inicial (por si ya hay algo en el array) */
renderLista();