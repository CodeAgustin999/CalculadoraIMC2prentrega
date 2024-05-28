let botonMostrar = document.getElementById("btnMostrarDatos");
let limpiar= document.getElementById("limpiar")
let datosObtenidos = [];
let listaDatos= document.getElementById("listaDatos")

botonMostrar.addEventListener('click',()=>{
    datosObtenidos = JSON.parse(getDataLocalStorage('Datos Storage'));
    dibujarDatos(datosObtenidos)
})

function dibujarDatos(listado){
    if(listado.length){
        for(const registro of listado) {
            $('#listaDatos').append(
                `
                    <li>
                        <p>${registro.persona}</p>
                        <p>${registro.Almacen}</p>
                    </li>
                `
            )
        }

    }else{
    }
    
}
limpiar.addEventListener('click', function(){
    listaDatos.innerHTML= "";})

function getDataLocalStorage(key) {
    return localStorage.getItem(key);
}


