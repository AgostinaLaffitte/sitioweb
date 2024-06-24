const btnEnviar = document.querySelector("#btn-enviar");
const parrafo = document.querySelector("#msj");
const url = 'https://66761b25a8d2b4d072f26cb9.mockapi.io/api/v1/item';
const filaTabla = document.querySelector("#filaTabla");
const form=document.querySelector("#dinamico");

let editId = null;
let rowToEdit = null;

obtenerTabla();
form.addEventListener("submit", CrearFila);

async function obtenerTabla() {
    filaTabla.innerHTML = " ";
    try {
        let respuesta = await fetch(url);
        let objet = await respuesta.json();
        if (respuesta.status === 200) {
            renderTable(objet);
        }
    } catch (error) {
        console.log(error);
    }
}

async function CrearFila(e) {
    e.preventDefault();
    let formData= new FormData(form);

    let nombre = document.querySelector("#nombre").value;
    let opinion = document.querySelector("#opinion").value;
    let calidad = document.querySelector("#calidad").value;
    let atencion = document.querySelector("#atencion").value;
    let valoracion = document.querySelector("#valoracion").value;

    let item = {
        "Nombre": nombre,
        "Opinion": opinion,
        "Calidad": calidad,
        "Atencion": atencion,
        "Recomendado": valoracion,
    };

    try {
        let method = editId ? "PUT" : "POST";
        let endpoint = editId ? `${url}/${editId}` : url;

        let respuesta = await fetch(endpoint, {
            method: method,
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(item),
        });

        if (respuesta.status === (editId ? 200 : 201)) {
            if (editId) {
                rowToEdit.children[0].textContent = nombre;
                rowToEdit.children[1].textContent = opinion;
                rowToEdit.children[2].textContent = calidad;
                rowToEdit.children[3].textContent = atencion;
                rowToEdit.children[4].textContent = valoracion;
                parrafo.innerHTML ="Modificado!!!";
            } else {
                let nuevoItem = await respuesta.json();
                let tr = createRow(nuevoItem);
                filaTabla.appendChild(tr);
                parrafo.innerHTML ="Creado!!!";
            }
            form.reset();
            editId = null;
            rowToEdit = null;
            btnEnviar.textContent = "enviar";
          
        } else {
            parrafo.innerHTML = "Error al crear/modificar el elemento";
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}

async function Borrarfila(e) {
    let id = e.target.getAttribute("data-id");
    try {
        let respuesta = await fetch(`${url}/${id}`, {
            method: "DELETE",
        });
        if (respuesta.status === 200) {
            e.target.closest("tr").remove();
            parrafo.innerHTML=("la fila se elimino con exito")
        } else {
            console.log(respuesta.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}

function editar(e) {
    let id = e.target.getAttribute("data-id");
    let row = e.target.closest("tr");

    document.querySelector("#nombre").value = row.children[0].textContent;
    document.querySelector("#opinion").value = row.children[1].textContent;
    document.querySelector("#calidad").value = row.children[2].textContent;
    document.querySelector("#atencion").value = row.children[3].textContent;
    document.querySelector("#valoracion").value = row.children[4].textContent;

    editId = id;
    rowToEdit = row;
    btnEnviar.textContent = "Modificar";
    form.scrollIntoView({ behavior: 'smooth' });
}

function renderTable(data) {
    for (const item of data) {
        let tr = createRow(item);
        filaTabla.appendChild(tr);
    }
}

function createRow(item) {
    let tr = document.createElement("tr");
    tr.id = `fila-${item.id}`;
    tr.innerHTML = `
        <td>${item.Nombre}</td>
        <td>${item.Opinion}</td>
        <td>${item.Calidad}</td>
        <td>${item.Atencion}</td>
        <td>${item.Recomendado}</td>
        <td>
            <button class="borrar2" data-id="${item.id}">Borrar</button>
            <button class="editar" data-id="${item.id}">Editar</button>
        </td>
    `;
    agregarEventosFila(tr);
    return tr;
}

function agregarEventosFila(tr) {
    tr.querySelector(".borrar2").addEventListener("click", Borrarfila);
    tr.querySelector(".editar").addEventListener("click", editar);
}



