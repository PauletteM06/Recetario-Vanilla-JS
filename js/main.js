const btn_nav = document.querySelector(".header_btn");
const nav_list = document.querySelector(".header_nav_list")

btn_nav.addEventListener("click", () => {
    nav_list.classList.toggle("active");
    btn_nav.classList.toggle("active");
})