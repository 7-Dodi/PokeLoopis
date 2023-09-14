const elPokemonImg = document.getElementsByClassName("pokemon-img-dark")[0];

let pokemonName = "";

fetchData();

async function getPokeData() {
  // gera um numero entre 1 e 500
  const randomPokeId = (Math.floor(Math.random() * 100) % 500) + 1;
  const pokeData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomPokeId}`
  ).then((res) => res.json());

  return {
    image: pokeData.sprites.front_default,
    name: pokeData.name,
  }
};

async function fetchData() {
  const { image, name } = await getPokeData();

  pokemonName = name;
  elPokemonImg.src = image;
}
