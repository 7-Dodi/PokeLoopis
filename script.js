import { applyColorBackgroundTypes, getPokeTypeTranslation } from "./pokemonTypes.js";

const elBody = document.querySelector("body");
const elPokeImage = document.querySelector(".pokemon-img-dark");
const elInput = document.querySelector("#text-poke");
const elSubmitButton = document.querySelector("#button-poke");
const elSkipButton = document.querySelector("#skip-button");
const elHits = document.querySelector(".current-hits");
const elRecord = document.querySelector(".record-hits");

const pokeTypes = document.querySelector(".tip-poke > h4");

let pokemonName = "";
let numberOfSkips = 3;

let sumOfHits = 0;
// Atualiza o valor da soma de acertos na mensagem
const updateSumOfHitsElement = () => elHits.textContent = `Acertos atuais: ${sumOfHits}`;

function initializeSumOfHits() {
  sumOfHits = JSON.parse(localStorage.getItem("currentHits") || "0");
  updateSumOfHitsElement();
}
function setSumOfHits(sumOfHits_) {
  sumOfHits = sumOfHits_;
  updateSumOfHitsElement();
  localStorage.setItem("currentHits", JSON.stringify(sumOfHits));
}

let recordOfHits = 0;
// Atualiza o valor do recorde na mensagem
const updateRecordOfHitsElement = () => elRecord.textContent = `🔥 Recordes de acertos: ${recordOfHits}`;

function initializeRecordOfHits() {
  recordOfHits = JSON.parse(localStorage.getItem("record") || "0");
  updateRecordOfHitsElement();
}
function countMaximumHits() {
  recordOfHits = Math.max(recordOfHits, sumOfHits);
  updateRecordOfHitsElement();
  localStorage.setItem("record", JSON.stringify(recordOfHits));
}
/////


handleStart();

async function handleStart() {
  resetFields();
  initializeSumOfHits();
  initializeRecordOfHits();

  const { image, name, types } = await getPokeData();
  pokemonName = name;
  elPokeImage.src = image;
  let typescontent = "Tipo: ";
  //Seria legal se os nomes do tipos fossem apresentados em português
  types.forEach(
    ({ type }) => (typescontent += ` ${getPokeTypeTranslation(type.name)}`)
  );
  pokeTypes.innerText = typescontent;
  applyColorBackgroundTypes(types[0].type.name);


  function resetFields() {
    elBody.style.backgroundColor = "var(--black)";
    elSubmitButton.textContent = "Enviar";
    elInput.placeholder = "Qual é esse Pokémon?!";
    elPokeImage.style.transition = "0s";
    elPokeImage.style.filter = "brightness(0)";
    elInput.disabled = false;
    elInput.value = "";
  
    // Só ativa o botão de skipar se o número de skips for > 0
    if(numberOfSkips > 0) {
      elSkipButton.disabled = false;
    }
  }
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
    types: pokeData.types,
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
  elPokeImage.style.transition = "var(--transition-default)";
  elPokeImage.style.filter = "brightness(100%)";
  elInput.disabled = true;
  
  // caso o usuário tenha acertado o palpite
  if (userReponse.toLowerCase() === pokemonName) {
    applyHitEnvironment();
    setSumOfHits(sumOfHits + 1);
  } else { // caso o usuário não tenha acertado o palpite
    applyErrorEnvironment();
    countMaximumHits();
    setSumOfHits(0);
    updateAlSkipButton(); 
  }

  elSkipButton.disabled = true;


  function applyHitEnvironment() {
    elBody.style.backgroundColor = "var(--green)";
    elSubmitButton.textContent = "Próximo";
    elInput.value = `${
      pokemonName[0].toUpperCase() + pokemonName.substring(1)
    }!! Você acertou, Parabéns!!`;
  }

  function applyErrorEnvironment() {
    elBody.style.backgroundColor = "var(--light-red)";
    elSubmitButton.textContent = "Reiniciar";
    elInput.value = `${
      pokemonName[0].toUpperCase() + pokemonName.substring(1)
    }! Não foi dessa vez ;-;`;
  }

  //Atualizando o button de skipar
    function updateAlSkipButton(){
      numberOfSkips = 3;
      elSkipButton.textContent = `Pular | ${numberOfSkips}`;
    }
});

elSkipButton.addEventListener("click", () => {
  if (numberOfSkips > 0) {
    handleStart();
    numberOfSkips--;
    elSkipButton.textContent = `Pular | ${numberOfSkips}`;
    if(numberOfSkips == 0) {
      elSkipButton.disabled = true;
    }
  }
});
