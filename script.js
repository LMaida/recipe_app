const input = document.getElementById('input');
const btnFindRecipe = document.querySelector('.find-btn');
const recipeGrid = document.querySelector('.recipe-grid');
const container = document.querySelector('.container');

const apiKey = '11dd03124ad14968b337c7ba87174a6e';


btnFindRecipe.addEventListener('click', ()=> {
  const ingredient = input.value;

     async function getResponse () {
      if (recipeGrid.innerHTML = " ") {
        const response = await fetch (`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`)
                    .then ((response) => response.json())
                    .then((data) => {
                    drawRecipe(data)
                  })
            }else {
              recipeGrid.innerHTML = " ";
            }
      }
     getResponse()
})

input.addEventListener("keypress", (e) => {
    const ingredient = input.value;

    if(e.keyCode === 13) {
      e.preventDefault()
        async function getResponse () {
        if (recipeGrid.innerHTML = " ") {
          const response = await fetch (`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`)
                      .then ((response) => response.json())
                      .then((data) => {
                      drawRecipe(data)
                    })
              }else {
                recipeGrid.innerHTML = " ";
              }
        }
        getResponse()
      }
})

function drawRecipe(data) {
  data.forEach(ingr => {
    let newRecipe = document.createElement('div');
    newRecipe.className = 'recipe';
    newRecipe.id = ingr.id;

    newRecipe.innerHTML= `
      <img src="${ingr.image}" alt="" class="img">
      <h3>${ingr.title}</h3>
      <button class="get-btn">Get Recipe</button>
    `
  recipeGrid.appendChild(newRecipe)
  });
}

 recipeGrid.addEventListener('click', (e) => {

  if (e.target.classList.contains('get-btn')) {
    const id = e.target.parentElement.id;
    getResponseRecipe(id)
  }
})

async function getResponseRecipe(id) {
  const response = await fetch (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=false`)
    .then((response)=> response.json())
    .then((data) => {
        showRecipe(data)
    })
}

function showRecipe(data) {
    const overlay = document.createElement('div')
    overlay.className = 'overlay'
    const recipeContainer = document.createElement('div');
    recipeContainer.className = 'recipeContainer';
    const ingredient = input.value;

    recipeContainer.innerHTML = `
      <button class="deleteBtn">X</button>
      <div class="meal">
          <h2> ${data.title}</h2>
          <p class="search">Search: ${ingredient }</p>
          <span>Ingredients:</span>
          <ul>${data.extendedIngredients.map(ingr => `<li class="list">${ingr.name}</li>` ).join("")}</ul>
          <h3>Instructions:</h3>
          <ul class="instructions"> ${data.instructions}</ul>
          <div class="img-link-container">
              <img src="${data.image}" alt="" class="img-small">
              <a href="${data.sourceUrl}">Watch video</a>
          </div>
      </div>
    `
  overlay.appendChild(recipeContainer)
  container.appendChild(overlay)
  document.body.style.overflow = "hidden";
}

container.addEventListener('click', (e) => {
    if(e.target.classList.contains('deleteBtn')) {
      e.target.parentElement.parentElement.remove()
      document.body.style.overflow = "visible";
    }
  }
)