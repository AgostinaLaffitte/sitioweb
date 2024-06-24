document.addEventListener("DOMContentLoaded" , () => {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    abrir.addEventListener("click", () => {
        nav.classList.add("naVisible");
    });

    cerrar.addEventListener("click", () => {
        nav.classList.remove("naVisible");
    })
});
