//Creating new pokemonRepository variable to hold pokemonList array within an IIFE along with some functions.
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function that returns pokemonList array.
  function getAll() {
    return pokemonList;
  }
  // Function used to add new pokemon to pokemonList.
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  // Function that calls loadDetails() and then calls showModal.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (pokemonDetails) {
      showModal(pokemonDetails);
    });
  }
  // Function that adds buttons as list items to '.pokemon-list' for each pokemon in pokemonList.
  function addListItem(pokemon) {
    let pokedexList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    pokemonItem.classList.add('list-group-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    pokemonItem.appendChild(button);
    pokedexList.appendChild(pokemonItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }
  // Function that will fetch pokemon from apiUrl and add them to pokemonList array.
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        /* eslint-disable no-console */
        console.error(e);
      });
  }

  //Function that will fetch details and create new variables for the pokemon's image, height, and type(s).
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        const pokemonDetails = {
          name: item.name
        };
        pokemonDetails.imageUrl = details.sprites.front_default;
        pokemonDetails.height = details.height;
        pokemonDetails.types = [];
        details.types.forEach(function(itemType) {
          pokemonDetails.types.push(itemType.type.name);
        });

        return pokemonDetails;

      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Function that will create elements for pokemon name, image, height, and type(s) and then append to modal.
  function showModal(item) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    // Clear existing content
    modalBody.innerHTML = '';
    modalTitle.innerHTML = '';

    // Creating element for pokemon's name
    let nameElement = document.createElement('h1');
    nameElement.innerText = item.name;

    // Creating element for pokemon's image
    let imageFront = document.createElement('img');
    imageFront.setAttribute('class', 'modal-image');
    imageFront.setAttribute('style', 'width:50%');
    imageFront.src = item.imageUrl;

    // Creating element for pokemon's height
    let heightElement = document.createElement('p');
    heightElement.innerText = `Height: ${item.height}`;

    // Creating element for pokemon's type(s)
    let typeElement = document.createElement('p');
    typeElement.innerText = `Type(s): ${item.types}`; 

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageFront);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typeElement);
  }

  // Search bar function
  function pokemonSearch() {
    let searchInput = document.querySelector('#search-bar').value.toUpperCase();
    let pokemonButtons = document.querySelectorAll('.btn');

    pokemonButtons.forEach(function (entry) {
        if (entry.innerText.toUpperCase().indexOf(searchInput) > -1) {
            entry.parentElement.style.display = '';
        } else {
            entry.parentElement.style.display = 'none';
        }
    });
  }

  //Return each function in pokemonRepository with newly created variables for each function defined above.
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    pokemonSearch: pokemonSearch
  };
})();

// Call loadlist(), execute getAll(), then call addListItem for each pokemon in pokemonList.
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
