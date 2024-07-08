const loadFood = (data) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayFood(data.meals))
    .catch(error => noResult())
}
const noResult = () => {
    const errorBox = document.getElementById('error-box');
    errorBox.innerHTML = ``;
    const notFoundDiv = document.createElement('div');
    notFoundDiv.innerHTML = `
        <h1>No similar result found.</h1>
    `
    errorBox.appendChild(notFoundDiv);
}
const displayFood = meals => {
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerHTML = ``;
    const errorBox = document.getElementById('error-box');
    errorBox.innerHTML = ``;
    const detailContainer = document.getElementById('meal-details');
    detailContainer.innerHTML = ``;
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
            <div onclick="loadMealDetails('${meal.idMeal}')" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"> ${meal.strMeal} </h5>
                    <p class="card-text"> ${meal.strInstructions.slice(0, 200)}... </p>
                </div>
            </div>
        `
        foodContainer.appendChild(mealDiv);
    });
    toggleSpninner(false);
}
const serachFood = () => {
    toggleSpninner(true);
    const searchName = document.getElementById('search-name');
    const food = searchName.value;
    loadFood(food);
}

const loadMealDetails = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayMealDetails(data.meals[0]);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    });
}
const displayMealDetails = meal => {
    const detailContainer = document.getElementById('meal-details');
    detailContainer.innerHTML = ``;
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('card');
    mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title"> ${meal.strMeal} </h5>
            <p class="card-text"> ${meal.strInstructions.slice(0, 150)}...... </p>
            <a href=" ${meal.strYoutube} " class="btn btn-primary">See Video</a>
        </div>
    `
    detailContainer.appendChild(mealDiv);
}

const toggleSpninner = isLoading => {
    const loader = document.getElementById('spinner');
    if(isLoading){
      loader.classList.remove('d-none');
    }
    else{
      loader.classList.add('d-none');
    }
  }