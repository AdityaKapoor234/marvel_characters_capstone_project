// API URL to Fetch Information
const baseURL = 'https://gateway.marvel.com/v1/public/characters';
const id = window.location.search?.split("id=")[1];
const ts = '1';
const privateKey = '900a2067471006c772fbab57f4665366fe6acb93';
const publicKey = 'd4280cb3a14b49f55f71c55993a0d731';
// hash = MD5(ts + privateKey + publicKey);
const hash = `05bf75edd827f0beb6c871a2b8cb2b4b`;

// Function to Fetch Information from API
async function getSuperheroes() {
  // Making API URL to Fetch Information
  var url = `${baseURL}/${id}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  await fetch(url)
  .then(response => response.json())
  // Calling Function to Display Character's Information on Screen
  .then(data => displaySuperheroes(data.data.results[0]))
  .catch(error => console.log(error));
}

// Function to Display Character's Information on Screen
function displaySuperheroes(superheroes) {
  // Display Character's Image on Screen
  const characterImage = document.getElementById('characterImage');
  const characterImageMob = document.getElementById('characterImageMob');
  characterImage.innerHTML = `
    <img src=${superheroes.thumbnail.path}.${superheroes.thumbnail.extension} alt="">
  `;
  characterImageMob.innerHTML = `
    <img src=${superheroes.thumbnail.path}.${superheroes.thumbnail.extension} alt="">
  `;

  // Display Character's Information on Screen
  const characterInfo = document.getElementById('characterInfo');
  const characterInfoMob = document.getElementById('characterInfoMob');
  // Display Character's Name & Description on Screen
  var characterInfoContainer = `
    <h1>
      ${superheroes.name}
    </h1>
    <p>
      ${superheroes.description}
    </p>
  `;

  // Display Character's Comics Names on Screen
  if (superheroes.comics.items.length > 0) {
    characterInfoContainer += `
      <h2>Comics</h2>
    `;
    for (i in superheroes.comics.items ) {
      characterInfoContainer += `
        <div>
          ${parseInt(i)+1})&nbsp;${superheroes.comics.items[i].name}
        </div>
      `;
      characterInfoContainer += `<div>&nbsp;</div>`
    }
    characterInfoContainer += `<div>&nbsp;</div><div>&nbsp;</div>`
  }

  // Display Character's Events Names on Screen
  if (superheroes.events.items.length > 0) {
    characterInfoContainer += `
      <h2>Events</h2>
    `;
    for (i in superheroes.events.items ) {
      characterInfoContainer += `
        <div>
          ${parseInt(i)+1})&nbsp;${superheroes.events.items[i].name}
        </div>
      `;
      characterInfoContainer += `<div>&nbsp;</div>`
    }
    characterInfoContainer += `<div>&nbsp;</div><div>&nbsp;</div>`
  }

  // Display Character's Series Names on Screen
  if (superheroes.series.items.length > 0) {
    characterInfoContainer += `
      <h2>Series</h2>
    `;
    for (i in superheroes.series.items ) {
      characterInfoContainer += `
        <div>
          ${parseInt(i)+1})&nbsp;${superheroes.series.items[i].name}
        </div>
      `;
      characterInfoContainer += `<div>&nbsp;</div>`
    }
    characterInfoContainer += `<div>&nbsp;</div><div>&nbsp;</div>`
  }

  // Display Character's Comics Stories on Screen
  if (superheroes.stories.items.length > 0) {
    characterInfoContainer += `
      <h2>Stories</h2>
    `;
    for (i in superheroes.stories.items ) {
      characterInfoContainer += `
        <div>
          ${parseInt(i)+1})&nbsp;${superheroes.stories.items[i].name}
        </div>
      `;
      characterInfoContainer += `<div>&nbsp;</div>`
    }
    characterInfoContainer += `<div>&nbsp;</div><div>&nbsp;</div>`
  }

  // Setting Character's Information in Web View
  characterInfo.innerHTML = characterInfoContainer;
  // Setting Character's Information in Mobile View
  characterInfoMob.innerHTML = characterInfoContainer;
}

// Calling Function to Fetch Information from API
getSuperheroes();
