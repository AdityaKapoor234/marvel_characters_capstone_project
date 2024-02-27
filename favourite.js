// Function to Fetch Information from Favourite Character List
function getFavouriteSuperheroes() {
  if (localStorage.getItem('favorites')) {
    // Calling Function to Display Favourite Character Information on Screen
    displaySuperheroes(JSON.parse(localStorage.getItem('favorites')) || []);
  } else {
    // Character Not Found
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    var heroElement = `<div class="col-12 my-3">
      <div class="superheroNotFound">
        Characters Not Found
      </div>
    </div>
    `
    resultsContainer.innerHTML = heroElement;
  }
}

// Function to Display Favourite Character Information (Cards) on Screen
function displaySuperheroes(superheroes) {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = '';
  superheroes.forEach(superhero => {
    const heroElementCol = document.createElement('div');
    heroElementCol.classList.add('col-lg-3');
    heroElementCol.classList.add('col-md-4');
    heroElementCol.classList.add('col-sm-6');
    heroElementCol.classList.add('col-12');
    heroElementCol.classList.add('my-3');
    const heroElement = document.createElement('div');
    heroElement.classList.add('superhero');
    heroElement.innerHTML = `
          <div class="superhero-image point-text" style="background-image: url(${superhero.thumbnail.path}.${superhero.thumbnail.extension});" onclick="window.open('/character.html?id=${superhero.id}')"></div>
          <h2 class="point-text" onclick="window.open('/character.html?id=${superhero.id}')">${superhero.name}</h2>
          <button class="favorite-button">${superhero.favourite === true ? '<i class="fa-solid fa-heart" style="color: #ea2228">' : '<i class="fa-regular fa-heart"></i>'}</i></button>
      `;
    heroElement.querySelector('.favorite-button').addEventListener('click', () => addToFavorites(superhero));
    heroElementCol.appendChild(heroElement);
    resultsContainer.appendChild(heroElementCol);
  });
}

// Function to Add or Remove Characters into Favourites
function addToFavorites(superhero) {
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (superhero.favourite === true) {
    favorites = favorites.filter((elem) => elem.id !== superhero.id);
  } else {
    favorites.push(superhero);
  }
  superhero.favourite = !superhero.favourite;
  if (favorites.length > 0) {
    // Add Character To Favourites
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } else {
    // Remove Favourite List
    localStorage.removeItem('favorites');
  }
  // Calling Function to Fetch Information from Favourite Character List
  getFavouriteSuperheroes();
}

// Calling Function to Fetch Information from Favourite Character List
getFavouriteSuperheroes();
