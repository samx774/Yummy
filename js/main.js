// Imports
import { getAreasList, getMealsByArea } from "./Areas.js"; // Import functions related to areas
import { getCategoriesList, getMealsByCategories } from "./Categories.js"; // Import functions related to categories
import { getMealDetails } from "./Details.js"; // Import function to get meal details
import { getIngredientsList, getMealsByIngredients } from "./Ingredients.js"; // Import functions related to ingredients
import { getMealByName, getMealByLetter } from "./Search.js"; // Import functions for searching by name or letter

// Global Constants
const searchByNameInput = document.getElementById("searchName"); // Input element for searching by name
const searchByFirstLetterInput = document.getElementById("searchLetter"); // Input element for searching by first letter
const lists = document.getElementById("lists"); // Lists element
const nameInput = document.getElementById("nameInput"); // Name input element
const emailInput = document.getElementById("emailInput"); // Email input element
const phoneInput = document.getElementById("phoneInput"); // Phone input element
const ageInput = document.getElementById("ageInput"); // Age input element
const passwordInput = document.getElementById("passwordInput"); // Password input element
const rePasswordInput = document.getElementById("rePasswordInput"); // Re-enter password input element
const nameAlert = document.getElementById("nameAlert"); // Alert element for name input
const emailAlert = document.getElementById("emailAlert"); // Alert element for email input
const phoneAlert = document.getElementById("phoneAlert"); // Alert element for phone input
const ageAlert = document.getElementById("ageAlert"); // Alert element for age input
const passwordAlert = document.getElementById("passwordAlert"); // Alert element for password input
const rePasswordAlert = document.getElementById("rePasswordAlert"); // Alert element for re-enter password input
const btn = document.getElementById("btn")

// Fetch meals and display them
async function getMeals() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const result = await response.json();
  const meals = result.meals;
  displayMeals(meals);
}
getMeals();

// Display meals on the webpage
export function displayMeals(array) {
  document.getElementById("meals").classList.remove("d-none");
  let container = ``;
  for (let i = 0; i < array.length && i < 20; i++) {
    container += `           
        <div class="col-md-3 ">
        <div data-id="${array[i].idMeal}" class="meal position-relative rounded-3 overflow-hidden">
            <img src="${array[i].strMealThumb}" alt="meal-img" class="w-100">
            <div class="layer d-flex align-items-center justify-content-center position-absolute">
                <h2>${array[i].strMeal}</h2>
            </div>
        </div>
        </div>
        `;
  }
  document.getElementById("meals").innerHTML = container;
  $(".inner-loading").fadeOut(500);
}

// Event Listeners
$(document).on("click", ".meal", function () {
  $(".inner-loading").fadeIn(1);
  let mealId = $(this).attr("data-id");
  getMealDetails(mealId);
});
$(document).on("click", ".categ", function () {
  $(".inner-loading").fadeIn(1);
  let categ = $(this).attr("data-categ");
  getMealsByCategories(categ);
});
$(document).on("click", ".area", function () {
  $(".inner-loading").fadeIn(1);
  let area = $(this).attr("data-area");
  getMealsByArea(area);
});
$(document).on("click", ".ingredient", function () {
  $(".inner-loading").fadeIn(1);
  let ingredient = $(this).attr("data-ingredient");
  getMealsByIngredients(ingredient);
});
searchByNameInput.addEventListener("input", function () {
  $(".inner-loading").fadeIn(500);
  getMealByName(this.value);
});
searchByFirstLetterInput.addEventListener("input", function () {
  $(".inner-loading").fadeIn(500);
  if (this.value == "") {
    getMealByLetter("a");
  } else {
    getMealByLetter(this.value);
  }
});

// Handle click events on the lists element
lists.addEventListener("click", function (e) {
  closeNav();
  if (e.target.innerHTML == "Search") {
    $(".inner-loading").fadeIn(500);
    $("#search").removeClass("d-none");
    $(".contact").addClass("d-none");
    document.getElementById("meals").classList.add("d-none");
    $(".inner-loading").fadeOut(500);
    clearInputs();
  } else if (e.target.innerHTML == "Categories") {
    $(".inner-loading").fadeIn(1);
    $("#search").addClass("d-none");
    $(".contact").addClass("d-none");
    getCategoriesList();
    clearInputs();
  } else if (e.target.innerHTML == "Area") {
    $(".inner-loading").fadeIn(1);
    $("#search").addClass("d-none");
    $(".contact").addClass("d-none");
    getAreasList();
    clearInputs();
  } else if (e.target.innerHTML == "Ingredients") {
    $(".inner-loading").fadeIn(1);
    $("#search").addClass("d-none");
    $(".contact").addClass("d-none");
    getIngredientsList();
    clearInputs();
  } else {
    $(".inner-loading").fadeIn(1);
    $("#search").addClass("d-none");
    $(".contact").removeClass("d-none");
    $(".inner-loading").fadeOut(500);
    document.getElementById("meals").classList.add("d-none");
    clearInputs();
  }
});

