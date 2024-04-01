// Función para cargar una vista parcial
function loadPartialView(partialName, container) {
    // Lógica para cargar la vista parcial
  }
  
  // Manejo de eventos para el primer conjunto de botones de navegación
  let buscarbtn = document.getElementById("buscar");
  let favoritebtn = document.getElementById("favoritos");
  let randomBtn = document.getElementById("random");
  
  if (buscarbtn) {
    buscarbtn.removeEventListener("click", buscarClickHandler);
    buscarbtn.addEventListener("click", buscarClickHandler);
  }
  
  if (favoritebtn) {
    favoritebtn.removeEventListener("click", favoriteClickHandler);
    favoritebtn.addEventListener("click", favoriteClickHandler);
  }
  
  if (randomBtn) {
    randomBtn.removeEventListener("click", randomClickHandler);
    randomBtn.addEventListener("click", randomClickHandler);
  }
  
  // Definición de los manejadores de eventos
  function buscarClickHandler() {
    loadPartialView("buscar", document.querySelector(".app"));
  }
  
  function favoriteClickHandler() {
    loadPartialView("favoritos", document.querySelector(".app"));
  }
  
  function randomClickHandler() {
    loadPartialView("random", document.querySelector(".app"));
  }