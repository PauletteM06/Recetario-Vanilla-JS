

function crearTarjeta(receta) {
  const card_container = document.querySelector(".card_container");

  //Contenedor principal de la tarjeta
  const divContenedor = document.createElement("div");
  divContenedor.classList.add("card_wrapper");

  // Clase según el país
  if (receta.pais === "Chile") divContenedor.classList.add("chile");
  if (receta.pais === "Perú") divContenedor.classList.add("peru");
  if (receta.pais === "Argentina") divContenedor.classList.add("argentina");
  if (receta.pais === "Italia") divContenedor.classList.add("italia");
  if (receta.pais === "España") divContenedor.classList.add("espana");

  //Tarjeta interna
  const innerCard = document.createElement("div");
  innerCard.classList.add("card");

  // Título
  const h3_title = document.createElement("h3");
  h3_title.classList.add("card_title");
  h3_title.textContent = receta.titulo;

  // País
  const p_pais = document.createElement("p");
  p_pais.classList.add("card_pais");
  p_pais.innerHTML = "<strong>País:</strong> " + receta.pais;

  // Ingredientes
  const p_ingrediente = document.createElement("p");
  p_ingrediente.innerHTML = "<strong>Ingredientes:</strong>";

  const list_ingredientes = document.createElement("ul");
  list_ingredientes.classList.add("card_lista_ingredientes");

  for (let i = 0; i < receta.ingredientes.length; i++) {
    const li = document.createElement("li");
    li.textContent = receta.ingredientes[i];
    list_ingredientes.appendChild(li);
  }

  // Tiempo
  const p_tiempo = document.createElement("p");
  p_tiempo.classList.add("card_tiempo_preparacion");
  p_tiempo.innerHTML = "<strong>Tiempo de preparación:</strong> " + receta.tiempo;

  // Categoría
  const p_categoria = document.createElement("p");
  p_categoria.classList.add("card_categoria_receta");
  p_categoria.innerHTML = "<strong>Categoría:</strong> " + receta.categoria;

  // Preparación
  const p_preparacion = document.createElement("p");
  p_preparacion.classList.add("card_preparacion");
  p_preparacion.innerHTML = "<strong>Preparación:</strong> " + receta.preparacion;

  // Agregar todo a la tarjeta
  innerCard.append(h3_title, p_pais, p_ingrediente, list_ingredientes, p_tiempo, p_categoria, p_preparacion);

  // Botones
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("card_buttons");

  const btn_edit = document.createElement("button");
  btn_edit.textContent = "Editar";
  btn_edit.classList.add("btn_edit");

  const btn_delete = document.createElement("button");
  btn_delete.textContent = "Eliminar";
  btn_delete.classList.add("btn_delete");

  btnContainer.append(btn_edit, btn_delete);

  // Insertar en el contenedor principal
  divContenedor.append(innerCard, btnContainer);
  card_container.appendChild(divContenedor);
}

