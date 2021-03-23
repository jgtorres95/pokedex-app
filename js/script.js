//Creating new pokemonRepository variable to hold pokemonList array within an IIFE along with some functions.
let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 

    // Function that returns pokemonList array.
    function getAll(){
        return pokemonList;
    }
    // Function used to add new pokemon to pokemonList
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    // Function that calls loadDetails() and then calls showModal with name, height, and image passed as arguements
    function showDetails(pokemon){
        loadDetails(pokemon).then(function () {
            // console.log(pokemon.name + pokemon.height);
            showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
        });
    }
    // Function that adds buttons as list items to '.pokemon-list' for each pokemon in pokemonList. 
    function addListItem(pokemon){
        let pokedexList = document.querySelector('.pokemon-list');    
        let pokemonItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('select-pokemon');
        pokemonItem.appendChild(button);
        pokedexList.appendChild(pokemonItem); 
        button.addEventListener('click', function(event){ 
            showDetails(pokemon);
        })
    }
    // Function that will fetch pokemon from apiUrl and add them to pokemonList array.
    function loadList(){
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            })
        }).catch(function (e) {
            console.error(e);
        })
    }

    //Function that will fetch details and create new variables for the pokemon's image, height, and type. 
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e); 
        })
    }

    let modalContainer = document.querySelector('#modal-container')
    function showModal(name, height, image) {
        modalContainer.innerHTML = '';
        
        let modal = document.createElement('div'); 
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close'; 
        closeButtonElement.addEventListener('click', hideModal);

        let pokemonName = document.createElement('h1');
        pokemonName.innerText = name;

        let pokemonHeight = document.createElement('h3');
        pokemonHeight.innerText = ('height: ' + height); 

        let pokemonImage = document.createElement('img');
        pokemonImage.src = image; 

        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal); 

        modalContainer.classList.add('is-visible'); 
    }   

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }  

    // Event listener that will close pokemon modal if user hits esc
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    })

    // Event listener that will close pokemon modal if the user clicks outside the modal
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    }) 

    //Return each function in pokemonRepository with newly created variables for each function defined above. 
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    }
}())

// Call loadlist(), execute getAll(), then call addListItem for each pokemon in pokemonList. 
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
})