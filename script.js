const btn2 = document.querySelectorAll('.btn-2');
const carrito = document.querySelector('#carrito');
const valorTotal = document.querySelector(".totalPagar");
const contadorProductos = document.querySelector('#cuentacarrito');

let ArrProduct = [];

// Agregar evento a cada botón "agregar al carrito"
btn2.forEach(boton => {
    boton.addEventListener("click", boton2);
});

/* Función del botón agregar al carrito */
function boton2(event) {
    let botonParent = event.target.parentElement;
    let nombreProducto = botonParent.querySelector('h1').textContent;
    let precioProducto = botonParent.querySelector('.precio').textContent;
    let ImagenProducto = botonParent.querySelector('img').getAttribute('src');
    const InfoProduct = {
        cantidad: 1,
        Nombre: nombreProducto,
        precio: precioProducto,
        imagen: ImagenProducto,
    };

    // Actualiza cantidad de productos sin repetir
    const Existe = ArrProduct.some(product => product.Nombre === InfoProduct.Nombre);
    if (Existe) {
        const productos = ArrProduct.map(product => {
            if (product.Nombre === InfoProduct.Nombre) {
                product.cantidad++;
                return product;
            } else {
                return product;
            }
        });
        ArrProduct = productos;
    } else {
        ArrProduct.push(InfoProduct);
    }

    ShowHTML();
}

/* Función para mostrar los productos en el carrito */
function ShowHTML() {
    let total = 0;
    let totalOf = 0;
    carrito.innerHTML = "";

    ArrProduct.forEach(product => {
        const ContenedorProducto = document.createElement('div');
        ContenedorProducto.classList.add('CarProduct');
        ContenedorProducto.innerHTML =
            `<ul class="submenu">
                <li><img src="${product.imagen}" alt="" style="width: 50px;"></li>
                <li>${product.Nombre}</li>
                <li>${product.cantidad}</li>
                <li>${product.precio}</li>
                <li class="close">X</li>
            </ul>`;

        carrito.appendChild(ContenedorProducto);
        carrito.appendChild(valorTotal);
        total += product.cantidad * parseFloat(product.precio.slice(1).replace(',', ''));
        totalOf += product.cantidad;
    });

    valorTotal.innerText = `total: $${total.toFixed(2)}`;
    contadorProductos.innerText = totalOf;
}

// Evento para borrar producto del carrito
carrito.addEventListener("click", (e) => {
    if (e.target.classList.contains('close')) {
        const productElement = e.target.closest('.CarProduct');
        const nombreProducto = productElement.querySelector('li:nth-child(2)').textContent;

        ArrProduct = ArrProduct.filter(product => product.Nombre.trim() !== nombreProducto.trim());
        ShowHTML();
    }
});


/*codigo 2*/
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    abrir.addEventListener("click", () => {
        nav.classList.add("naVisible");
    });

    cerrar.addEventListener("click", () => {
        nav.classList.remove("naVisible");
    });
});