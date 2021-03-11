//Creating new pokemonRepository variable to hold pokemonList array within an IIFE along with a few functions.
let pokemonRepository = (function(){
    let pokemonList = [
        {
            name: 'Pikachu',
            height: .4,
            type: ['electric']
        },
        {
            name: 'Charmander',
            height: .6,
            type: ['fire']
        },
        {
            name: 'Bulbasaur',
            height: .7,
            type: ['grass', 'poison']
        },
        {
            name: 'Onix',
            height: 8.8,
            type: ['rock', 'ground']
        }
    ];
    // Function that returns pokemonList array.
    function getAll(){
        return pokemonList;
    }
    // Function used to add new pokemon to pokemonList
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    // Function that logs pokemon.name to the console
    function showDetails(pokemon){
        console.log(pokemon);
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
        button.addEventListener('click', showDetails);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    }
}())

// For each loop that iterates over pokemonList array
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon); 
})