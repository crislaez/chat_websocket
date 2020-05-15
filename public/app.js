'use strict'
const socket = io.connect('http://localhost:3002', {'forceNew': true} );
let contador = 1;

function cargarMensajes(){
    /**
     * recivimos los datos del servidor, mensaje es el mismo evento que
     * tenemos en el servidor
     */
    socket.on('mensaje',(data) => {
        //funcion que carga los mensajes en el div de mensajes
        recargarDiv(data);
    });
    
    //llamamos a la funcion formulario
    datosFormulario();
}

function datosFormulario(){
    let formulario = document.querySelector('#formulario');
    let input = formulario.getElementsByTagName('input');
    let mensaje;

    formulario.addEventListener('submit',function(){
        event.preventDefault();

        mensaje = 
            {
                id:contador++,
                usuario:input[0].value,
                mensaje:input[1].value
            }       

        /**
         * le enviamos el mensaje al servidor, nuevo-mensaje es el mismo evento
         * que tenemos en el servidor
         */
        socket.emit('nuevo-mensaje',mensaje);
        //vaciamos el input
        input[1].value = '';
    });
};

function recargarDiv(data){
    let contenedorMensaje = document.querySelector('.contenedorMensaje');   
    //limpiamos el div para que no se sumen los mensajes anteriores
    contenedorMensaje.innerHTML = '';

    for(let valor in data){
        contenedorMensaje.innerHTML += 
        `
            <div class='divmensaje'>
                <p><strong>${data[valor].usuario}</strong>:<em>${data[valor].mensaje}</em></p>                
            </div>
        `;
    }
};



