function setupSearchFunctionality(){
let searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// event listeners
searchBtn.addEventListener('click', getMealList3);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// Holaaa, bueno esta funcion principalmente lo que hace es realizar una peticion de busqueda a la API dependiendo de que busqueda seleccione el usuario
function getMealList3(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    let searchType = document.getElementById('searchType').value; // Obtener el tipo de búsqueda seleccionado
    let apiUrl = '';

    switch(searchType) {
        case '1':
            apiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=' + searchInputTxt;
            break;
        case '2':
            apiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + searchInputTxt;
            break;
        case '3':
            apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchInputTxt;
            break;

        default:
            break;
    }

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a id="hearth" href = "#" class = "recipe-btn">Get Recipe</a><i class="fa-regular fa-heart" onclick="aaddToFavorites('${meal.idMeal}')"></i>
                        </div>
                    </div>
                `;
                
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    })
    .catch(error => console.error('Error:', error));
}

// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}



}

setupSearchFunctionality();










