let botonMostrar = document.getElementById("btnMostrarDatos");
let limpiar= document.getElementById("limpiar")
let datosObtenidos = [];
let listaDatos= document.getElementById("listaDatos")


botonMostrar.addEventListener('click', () => {
    const registro = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    registro.fire({
        title: "¿Estás registrado en nuestra página?",
        text: "Si estás registrado en nuestra nube puedes ver tus resultados desde otros dispositivos",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, estoy registrado",
        cancelButtonText: "No, no estoy registrado",
        reverseButtons: true,
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { value: dni } = await Swal.fire({
                title: "Ingresa tu DNI",
                input: "number",
                inputLabel: "Ingresa tu DNI para buscar tus datos",
                inputPlaceholder: "xx.xxx.xxx"
            });

            const buscarUsuario = async (dni) => {
                try {
                    const response = await fetch("https://calculadora-imc-be814-default-rtdb.firebaseio.com/usuario.json");
                    const data = await response.json();
                    const usuarioFiltrado = Object.values(data).find(usuario => usuario.documento === dni);
                    if (usuarioFiltrado) {
                        mostrarUsuario(usuarioFiltrado);
                    } else {
                        console.log(`No se encontró ningún usuario con el DNI ${dni}`);
                    }
                } catch (error) {
                    console.error('Error al buscar usuario:', error);
                }
            };

            const mostrarUsuario = (usuario) => {
                const contenedorUsuario = document.getElementById("listaDatos");
                const element = document.createElement("div");
                element.className = "tarjeta";

                if (usuario.nombre) {
                    element.innerHTML += `<h3>NOMBRE: ${usuario.nombre}</h3>`;
                } else {
                    element.innerHTML += `<h3>NOMBRE: No disponible</h3>`;
                }

                if (usuario.documento) {
                    element.innerHTML += `<h3>DOCUMENTO: ${usuario.documento}</h3>`;
                } else {
                    element.innerHTML += `<h3>DOCUMENTO: No disponible</h3>`;
                }

                if (usuario.peso) {
                    element.innerHTML += `<h3>PESO: ${usuario.peso}</h3>`;
                } else {
                    element.innerHTML += `<h3>PESO: No disponible</h3>`;
                }

                if (usuario.altura) {
                    element.innerHTML += `<h3>ALTURA: ${usuario.altura}</h3>`;
                } else {
                    element.innerHTML += `<h3>ALTURA: No disponible</h3>`;
                }

                if (usuario.imc) {
                    element.innerHTML += `<h3>IMC: ${usuario.imc}</h3>`;
                } else {
                    element.innerHTML += `<h3>IMC: No disponible</h3>`;
                }

                contenedorUsuario.appendChild(element);
            };

            if (dni) {
                buscarUsuario(dni);
            } else {
                console.log("No se ingresó ningún DNI.");
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Código para el caso en que el usuario no esté registrado
        }
    });
});   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


limpiar.addEventListener('click', function(){
    listaDatos.innerHTML= "";})

function getDataLocalStorage(key) {
    return localStorage.getItem(key);
}


