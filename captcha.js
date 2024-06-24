function generarCaptcha() {
    const codigo = Math.floor(Math.random() * 900000) + 100000;
    return codigo;
    
}

//Guardo codigo y lo mando a la pantalla de form
const codigoGenerado = generarCaptcha();

document.getElementById("captcha").textContent = codigoGenerado;


const nombre = document.getElementsByName("nombre")[0].value;
const email = document.getElementsByName("email")[0].value;
const contraseña = document.getElementsByName("Contraseña")[0].value;


function validarRespuesta() {
    const respuestaUsuario = document.getElementById("respuesta").value;

    // Verifica si la respuesta del usuario coincide con el CAPTCHA generado
    if (respuestaUsuario === codigoGenerado.toString()) {
        document.querySelector(".mensajenombre").classList.remove("error");
        document.querySelector(".mensajeemail").classList.remove("error");
        document.querySelector(".mensajecontraseña").classList.remove("error");
        document.querySelector(".mensajecaptcha").classList.remove("error");

        // Verifico si se han ingresado valores para nombre, email y contraseña
        const nombre = document.getElementsByName("nombre")[0].value;
        const email = document.getElementsByName("email")[0].value;
        const contraseña = document.getElementsByName("Contraseña")[0].value;

        if (nombre && email && contraseña) {
            window.location.href = "index.html";
        } else {
           
            if (!nombre) {
                document.querySelector(".mensajenombre").classList.add("error");
            }
            if (!email) {
                document.querySelector(".mensajeemail").classList.add("error");
            }
            if (!contraseña) {
                document.querySelector(".mensajecontraseña").classList.add("error");
            }

            
            setTimeout(() => {
                window.location.href = "form.html";
            }, 1000);
        }
    } else {
     
        document.querySelector(".mensajecaptcha").classList.add("error");
    }
}

document.getElementById("validarboton").addEventListener("click", validarRespuesta);


