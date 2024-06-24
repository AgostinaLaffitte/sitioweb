
document.getElementById("Btn-Apagar").addEventListener ("click", function(event) {
    event.preventDefault();
    ModoOscuro();

})


const Body =document.querySelector('.fondo');
const img=document.getElementById('Btn-Apagar');
const imgUser=document.getElementById('img-user');
const imgCarrito=document.getElementById('img-carrito');
const imgCerrar=document.querySelector('.imgcerrar');
const imgMenu=document.querySelector('.menu-icono');



//Modo claro y modo oscuro 

function ModoOscuro(){
    if (Body.classList.contains('ModoOscuro')) {
        img.src='imagenes/luna.png';
        img.alt= 'Modo claro';

        imgUser.src='imagenes/user.png';
        imgUser.alt='User Modo claro';

        imgCarrito.src='imagenes/carr.svg';
        imgCarrito.alt='carrito modo claro';

        imgCerrar.src='imagenes/cerrar.png';
        imgCerrar.alt='cerrar modo claro';

        imgMenu.src='imagenes/menu.png';
        imgMenu.alt='menu modo claro';


        Body.classList.remove('ModoOscuro');
    }
    else{
        img.src='imagenes/sol.png';
        img.alt='Modo oscuro';

        imgUser.src='imagenes/userblanco.png';
        imgUser.alt='User Modo oscuro';

        imgCarrito.src='imagenes/carrblanco.png';
        imgCarrito.alt='carrito modo oscuro';

        imgCerrar.src='imagenes/cerrarblanco.png';
        imgCerrar.alt='cerrar modo oscuro';

        imgMenu.src='imagenes/menublanco.png';
        imgMenu.alt='menu modo oscuros';


        Body.classList.add('ModoOscuro');
    }
}
