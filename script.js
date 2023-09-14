const elPokemonImg = document.getElementsByClassName("pokemon-img-dark")[0];
const accepts = document.querySelector(".current-accepts");


let pokemonName = "";
let sumOfHits = 0;

accepts.textContent = `Acertos atuais: ${sumOfHits}`

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
const restButton = document.querySelector('#restart-game');
const container = document.querySelector('.container');

sendButton.addEventListener('click', () => {
    
    console.log('Entrou')
    const userReponse = document.querySelector('#text-poke').value;
    if(userReponse === pokemonName) {
        container.style.backgroundColor = '#26de81'
        elPokemonImg.style.filter = 'brightness(100%)';
        sumOfHits = Number(sumOfHits) ++;
        accepts.textContent = `Acertos atuais: ${sumOfHits}`;
    }//O código não atualiza a página assim que acerta e dara tratamento na forma que o nome entra no input
    else{
      container.style.backgroundColor = '#eb3b5a'
      elPokemonImg.style.filter = 'brightness(100%)';
      sumOfHits = 0;
      accepts.textContent = `Acertos atuais: ${sumOfHits}`;
      sendButton.style.display='none';
      restButton.style.display='inline';
      userReponse.value = "";
    }
  });
  
restButton.addEventListener("click", ()=>{
    container.style.backgroundColor = '#303030'
    elPokemonImg.style.filter = 'brightness(0)';
    sendButton.style.display='inline';
    restButton.style.display='none';
  
    setTimeout(() => {
      fetchData();
    }, 400);  
});

fetchData();
