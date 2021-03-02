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

// For loop that iterates over pokemonList
for (let i = 0; i < pokemonList.length; i++) {
    //Conditional that checks if the height of pokemonList[i] is greater than 1
    if (pokemonList[i].height > 1) {
        document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!</p>");
    //Otherwise do this    
    } else {
        document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")</p>");  
    }
}