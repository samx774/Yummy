import { displayMeals } from "./main.js";

export async function getAreasList(){
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    const result = await response.json();
    const areas = result.meals
    displayAreasList(areas)
}
function displayAreasList(array){
    document.getElementById('meals').classList.remove('d-none');
    let container = ``
    for (let i = 0; i < array.length; i++) {
        container += `
        <div class="col-md-3">
            <div data-area="${array[i].strArea}" class="text-center area text-white">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${array[i].strArea}</h3>
            </div>
        </div>
        `
    }
    document.getElementById('meals').innerHTML = container;
    $(".inner-loading").fadeOut(500);
}
export async function getMealsByArea(area){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const result = await response.json();
    const meals = result.meals
    displayMeals(meals)
}