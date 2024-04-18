
function saveLocalStorageValue(name, value) {
    // Para almacenar utilizaremos el método "setItem"
    // pasándole como parámetros la clave y el valor a almacenar:
    window.localStorage.setItem(name, value);
    return console.log(name + " guardado exitosamente.")
}

function getLocalStorageValue(name) {
    //Para recuperar un valor utilizamos el método "getItem"
    //pasándole como parámetro la clave del valor deseado:
    return window.localStorage.getItem(name);
}


function login(formData) {
    // Enviar la solicitud AJAX
    $.ajax({
        url: "https://localhost:44317/api/Users/Login",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            // Obtener el valor de la cookie
            if (response.Success==true){
                console.log("Sesion iniciada");
                saveLocalStorageValue("usr_Name", response.value);
                console.log('ID de usuario:', getLocalStorageValue("usr_Name"));
                loadPartialView("buscar", appRender);
                loadPartialView("navbar", navRender);
            }else{
                console.log("No se Inicio sesion");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });        
}

function login(formData) {
    // Enviar la solicitud AJAX
    $.ajax({
        url: "https://AjoMeal.bsite.net/api/Users/Login",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            // Obtener el valor de la cookie
            if (response.Success==true){
                console.log("Sesion iniciada");
                saveLocalStorageValue("usr_Name", response.value);
                console.log('ID de usuario:', getLocalStorageValue("usr_Name"));
                loadPartialView("buscar", appRender);
                loadPartialView("navbar", navRender);
            }else{
                console.log("No se Inicio sesion");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });        
}

function Register(formData) {
    // Enviar la solicitud AJAX
    $.ajax({
        url: "https://AjoMeal.bsite.net/api/Users/AddUsr",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            // Obtener el valor de la cookie
            if (response.Success==true){
                console.log("Sesion iniciada");
                saveLocalStorageValue("usr_Name", response.value);
                console.log('ID de usuario:', getLocalStorageValue("usr_Name"));
                loadPartialView("buscar", appRender);
                loadPartialView("navbar", navRender);
            }else{
                console.log("No se Inicio sesion");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });        
}