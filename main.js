
let altura = document.getElementById('altura');
let peso = document.getElementById('peso');
let nombre= document.getElementById('nombre')
const respuesta = document.getElementById("respuesta")
let resultado = ""
let limpiar = document.getElementById("limpiar")
let documento= ""
const URL= `https://calculadora-imc-be814-default-rtdb.firebaseio.com/`



calculadora.addEventListener('submit',function(event){
    event.preventDefault();
    let alturaConver = Math.pow((altura.value/100),2) //AQUÍ A LA ALTURA EN CENTIMETROS SE LA DIVIDE POR 100 Y AL RESULTADO SE LO POTENCIA AL CUADRADO, PARA OBTENER ALTURA METROS AL CUADRADO
    resultado = (peso.value / alturaConver); // AL PESO SE LO DIVIDE POR LA ALTURA KG / METROS AL CUADRADO
    respuesta.textContent = `Tu resultado es ${resultado}`
    resultado2= resultado.toFixed(2)
// SE CREA EL CONTENIDO DEL DIV RESPUESTA = CON EL RESULTADO ARROJADO SE COMPARA CON LOS DATOS DE LA TABLA DE IMC PARA VER SU VALOR.


Almacenar = ()=>{
    let DatosStorage= JSON.parse(localStorage.getItem('Datos Storage')) || [];
    var DatosGuardados={
        persona: nombre.value,
        Almacen: `${respuesta.innerText}`,
        id: Date.now()}
        DatosStorage.push(DatosGuardados);
localStorage.setItem('Datos Storage', JSON.stringify(DatosStorage));
}

if( resultado <16.5){
        respuesta.textContent= `Tu resultado es ${resultado2} TIENES BAJO PESO SEVERO`  
            }
        else if ((resultado >16.5)&&(resultado<= 18.5)){
            respuesta.textContent= `Tu resultado es ${resultado2} TIENES BAJO PESO `
            }
        else if((resultado> 18.51) && (resultado <= 24.9)){
            respuesta.textContent= `Tu resultado es ${resultado2} TIENES PESO NORMAL`
            }
        else if((resultado >25) && (resultado<=29.9)){
            respuesta.textContent= `Tu resultado es ${resultado2} TIENES SOBREPESO`
            }
        else if((resultado >30) && (resultado <=34.9)){
            respuesta.textContent= `Tu resultado es ${resultado2} TIENES OBESIDAD TIPO 1`
            }
        else if((resultado >35) &&(resultado<=39.9)){   
            respuesta.textContent= `Tu resultado es ${resultado2} TIENES OBESIDAD TIPO 2`
            }
        else if (resultado >= 40){
            respuesta.textContent= `Tu resultado es ${resultado2} TIENES OBESIDAD TIPO 3`
            }
        else{
                    alert("Error")
                }
    Almacenar();
//--------------------------------------------------------------------------------------------
const registro = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
},
    buttonsStyling: false
});
  registro.fire({
    title: "Quieres registrar tus datos?",
    text: "registrando tus datos puedes ver tu resultado cuando quieras y desde donde quieras",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Si, Registrarme", 
    cancelButtonText: "No, no registrarme",
    reverseButtons: true,
    
  }).then ( async(result) => {
    if (result.isConfirmed) {
        
        const { value: DNI } = await Swal.fire({
            title: "ingresa tu DNI",
            input: "number",
            inputLabel: "ingresa tu dni para regristrarte",
            inputPlaceholder: "xx.xxx.xxx"
          });
          
          if (DNI) {
            documento= DNI
            swal.fire({
                title: "Registrado!",
                text: "Sus datos han sido registrados en nuestra nube.",
                icon: "success"
              });
          }
         
          console.log(documento)
    } else if (result.dismiss === Swal.DismissReason.cancel){;}
    let registrado={
        nombre:nombre.value,
        documento,
        peso: peso.value,
        altura: altura.value,
        imc: respuesta.innerText
    }
const response = await fetch(URL + "usuario.json", {
    method:"POST",
    body: JSON.stringify(registrado)
})

    
  });
});
 



//BOTON DE LIMPIAR (BORRA LOS VALORES INGRESADOS EN EL INPUT Y EL CONTENIDO DEL DIV RESPUESTA)
limpiar.addEventListener('click', function(){
    respuesta.innerHTML= "";})

/*====================================================================================================================================
=                                                                                                                    =
======================================================================================================================================*/


