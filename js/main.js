document.addEventListener("DOMContentLoaded", () => {
    
    //Elementos nav
    const btn_nav = document.querySelector(".header_btn");
    const nav_list = document.querySelector(".header_nav_list")
    
    //Elementos card
    const card_container = document.querySelector(".card_container")
    const inputTitulo = document.getElementById("titulo");
    const inputOrigen = document.getElementById("origen");
    const inputIngredientes = document.getElementById("ingredientes");
    const inputTiempo = document.getElementById("tiempo");
    const inputCategoría = document.getElementById("categoria");
    const inputPreparacion = document.getElementById("preparacion");
    
    const btn_ingrediente = document.querySelector(".btn_ingrediente");
    const btn_form = document.querySelector(".btn_form");
    
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
        const { titulo, pais, ingredientes, tiempo, categoria, preparacion } = receta;
    
        //Creación de nodos(tarjeta)
        const divContenedor = document.createElement("div");
    
        //Titulo
        const h3_title = document.createElement("h3");
        h3_title.textContent = titulo;
        h3_title.classList.add("card_title");
    
        //Pais
        const p_pais = document.createElement("p");
        p_pais.textContent = pais;
        p_pais.classList.add("pais");
    
    
    })
});


