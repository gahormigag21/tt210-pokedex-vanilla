const pokemonList = document.getElementById("pokemon-list")
const pokemonDetail = document.getElementById("pokemon-detail")
const pokemonInfo = document.getElementById("pokemon-info")
const backButton = document.getElementById("back-button")

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
    
    
    pokemonCard.innerHTML = `
        <img src="${sprite}" alt="${pokemon.name}">
        <h3>${pokemon.name.toUpperCase()} ${isShiny ? "(Shiny)" : ""}</h3>
        <p>ID: ${pokemon.id}</p>
    `;
    
    //linea para mostrar detalles de pokemon
    pokemonCard.addEventListener("click", ()=>showPokemonDetail(pokemon,isShiny,sprite))    
    pokemonList.appendChild(pokemonCard);
    return
}

backButton.addEventListener("click",()=>{
    pokemonDetail.style.display = "none"
    pokemonList.style.display = "grid"
})

function showPokemonDetail(pokemon,isShiny,sprite) {
    pokemonList.style.display = "none"
    pokemonDetail.style.display= "block"
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(", ");
    
    pokemonInfo.innerHTML = `

    <h2>${pokemon.name.toUpperCase()} ${isShiny ? "(Shiny)" : ""}</h2>
    <img src="${sprite}" alt="${pokemon.name}">
    <p>ID: ${pokemon.id}</p>
    <p>Altura: ${pokemon.height / 10} m</p>
    <p>Peso: ${pokemon.weight / 10} kg</p>
    <p>Tipos: ${types}</p>
    `
    return
}

async function loadPokedex() {
    for (let i = 1; i <= 50; i++) {
        const pokemon = await fetchPokemonData(i);
        displayPokemon(pokemon);
    }
}

loadPokedex();