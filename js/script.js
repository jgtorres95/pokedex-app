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

    } else {
        document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")</p>");  
    }
}