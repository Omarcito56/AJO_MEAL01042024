function randomxd(){
let randomBtn = document.getElementById('random');
const mealListRandom = document.getElementById('meal');

randomBtn.addEventListener('click', getRandomMeals);

function getRandomMeals() {
    // Realizar 10 solicitudes para obtener platos aleatorios
    Promise.all(Array.from({ length: 10 }, () =>
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(response => response.json())
    ))
        .then(meals => {
            let html = "";
            meals.forEach(meal => {
                meal = meal.meals[0]; // Extraer el objeto de comida de cada respuesta
                html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a  href = "#" class = "recipe-btn">Get Recipe</a>
                            <i data-id="${meal.idMeal}" class="fa-regular fa-heart" onclick="aaddToFavorites('${meal.idMeal}')"></i>
                        </div>
                    </div>
                `;
            });
            mealListRandom.classList.remove('notFound');
            mealListRandom.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching meals:', error);
            mealListRandom.innerHTML = "Error fetching meals";
        });
}
}
randomxd();