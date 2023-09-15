import { typesPokemon } from "./pokemonTypesTranslation.js";

const elBody = document.querySelector("body");
const elPokeImage = document.querySelector(".pokemon-img-dark");
const elInput = document.querySelector("#text-poke");
const elSubmitButton = document.querySelector("#button-poke");
const elSkipButton = document.querySelector("#skip-button");
const elHits = document.querySelector(".current-hits");
const elRecord = document.querySelector(".record-hits");
const elTipPoke = document.querySelector(".tip-poke");
const elCirclePoke = document.querySelector(".circle-poke");
const pokeTypes = document.querySelector('.tip-poke > h4');

let pokemonName = "";
let sumOfHits = 0;
function countCurrentHits() {
  sumOfHits++;
  elHits.textContent = `Acertos atuais: ${sumOfHits}`;
}
let recordOfHits = 0;
function countMaximumHits() {
  //Atualiza primeiro localStorage
  localStorage.setItem('record', Math.max(recordOfHits, sumOfHits));
  //Atualiza o valor do records na mensagem
  recordOfHits = localStorage.getItem('record');
  elRecord.textContent = `🔥 Recordes de acertos: ${localStorage.getItem('record')}`;
}
/////


//Função para mudar a cor do circulo e da dica
function colorBackgroundTypes(name){
  typesPokemon.forEach((type)=>{
    if(name === type.name){
      elTipPoke.style.backgroundColor = type.color;
      elCirclePoke.style.backgroundColor = type.color;
    }
  })
}

handleStart();



async function handleStart() {
  const getPokeTypeTraduction = (typeName) => {
    const typeTranslation = typesPokemon.find(({name}) => name === typeName);
    return typeTranslation.tradution;
  };

  resetFields();

  const { image, name, types } = await getPokeData();
  pokemonName = name;
  elPokeImage.src = image;
  let typescontent = 'Tipo: ';
  //Seria legal se os nomes do tipos fossem apresentados em português
  types.forEach(({type}) => typescontent += ` ${getPokeTypeTraduction(type.name)}`);
  pokeTypes.innerText = typescontent;
  colorBackgroundTypes(types[0].type.name);
}

function resetFields() {
  elBody.style.backgroundColor = "var(--black)";
  elSubmitButton.textContent = "Enviar";
  elInput.placeholder = "Qual é esse Pokémon?!";
  elPokeImage.style.transition = "0s"
  elPokeImage.style.filter = "brightness(0)";
  elInput.disabled = false;
  elInput.value = "";
  elRecord.textContent = ` 🔥 Recordes de acertos: ${localStorage.getItem('record') || 0}`;
  elSkipButton.disabled = false;
}

async function getPokeData() {
  // gera um numero entre 1 e 500
  const randomPokeId = (Math.floor(Math.random() * 100) % 500) + 1;
  const pokeData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomPokeId}`
  ).then((res) => res.json());

  return {
    image: pokeData.sprites.front_default,
    name: pokeData.name,
    types: pokeData.types
  };
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const sendButton = document.querySelector("#button-poke");
sendButton.addEventListener("click", () => {
  /// Caso o usuário queira continuar jogando
  if (elSubmitButton.textContent !== "Enviar") {
    handleStart();
    return;
  }

  /// Caso o usuário esteja enviando um palpite:

  const userReponse = document.querySelector("#text-poke").value;

  // ações em comum
  elPokeImage.style.transition = "var(--transition-default)"
  elPokeImage.style.filter = "brightness(100%)";
  elInput.disabled = true;

  // caso o usuário tenha acertado o palpite
  if (userReponse.toLowerCase() === pokemonName) {
    elBody.style.backgroundColor = "var(--green)";
    elSubmitButton.textContent = "Próximo";
    elInput.value = `${
      pokemonName[0].toUpperCase() + pokemonName.substring(1)
    }!! Você acertou, Parabéns!!`;

    countCurrentHits();
  } else {
    // caso o usuário não tenha acertado o palpite
    elBody.style.backgroundColor = "var(--light-red)";
    elSubmitButton.textContent = "Reiniciar";
    elInput.value = `${
      pokemonName[0].toUpperCase() + pokemonName.substring(1)
    }! Não foi dessa vez ;-;`;

    countMaximumHits();

    sumOfHits = 0;
    elHits.textContent = "Acertos atuais: 0";
  }

  elSkipButton.disabled = true;
});

let numberOfSkips = 3;
const skipButton = document.querySelector('#skip-button');

skipButton.addEventListener('click', (e) => {
  numberOfSkips--;
  if(numberOfSkips > 0) {
    handleStart();
  } 
  if(numberOfSkips == 0) {
    skipButton.style.display = 'none';
  }
})

skipButton.addEventListener('mouseenter', () => {
  skipButton.innerText = numberOfSkips
})

skipButton.addEventListener('mouseout', () => {
  skipButton.innerText = 'Pular'
})