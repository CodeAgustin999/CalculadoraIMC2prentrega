let botonMostrar = document.getElementById("btnMostrarDatos");
let limpiar= document.getElementById("limpiar")
let datosObtenidos = [];
let listaDatos= document.getElementById("listaDatos")

botonMostrar.addEventListener('click',()=>{
    
    const registro = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
    },
        buttonsStyling: false
    });
      registro.fire({
        title: "Estas registrado en nuestra página?",
        text: "si estas registrado en nuestra nube puedes ver tus resultados desde otros dispositivos",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Si, estoy registrado", 
        cancelButtonText: "No, no estoy registrado",
        reverseButtons: true,
        
      }).then ( async(result) => {
        if (result.isConfirmed) {
            
            const { value: DNI } = await Swal.fire({
                title: "ingresa tu DNI",
                input: "number",
                inputLabel: "ingresa tu dni para buscar tus datos",
                inputPlaceholder: "xx.xxx.xxx"
              });
              const buscarUsuario = async () => {
                try {
                    const response = await fetch("https://calculadora-imc-be814-default-rtdb.firebaseio.com/usuario.json");
                    const data = await response.json();
                    console.log(data);
                    
                    const mostrarUsuario = (usuario)=>{
                        const contenedorUsuario = document.getElementById("listaDatos")
                        const element = document.createElement("div")
                        element.className= "tarjeta"
                        element.innerHTML= `
                                            <h3>NOMBRE: ${usuario.nombre}</h3>
                                            <h3>DOCUMENTO: ${usuario.documento}</h3>
                                            <h3>PESO: ${usuario.peso}</h3>
                                            <h3>ALTURA: ${usuario.altura}</h3>
                                            <h3>${usuario.imc}</h3>
                        `
                        contenedorUsuario.append(element)
                    }
                    const usuarios= Object.keys(data).map(key=>({id:key,...data[key]}))
                    usuarios.forEach(usuario => {
                        mostrarUsuario(usuario)
                        
                    });
                    mostrarUsuario()
                } catch (error) {
                    console.error('Error al buscar usuario:', error);
                }
            };
            buscarUsuario();
            
             
        } else if (result.dismiss === Swal.DismissReason.cancel){
            
            //datosObtenidos = JSON.parse(getDataLocalStorage('Datos Storage'));
            //dibujarDatos(datosObtenidos)
            
            ;}
        
      });
    
     
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

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