//Cuando cargue la página
document.addEventListener("DOMContentLoaded", function() {
  const card_container = document.querySelector(".card_container");

  const recetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];
  for (let i = 0; i < recetasGuardadas.length; i++) {
    crearTarjeta(recetasGuardadas[i]);
  }

  const btn_nav = document.querySelector(".header_btn");
  const nav_list = document.querySelector(".header_nav_list");

  const inputTitulo = document.getElementById("id_titulo");
  const inputOrigen = document.getElementById("id_origen");
  const inputIngredientes = document.getElementById("id_ingredientes");
  const inputTiempo = document.getElementById("id_tiempo");
  const inputCategoria = document.getElementById("id_categoria");
  const inputPreparacion = document.getElementById("id_preparacion");

  const btn_ingrediente = document.querySelector(".btn_ingrediente");
  const form = document.querySelector(".form_container");
  const ul_ingredientes = document.querySelector(".list_ingr");

  let tarjetaEnEdicion = null;
  const ingredientesList = [];

  //Menú hamburguesa
  btn_nav.addEventListener("click", function() {
    nav_list.classList.toggle("active");
    btn_nav.classList.toggle("active");
  });

  // Botón para agregar ingrediente
  btn_ingrediente.addEventListener("click", function(e) {
    e.preventDefault();
    const texto = inputIngredientes.value;
    ingredientesList.push(texto);

    const li = document.createElement("li");
    li.textContent = texto;
    ul_ingredientes.appendChild(li);

    inputIngredientes.value = "";
  });

  //Editar o eliminar tarjeta
  card_container.addEventListener("click", function(e) {
    const elemento = e.target;

    //Editar
    if (elemento.classList.contains("btn_edit")) {
      tarjetaEnEdicion = elemento.closest(".card_wrapper");
      const inner = tarjetaEnEdicion.querySelector(".card");

      inputTitulo.value = inner.querySelector(".card_title").textContent;
      inputOrigen.value = inner.querySelector(".card_pais").textContent.replace("País: ", "");
      inputTiempo.value = inner.querySelector(".card_tiempo_preparacion").textContent.replace("Tiempo de preparación: ", "");
      inputCategoria.value = inner.querySelector(".card_categoria_receta").textContent.replace("Categoría: ", "");
      inputPreparacion.value = inner.querySelector(".card_preparacion").textContent.replace("Preparación: ", "");

      // Ingredientes
      const listaLi = inner.querySelectorAll(".card_lista_ingredientes li");
      ul_ingredientes.innerHTML = "";
      ingredientesList.length = 0;

      for (let i = 0; i < listaLi.length; i++) {
        ingredientesList.push(listaLi[i].textContent);
        const nuevoLi = document.createElement("li");
        nuevoLi.textContent = listaLi[i].textContent;
        ul_ingredientes.appendChild(nuevoLi);
      }

      form.querySelector("button[type='submit']").textContent = "Actualizar receta";
    }

    //Eliminar
    if (elemento.classList.contains("btn_delete")) {
      const tarjeta = elemento.closest(".card_wrapper");
      tarjeta.remove();

      const titulo = tarjeta.querySelector(".card_title").textContent;
      let recetas = JSON.parse(localStorage.getItem("recetas")) || [];

      const nuevasRecetas = [];
      for (let i = 0; i < recetas.length; i++) {
        if (recetas[i].titulo !== titulo) {
          nuevasRecetas.push(recetas[i]);
        }
      }

      localStorage.setItem("recetas", JSON.stringify(nuevasRecetas));
    }
  });

  //Crear o actualizar receta
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Validaciones
    if (inputTitulo.value.trim() === "") {
        alert("Por favor ingresa un título para la receta");
        return;
    }

    if (inputOrigen.value === "") {
        alert("Ingresa un país de origen");
        return;
    }

    if (ingredientesList.length === 0) {
        alert("Agrega al menos un ingrediente");
        return;
    }

    if (inputTiempo.value.trim() === "") {
        alert("Indica el tiempo de preparación");
        return;
    }

    if (inputCategoria.value === "") {
        alert("Ingresa una categoría");
        return;
    }

    if (inputPreparacion.value.trim() === "") {
        alert("Describe los pasos de preparación");
        return;
    }

    const receta = {
      titulo: inputTitulo.value,
      pais: inputOrigen.value,
      ingredientes: ingredientesList,
      tiempo: inputTiempo.value,
      categoria: inputCategoria.value,
      preparacion: inputPreparacion.value
    };

    if (tarjetaEnEdicion) {
      //Actualizar tarjeta
      const inner = tarjetaEnEdicion.querySelector(".card");

      const tituloOriginal = inner.querySelector(".card_title").textContent;

      // Actualizar la tarjeta del DOM
      inner.querySelector(".card_title").textContent = receta.titulo;
      inner.querySelector(".card_pais").innerHTML = "<strong>País:</strong> " + receta.pais;
      inner.querySelector(".card_tiempo_preparacion").innerHTML = "<strong>Tiempo de preparación:</strong> " + receta.tiempo;
      inner.querySelector(".card_categoria_receta").innerHTML = "<strong>Categoría:</strong> " + receta.categoria;
      inner.querySelector(".card_preparacion").innerHTML = "<strong>Preparación:</strong> " + receta.preparacion;

      const ul = inner.querySelector(".card_lista_ingredientes");
      ul.innerHTML = "";
      for (let i = 0; i < receta.ingredientes.length; i++) {
        const li = document.createElement("li");
        li.textContent = receta.ingredientes[i];
        ul.appendChild(li);
      }

      // Actualizar en localStorage
      let recetas = JSON.parse(localStorage.getItem("recetas")) || [];
      for (let i = 0; i < recetas.length; i++) {
        if (recetas[i].titulo === tituloOriginal) {
          recetas[i] = receta;
        }
      }
      localStorage.setItem("recetas", JSON.stringify(recetas));

      tarjetaEnEdicion = null;
      form.querySelector("button[type='submit']").textContent = "Crear receta";
    } else {
      //Crear nueva tarjeta
      crearTarjeta(receta);

      const arrRecetas = JSON.parse(localStorage.getItem("recetas")) || [];
      arrRecetas.push(receta);
      localStorage.setItem("recetas", JSON.stringify(arrRecetas));
    }

    // Limpiar el formulario
    form.reset();
    ul_ingredientes.innerHTML = "";
    ingredientesList.length = 0;
  });
});
