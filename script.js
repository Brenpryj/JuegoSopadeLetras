const lista = document.getElementById("listaPalabras");
const sopa = document.getElementById("sopa");
const seleccionEl = document.getElementById("seleccionActual");
const tamaño = 20;

const palabras = [
  { palabra: "FACUNDOQUIROGA", descripcion: "Caudillo riojano del siglo XIX." },
  { palabra: "CHACHOPEÑALOZA", descripcion: "Líder federal argentino." },
  { palabra: "VICTORIAROMERO", descripcion: "Referente cultural de La Rioja." },
  { palabra: "CERDODELOSLLANOS", descripcion: "Producción porcina regional." },
  { palabra: "AGROANDINA", descripcion: "Empresa agroindustrial local." },
  { palabra: "VALLESOL", descripcion: "Proyecto agrícola provincial." },
  { palabra: "PARQUEEOLICO", descripcion: "Fuente de energía renovable." },
  { palabra: "AGROGENETICA", descripcion: "Empresa de biotecnología vegetal." },
  { palabra: "UVA", descripcion: "Cultivo típico riojano." },
  { palabra: "TOMATE", descripcion: "Ingrediente en conservas." },
  { palabra: "ACEITUNAS", descripcion: "Producto regional tradicional." }
];

let seleccion = [];

function limpiarSeleccion() {
  seleccion.forEach(celda => celda.classList.remove("seleccionada"));
  seleccion = [];
  seleccionEl.textContent = "";
}

function borrarUltimo() {
  if (seleccion.length > 0) {
    const ultima = seleccion.pop();
    ultima.classList.remove("seleccionada");
    seleccionEl.textContent = seleccion.map(c => c.textContent).join("");
  }
}

function verificarPalabra() {
  const palabraSeleccionada = seleccion.map(c => c.textContent).join("");
  const encontrado = palabras.find(p => p.palabra === palabraSeleccionada);
  if (encontrado) {
    seleccion.forEach(c => {
      c.classList.add("correcta");
      c.removeEventListener("click", seleccionarLetra);
    });
    const item = document.querySelector(`#listaPalabras li[data-palabra='${encontrado.palabra}']`);
    if (item) item.style.textDecoration = "line-through";
    alert(`🎉 ¡Felicidades! Encontraste la palabra: ${encontrado.palabra}`);
  } else {
    alert("Esa palabra no es válida. Intentá otra vez.");
  }
  limpiarSeleccion();
}

function seleccionarLetra(e) {
  const celda = e.target;
  if (celda.classList.contains("correcta")) return;
  if (!seleccion.includes(celda)) {
    celda.classList.add("seleccionada");
    seleccion.push(celda);
    seleccionEl.textContent = seleccion.map(c => c.textContent).join("");
  }
}

let grilla = Array.from({ length: tamaño }, () => Array(tamaño).fill(""));

palabras.forEach(({ palabra }) => {
  palabra = palabra.replace(/ /g, "").toUpperCase();
  let colocada = false;
  while (!colocada) {
    const horizontal = Math.random() < 0.5;
    const fila = Math.floor(Math.random() * (horizontal ? tamaño : tamaño - palabra.length));
    const col = Math.floor(Math.random() * (horizontal ? tamaño - palabra.length : tamaño));
    let puedeColocar = true;
    for (let i = 0; i < palabra.length; i++) {
      const r = horizontal ? fila : fila + i;
      const c = horizontal ? col + i : col;
      if (grilla[r][c] !== "") {
        puedeColocar = false;
        break;
      }
    }
    if (puedeColocar) {
      for (let i = 0; i < palabra.length; i++) {
        const r = horizontal ? fila : fila + i;
        const c = horizontal ? col + i : col;
        grilla[r][c] = palabra[i];
      }
      colocada = true;
    }
  }
});

for (let i = 0; i < tamaño; i++) {
  for (let j = 0; j < tamaño; j++) {
    if (grilla[i][j] === "") {
      grilla[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
  }
}

grilla.forEach((fila, i) => {
  fila.forEach((letra, j) => {
    const celda = document.createElement("div");
    celda.className = "celda";
    celda.textContent = letra;
    celda.addEventListener("click", seleccionarLetra);
    sopa.appendChild(celda);
  });
});

palabras.forEach(({ palabra, descripcion }) => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${palabra}</strong>: ${descripcion}`;
  li.setAttribute("data-palabra", palabra);
  lista.appendChild(li);
});
