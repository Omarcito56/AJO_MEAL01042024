// Función para agregar una comida a la lista de favoritos
function addToFavorites(mealId) {
    let favorites = localStorage.getItem('favorites');
    if (!favorites) {
        favorites = [];
    } else {
        favorites = JSON.parse(favorites);
    }
    favorites.push(mealId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Meal added to favorites:', mealId);
}


// Función para mostrar la receta de la comida, LA AGREGUE EL DIA 30/03/2024
function getMealRecipe(e, mealId){
    let mealDetailsContent = document.querySelector('.meal-details-content');
    e.preventDefault();
    fetchMealById(mealId)
        .then(meal => {
            // Crear el HTML para mostrar la receta en la modal
            const html = `
                <h2 class="recipe-title">${meal.strMeal}</h2>
                <p class="recipe-category">${meal.strCategory}</p>
                <div class="recipe-instruct">
                    <h3>Instructions:</h3>
                    <p>${meal.strInstructions}</p>
                </div>
                <div class="recipe-meal-img">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="recipe-link">
                    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                </div>
            `;
            mealDetailsContent.innerHTML = html;
            mealDetailsContent.parentElement.classList.add('showRecipe');
        })
        .catch(error => {
            console.error('Error fetching meal details:', error);
        });
}


// Modifica la función showFavorites para que llame a getMealRecipe al hacer clic en el botón "Get Recipe"
function showFavorites() {
    let favorites = localStorage.getItem('favorites');
    if (!favorites) {
        favorites = [];
    } else {
        favorites = JSON.parse(favorites);
    }

    const favMealsContainer = document.querySelector('.fav-meals');
    favMealsContainer.innerHTML = '';

    favorites.forEach(mealId => {
        // Obtener los detalles de la comida usando su ID
        fetchMealById(mealId)
            .then(meal => {
                // Crear un contenedor para la comida favorita
                const mealItem = document.createElement('div');
                mealItem.classList.add('meal-item');
                mealItem.setAttribute('data-id', meal.idMeal);
                mealItem.innerHTML = `
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                        <button class="remove-btn">Remove</button>
                    </div>
                `;

                // Agregar el evento de clic al botón de eliminar
                const removeBtn = mealItem.querySelector('.remove-btn');
                removeBtn.addEventListener('click', () => {
                    removeFromFavorites(meal.idMeal);
                    showFavorites(); // Actualizar la lista después de eliminar
                });

                // Agregar el evento de clic al botón de "Get Recipe"
                const recipeBtn = mealItem.querySelector('.recipe-btn');
                recipeBtn.addEventListener('click', (e) => {
                    getMealRecipe(e, meal.idMeal); // Llama a la función getMealRecipe con el evento y el ID de la comida
                });

                // Agregar el contenedor de la comida favorita al contenedor principal
                favMealsContainer.appendChild(mealItem);
            })
            .catch(error => {
                console.error('Error fetching meal details:', error);
            });
    });
}

// Función para eliminar una comida de la lista de favoritos
function removeFromFavorites(mealId) {
    let favorites = localStorage.getItem('favorites');
    if (!favorites) {
        favorites = [];
    } else {
        favorites = JSON.parse(favorites);
    }

    const index = favorites.indexOf(mealId);
    if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Meal removed from favorites:', mealId);
    }
}

// Función para obtener los detalles de una comida por su ID
function fetchMealById(mealId) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => data.meals[0]);

        
}

// FUNCION QUE AGREGUE EL DIA DE HOY PARA CERRAR LA MODAL DE RECETA EN FAVORITOS
function closeModal(){
    const recipeCloseBtn = document.getElementById('recipe-close-btn');
    const mealDetailsContent = document.querySelector('.meal-details-content');
    recipeCloseBtn.addEventListener('click', () => {
        mealDetailsContent.parentElement.classList.remove('showRecipe');
    });
}



// Hasta el final llamamos cada funcion que contiene distintas funcionalidades, si de lo contrario tratamos de sacar todas las funciones que estas contiene, habra errores al volver a cargar las vistas parciales
showFavorites();
closeModal();