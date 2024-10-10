const pokemonList = document.getElementById("pokemon-list");

async function fetchPokemonData(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemon = await response.json();
    return pokemon;
}

function getShinyChance() {
    return Math.random() < 0.3; // 30% de probabilidad de shiny
}

function displayPokemon(pokemon) {
    const isShiny = getShinyChance();
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    const sprite = isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default;
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(", ");
    
    pokemonCard.innerHTML = `
        <img src="${sprite}" alt="${pokemon.name}">
        <h3>${pokemon.name.toUpperCase()} ${isShiny ? "(Shiny)" : ""}</h3>
        <p>ID: ${pokemon.id}</p>
        <p>Type: ${types}</p>
        <p>Height: ${pokemon.height / 10} m</p>
        <p>Weight: ${pokemon.weight / 10} kg</p>
    `;
    
    pokemonList.appendChild(pokemonCard);
}

async function loadPokedex() {
    for (let i = 1; i <= 50; i++) {
        const pokemon = await fetchPokemonData(i);
        displayPokemon(pokemon);
    }
}

loadPokedex();