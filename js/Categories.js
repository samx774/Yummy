import { displayMeals } from "./main.js";

export async function getCategoriesList(){
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const result = await response.json();
    const categories = result.categories
    displayCategoriesList(categories)
}

export function displayCategoriesList(array){
    document.getElementById('meals').classList.remove('d-none')
    let container = ``
    for (let i = 0; i < array.length; i++) {
        container += `           
        <div class="col-md-3 ">
        <div data-categ="${array[i].strCategory}" class="categ position-relative rounded-3 overflow-hidden">
            <img src="${array[i].strCategoryThumb}" alt="meal-img" class="w-100">
            <div class="layer d-flex flex-column align-items-center justify-content-center position-absolute">
                <h2>${array[i].strCategory}</h2>
                <p class="text-center">${array[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
            </div>
        </div>
        </div>
        `
    }
    document.getElementById('meals').innerHTML = container;
    $(".inner-loading").fadeOut(500);
}
export async function getMealsByCategories(categ){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`);
    const result = await response.json();
    const meals = result.meals;
    displayMeals(meals);
}