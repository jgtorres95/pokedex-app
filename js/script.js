//Creating new pokemonRepository variable to hold pokemonList array within an IIFE
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
    
    function getAll(){
        return pokemonList;
    }
];

    function add(pokemon){
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    }
}())

// For each loop that iterates over pokemonList array
pokemonRepository.getAll().forEach(function(pokemon){
    //Conditional that checks if pokemonList.height is greater than 1
    if (pokemon.height > 1) {
        document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ") - Wow, that's big!</p>"); 
    } else {
        document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")</p>");  
    }
})