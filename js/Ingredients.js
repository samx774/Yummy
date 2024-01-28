import { displayMeals } from "./main.js";

export async function getIngredientsList(){
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    const result = await response.json();
    const ingredients = result.meals;
    displayIngredientsList(ingredients);
}
function displayIngredientsList(array){
    document.getElementById('meals').classList.remove('d-none');
    let container = ``
    for (let i = 0; i < array.length && i < 20; i++) {
        container += `
        <div class="col-md-3">
            <div data-ingredient="${array[i].strIngredient}" class="text-center ingredient text-white">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${array[i].strIngredient}</h3>
                <p>${array[i].strDescription.split(' ').slice(0,20).join(' ')}</p>
            </div>
        </div>
        `
    }
    document.getElementById('meals').innerHTML = container;
    $(".inner-loading").fadeOut(500);
}
export async function getMealsByIngredients(ingredients){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    const result = await response.json();
    const meals = result.meals;
    displayMeals(meals)
}