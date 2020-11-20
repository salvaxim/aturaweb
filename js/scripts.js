// Add Your Scripts here

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Seleccionar el formulario para validar
        var forms = document.getElementsByClassName('needs-validation');
        // Validar cada campo y prevenir que se envie
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                if (form.checkValidity() === false) {
                    event.stopPropagation();
                } else {
                    //obtener valores del formulario
                    var nombre = document.getElementById('nombre').value,
                        email = document.getElementById('email').value,
                        mensaje = document.getElementById('mensaje').value;


                    //chequeo para ver en la consola del navegador estos valores
                    /*console.log(nombre);
                    console.log(email);
                    console.log(mensaje);*/

                    //Ejecutar ajax
                    var xhr = new XMLHttpRequest();

                    //Abrir la conexión
                    xhr.open('POST', 'http://localhost:8080/mailphp/enviomail.php', true); //cambiar aqui
                    //Siempre que utilizas un formulario se debe agregar un header
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    //revisar el estado
                    console.log(xhr.status);

                    xhr.onload = function() {
                        console.log(respuesta);
                        console.log(xhr.status);
                        /*if (xhr.status === 0) {
                            var div = document.createElement('div');
                            div.appendChild(document.createTextNode('Este mesaje NO se ha enviado'));
                            div.classList.add('alert', 'alert-success', 'mt-4', 'text-center');
                            document.querySelector('form').appendChild(div);
                            setTimeout(function() {
                                document.querySelector('.alert').remove();
                            }, 5000);
                        } else */
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            //var respuesta = JSON.parse(xhr.responseText);
                            var respuesta = JSON.parse(xhr.responseText);
                            console.log(respuesta.respuesta);
                            if (respuesta.respuesta === true) {
                                alert("Gracias por su mensaje!!. En breve nos pondremos en contacto.");
                                var div = document.createElement('div');
                                div.appendChild(document.createTextNode('Su mensaje se ha enviado. Pulse la tecla "Borrar" para limpiar el formulario'));
                                div.classList.add('alert', 'alert-primary', 'mt-4', 'text-center');
                                document.querySelector('form').appendChild(div);
                                /*setTimeout(function() {
                                    document.querySelector('.alert').remove();
                                }, 5000);*/



                            }

                        }

                    }

                    //enviar el request al servidor (en nuestro caso enviomail.php que hace de servidor (phpmailer.php)
                    xhr.send('nombre=' + nombre + '&email=' + email + '&mensaje=' + mensaje);



                }

                form.classList.add('was-validated');
                //window.location.reload();
                /*document.getElementById("contactForm").reset();
                var borrarValidacion = document.getElementsByClassName("invalid-feedback");
                console.log(borrarValidacion);
                var i;
                for (i = 0; i < borrarValidacion.length; i++) {
                    borrarValidacion[i].innerHTML = " ";
                }*/


                //document.getElementById("nombre").innerHTML = " ";
                //document.getElementById("email").value = " ";
                //document.getElementById("mensaje").value = " ";
                //document.getElementById("contactForm").reset(); //Limpiar el formulario


            }, false);


        });

        //$('#contactForm').trigger("reset");
    }, false);



})();