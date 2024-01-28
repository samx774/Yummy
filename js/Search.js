import { displayMeals } from "./main.js";

export async function getMealByName(name){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const result = await response.json();
    const meal = result.meals
    if(meal != null){
        displayMeals(meal)
    }else{
        document.getElementById('meals').innerHTML = ''
        $(".inner-loading").fadeOut(500);
    }
}

export async function getMealByLetter(letter){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const result = await response.json();
    const meal = result.meals
    if(meal != null){
        displayMeals(meal)
    }else{
        document.getElementById('meals').innerHTML = ''
        $(".inner-loading").fadeOut(500);
    }
}


