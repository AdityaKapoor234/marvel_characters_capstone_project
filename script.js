// API URL to Fetch Information
const baseURL = 'http://gateway.marvel.com/v1/public/characters';
const ts = '1';
const privateKey = '900a2067471006c772fbab57f4665366fe6acb93';
const publicKey = 'd4280cb3a14b49f55f71c55993a0d731';
// hash key = MD5(ts + privateKey + publicKey);
const hash = `05bf75edd827f0beb6c871a2b8cb2b4b`;

// Pagination Variables
var page = 0;
var totalPages;

// API's Fetched Information
var superheroes;

// Function to Fetch Information from API
async function getSuperheroes(searchQuery = '') {
  var url;

  // Making URL on the Basis of Searched Content
  if (searchQuery) {
    url = `${baseURL}?&ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=${page}&nameStartsWith=${searchQuery}`;
  } else {
    url = `${baseURL}?&ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=${page}`;
  }

  // Fetching Information Based on Favourites Exist or Not
  if (localStorage.getItem('favorites')) {
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        var marvelData = [];
        totalPages = parseInt(Math.round(data.data.total / 100));
        data.data.results.map((elem) => {
          obj = {
            ...elem,
            favourite: JSON.parse(localStorage.getItem('favorites')).findIndex((item) => item.id === elem.id) != -1 ? true : false,
          };
          marvelData.push(obj);
        })
        superheroes = marvelData;
        // Calling Function to Display API Fetched Information on Screen
        displaySuperheroes(marvelData);
      })
      .catch(error => console.log(error));
  } else {
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        var marvelData = [];
        totalPages = parseInt(Math.round(data.data.total / 100));
        data.data.results.map((elem) => {
          obj = {
            ...elem,
            favourite: false,
          };
          marvelData.push(obj);
        })
        superheroes = marvelData;
        // Calling Function to Display API Fetched Information on Screen
        displaySuperheroes(marvelData);
      })
      .catch(error => console.log(error));
  }
}

// Function to Display API Fetched Information on Screen
function displaySuperheroes(superheroes) {
  if (superheroes.length > 0) {
    // Marvel Character Cards
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

    // Pagination
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    var paginationElem = '';
    if (totalPages > 0) {
      for (let i = 1; i <= totalPages; i++) {
        if (page === ((i - 1) * 100)) {
          paginationElem += `
            <a href="#marvel-characters" class="marvel-characters-link">
              <div class="point-text current-page current-page-active" onclick="changePage(${(i - 1) * 100})">
                ${i}
              </div>
            </a>
          `
        } else {
          paginationElem += `
            <a href="#marvel-characters" class="marvel-characters-link">
              <div class="point-text current-page" onclick="changePage(${(i - 1) * 100})">
                ${i}
              </div>
            </a>
          `
        }
      }
    }
    paginationContainer.innerHTML = paginationElem;
  } else {
    // Marvel Character Not Found
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    var heroElement = `<div class="col-12 my-3">
      <div class="superheroNotFound">
        Characters Not Found
      </div>
    </div>
    `
    resultsContainer.innerHTML = heroElement;

    // Pagination Removed
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
  }
}

// Function for Pagination
function changePage(currentPage) {
  page = currentPage;
  if (document.getElementById('search-input').value.trim() === '') {
    getSuperheroes('');
  } else {
    const searchQuery = document.getElementById('search-input').value.trim();
    getSuperheroes(searchQuery);
  }
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
  // Calling Function to Display API Fetched Information on Screen
  displaySuperheroes(superheroes);
  if (favorites.length > 0) {
    // Add Character To Favourites
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } else {
    // Remove Favourite List
    localStorage.removeItem('favorites');
  }
}

// Search Characters on Enter Keypress
document.getElementById('search-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const searchQuery = document.getElementById('search-input').value.trim();
    getSuperheroes(searchQuery);
  }
});

// Search All Characters on Empty Field
document.getElementById('search-input').addEventListener('change', () => {
  if (document.getElementById('search-input').value.trim() === '') {
    getSuperheroes('');
  }
});

// Search Characters on Button Click
document.getElementById('search-button').addEventListener('click', () => {
  const searchQuery = document.getElementById('search-input').value.trim();
  getSuperheroes(searchQuery);
});

// Calling Function to Fetch Information from API
getSuperheroes();

