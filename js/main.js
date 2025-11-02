document.addEventListener("DOMContentLoaded", () => {
    //Creando tarjetas con cada receta
    const recetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];
    recetasGuardadas.forEach(receta => crearTarjeta(receta));

    
    //Elementos nav
    const btn_nav = document.querySelector(".header_btn");
    const nav_list = document.querySelector(".header_nav_list")
    
    //Elementos card
    const card_container = document.querySelector(".card_container")
    const inputTitulo = document.getElementById("id_titulo");
    const inputOrigen = document.getElementById("id_origen");
    const inputIngredientes = document.getElementById("id_ingredientes");
    const inputTiempo = document.getElementById("id_tiempo");
    const inputCategoría = document.getElementById("id_categoria");
    const inputPreparacion = document.getElementById("id_preparacion");
    
    const btn_ingrediente = document.querySelector(".btn_ingrediente");
    const btn_form = document.querySelector(".form_container");
    
    const ul_ingredientes = document.querySelector(".list_ingr");
    
    
    //Funcionalidad menú hamburguesa
    btn_nav.addEventListener("click", () => {
        nav_list.classList.toggle("active");
        btn_nav.classList.toggle("active");
    })
    
    
    //Funcionalidad lista de ingredientes
    const ingredientesList = [];
    btn_ingrediente.addEventListener('click', (e) => {
        
        ingredientesList.push(inputIngredientes.value);
        const li_ingrediente = document.createElement("li");
        li_ingrediente.textContent = inputIngredientes.value;
    
        ul_ingredientes.appendChild(li_ingrediente);
        inputIngredientes.value = "";
    })
    
    
    btn_form.addEventListener('submit', e => {
        e.preventDefault()
        
        const receta = {
            titulo: inputTitulo.value,
            pais: inputOrigen.value,
            ingredientes: [...ingredientesList],
            tiempo: inputTiempo.value,
            categoria: inputCategoría.value,
            preparacion: inputPreparacion.value
        }
        
        crearTarjeta(receta);
        //Reseteo final
        document.querySelector('.form_container').reset();
        ul_ingredientes.innerHTML = "";
        ingredientesList.length = 0;

        //Funcionalidad localStorage
        const arrRecetas = JSON.parse(localStorage.getItem("recetas")) || [];
        arrRecetas.push(receta);
        localStorage.setItem("recetas", JSON.stringify(arrRecetas));

    })

    
});


function crearTarjeta(receta){

    const { titulo, pais, ingredientes, tiempo, categoria, preparacion } = receta;
    
    //Creación de nodos(tarjeta)
    
    //Titulo
    const h3_title = document.createElement("h3");
    h3_title.textContent = titulo;
    h3_title.classList.add("card_title");
    
    //Pais
    const p_pais = document.createElement("p");
    p_pais.textContent = pais;
    p_pais.classList.add("card_pais");

    //Ingredientes
    const list_ingredientes = document.createElement("ul");
    list_ingredientes.classList.add("card_lista_ingredientes");
    ingredientes.forEach((ingrediente) =>{
        const li_ingrediente = document.createElement("li");
        li_ingrediente.textContent = ingrediente
        list_ingredientes.appendChild(li_ingrediente)
    })

    //Tiempo
    const time = document.createElement("p");
    time.textContent = tiempo;
    time.classList.add("card_tiempo_preparacion");

    //Categoría
    const categoriaReceta = document.createElement("p");
    categoriaReceta.textContent = categoria;
    categoriaReceta.classList.add("card_categoria_receta");

    //Preparación
    const preparacionReceta = document.createElement("p");
    preparacionReceta.textContent = preparacion;
    preparacionReceta.classList.add("card_preparacion")

        
    const divContenedor = document.createElement("div");
    divContenedor.classList.add("card");
        
    //Insertando nodos al padre
    divContenedor.appendChild(h3_title);
    divContenedor.appendChild(p_pais);
    divContenedor.appendChild(list_ingredientes);
    divContenedor.appendChild(time);
    divContenedor.appendChild(categoriaReceta);
    divContenedor.appendChild(preparacionReceta);

    //Insertando tarjeta al contenedor del DOM
    card_container.appendChild(divContenedor);

}