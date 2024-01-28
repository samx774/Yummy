export async function getMealDetails(id){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let result = await response.json();
    let mealDetails = result.meals
    displayDetails(mealDetails);
}
export function displayDetails(array) {
    $("#search").addClass('d-none');
    $(".inner-loading").fadeOut(500);
    // Check if strTags is not null, else set it to an empty string
    const tags = array[0].strTags !== null ? array[0].strTags : "";
    let container = `
    <div class="col-md-4">
        <img src="${array[0].strMealThumb}" alt="meal-img" class="w-100 rounded-3">
        <h2 class="text-white">${array[0].strMeal}</h2>
    </div>
    <div class="col-md-8">
        <div class="details-text text-white">    
            <h2>Instructions</h2>
            <p>${array[0].strInstructions}</p>
        </div>
        <div class="details-info text-white">
            <h3>Area : ${array[0].strArea}</h3>
            <h3>Category : ${array[0].strCategory}</h3>
            <h3>Recipes :</h3>
            <div class="recipes">`;

    // Iterate over the ingredients and add non-empty ones to the container
    for (let i = 1; i <= 15; i++) {
        const ingredient = array[0][`strIngredient${i}`];
        if (ingredient && ingredient.trim() !== '') {
            container += `<p class="alert alert-info m-2 p-1 d-inline-block">${ingredient}</p>`;
        }
    }

    container += `
            </div>
            <div class="tags">
                <h3>Tags :</h3>
                <p class="alert alert-danger p-1 d-inline-block">${tags}</p>
            </div>
            <a href="${array[0].strSource}" target="_blank"><button class="btn btn-success">Source</button></a>
            <a href="${array[0].strYoutube}" target="_blank"><button class="btn btn-danger">Youtube</button></a>
        </div>
    </div>`;

    // Set the container HTML to the meals element
    document.getElementById('meals').innerHTML = container;
    $(".inner-loading").fadeOut(500);
}
