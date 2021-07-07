const pokemonList = document.querySelector('#pokemonList');
const pokemonCard = document.querySelector('#pokemonCard');

const defaultPokemon = 'https://pokeapi.co/api/v2/pokemon/1/';

window.addEventListener('load', (e) => {
  getPokemonList().then(() => showPokemonCard(defaultPokemon));

  pokemonList.addEventListener('change', (e) => {
    showPokemonCard(e.target.value);
  });
});

async function getPokemonList() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40');

  const json = await response.json();

  pokemonList.innerHTML = json.results.map(
    (result) => `<option value="${result.url}">${result.name}</option>`
  );
}

async function showPokemonCard(url) {
  const response = await fetch(url);
  const json = await response.json();

  pokemonCard.innerHTML = createCard(json);
}

function createCard(pokemon) {
  return `
		<div class="card-header">
			<h2>#${pokemon.id}</h2>
		</div>

		<img src="${pokemon.sprites.other.dream_world.front_default}" width="150" height="150" class="card-img-top mt-4" alt="image">

		<div class="card-body">
			<h5 class="card-title text-capitalize">${pokemon.name}</h5>
			<div class="badge p-2 m-1 bg-info text-light">Height: ${pokemon.height}</div>	
			<div class="badge p-2 m-1 bg-info text-light">Weight: ${pokemon.weight}</div>		
			<div class="badge p-2 m-1 bg-danger text-light">Experience: ${pokemon.base_experience}</div>	
		</div>
	`;
}
