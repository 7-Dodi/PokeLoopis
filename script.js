const elPokemonImg = document.getElementsByClassName("pokemon-img-dark")[0];

let pokemonName = "";


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
  console.log(pokemonName)
}

const form = document.querySelector('form').addEventListener('submit', (eve) => {
    eve.preventDefault();
})


const sendButton = document.querySelector('#button-poke');

sendButton.addEventListener('click', () => {
    
    console.log('Entrou')
    const container = document.querySelector('.container');
    const userReponse = document.querySelector('#text-poke').value;
    if(userReponse === pokemonName) {
        container.style.backgroundColor = '#26de81'
        elPokemonImg.style.filter = 'none';
    }

})

fetchData();