// Open navigation
function openNav() {
  $(".toggle").toggleClass("d-none");
  $("nav").animate({ left: "0px" }, 500);
  $(".links ul li:nth-child(1)").css({ transform: "translateY(0px)" });
  $(".links ul li:nth-child(2)").css({ transform: "translateY(0px)" });
  $(".links ul li:nth-child(3)").css({ transform: "translateY(0px)" });
  $(".links ul li:nth-child(4)").css({ transform: "translateY(0px)" });
  $(".links ul li:nth-child(5)").css({ transform: "translateY(0px)" });
}

// Close navigation
function closeNav() {
  $(".toggle").toggleClass("d-none");
  $("nav").animate({ left: "-250px" }, 500);
  $(".links ul li:nth-child(1)").css({ transform: "translateY(200px)" });
  $(".links ul li:nth-child(2)").css({ transform: "translateY(200px)" });
  $(".links ul li:nth-child(3)").css({ transform: "translateY(200px)" });
  $(".links ul li:nth-child(4)").css({ transform: "translateY(200px)" });
  $(".links ul li:nth-child(5)").css({ transform: "translateY(200px)" });
}

// Event listeners for opening and closing navigation
$(".open").click(openNav);
$(".close").click(closeNav);

// Hide loading animation when the document is ready
$(document).ready(function () {
  $(".loading").fadeOut(500);
});


// Input Validation Functions
function nameValidation(name) {
  let regex = /^[a-zA-Z\s]+$/;
  if (regex.test(name)) {
    $(nameAlert).addClass("d-none");
    return true;
  } else {
    $(nameAlert).removeClass("d-none");
    return false;
  }
}

function emailValidation(email) {
  let regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (regex.test(email)) {
    $(emailAlert).addClass("d-none");
    return true;
  } else {
    $(emailAlert).removeClass("d-none");
    return false;
  }
}

function phoneValidation(phone) {
  let regex = /^(?:\D*\d){10,}\D*$/;
  if (regex.test(phone)) {
    $(phoneAlert).addClass("d-none");
    return true;
  } else {
    $(phoneAlert).removeClass("d-none");
    return false;
  }
}

function ageValidation(age) {
  let regex = /^(?:[1-9][0-9]|[1-9])$/;
  if (regex.test(age)) {
    $(ageAlert).addClass("d-none");
    return true;
  } else {
    $(ageAlert).removeClass("d-none");
    return false;
  }
}

function passwordValidation(password) {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(password)) {
    $(passwordAlert).addClass("d-none");
    return true;
  } else {
    $(passwordAlert).removeClass("d-none");
    return false;
  }
}

function rePasswordValidation(rePassword) {
  if (rePassword == passwordInput.value) {
    $(rePasswordAlert).addClass("d-none");
    return true;
  } else {
    $(rePasswordAlert).removeClass("d-none");
    return false;
  }
}

// Function to check if all validations are correct
function validateForm(){

  // Check if all validations are correct
  if (nameValidation(nameInput.value) && emailValidation(emailInput.value) && phoneValidation(phoneInput.value) && passwordValidation(passwordInput.value) && passwordValidation(passwordInput.value) && rePasswordValidation(rePasswordInput.value)) {
    // Remove the attribute from the desired element
    $(btn).removeClass('disabled');
  }else{
    $(btn).addClass('disabled');
  }
}

// Input Validation Functions
nameInput.addEventListener("input", function () {
  nameValidation(this.value);
  validateForm(); // Call the function to check if all validations are correct
});

emailInput.addEventListener("input", function () {
  emailValidation(this.value);
  validateForm(); // Call the function to check if all validations are correct
});

phoneInput.addEventListener("input", function () {
  phoneValidation(this.value);
  validateForm(); // Call the function to check if all validations are correct
});

ageInput.addEventListener("input", function () {
  ageValidation(this.value);
  validateForm(); // Call the function to check if all validations are correct
});

passwordInput.addEventListener("input", function () {
  passwordValidation(this.value);
  validateForm(); // Call the function to check if all validations are correct
});

rePasswordInput.addEventListener("input", function () {
  rePasswordValidation(this.value);
  validateForm(); // Call the function to check if all validations are correct
});


// Utility function to clear input fields
function clearInputs() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  ageInput.value = "";
  passwordInput.value = "";
  rePasswordInput.value = "";
}
