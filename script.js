import { applyDefaultEnvironment, applyErrorEnvironment, applyHitEnvironment } from "./environments.js";
import {
  applyColorBackgroundTypes,
  getPokeTypeTranslation,
} from "./pokemonTypes.js";

const elPokeImage = document.querySelector(".pokemon-img-dark");
const elInput = document.querySelector("#text-poke");
const elSubmitButton = document.querySelector("#button-poke");
const elSkipButton = document.querySelector("#skip-button");
const elHits = document.querySelector(".current-hits");
const elRecord = document.querySelector(".record-hits");

const pokeTypes = document.querySelector(".tip-poke > h4");

let pokemonName = "";

let numberOfSkips = 3;
function setNumberOfSkips(numberOfSkips_) {
  numberOfSkips = numberOfSkips_;
  elSkipButton.textContent = `Pular | ${numberOfSkips}`;
  if (numberOfSkips == 0) {
    elSkipButton.disabled = true;
  }
}

let sumOfHits = 0;
// Atualiza o valor da soma de acertos na mensagem
const updateSumOfHitsElement = () =>
  (elHits.textContent = `Acertos atuais: ${sumOfHits}`);

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
const updateRecordOfHitsElement = () =>
  (elRecord.textContent = `🔥 Recordes de acertos: ${recordOfHits}`);

function initializeRecordOfHits() {
  recordOfHits = JSON.parse(localStorage.getItem("record") || "0");
  updateRecordOfHitsElement();
}
function countMaximumHits() {
  recordOfHits = Math.max(recordOfHits, sumOfHits);
  updateRecordOfHitsElement();
  localStorage.setItem("record", JSON.stringify(recordOfHits));
}
/** ------------------------------------------ */

handleStart();
async function handleStart() {
  applyDefaultEnvironment(numberOfSkips);
  initializeSumOfHits();
  initializeRecordOfHits();

  const { image, name, types } = await getPokeData();
  pokemonName = name;
  elPokeImage.src = image;
  let typescontent = "Tipo: ";
  // Obs.: Seria legal se o nome dos tipos fossem apresentados em português
  types.forEach(
    ({ type }) => (typescontent += ` ${getPokeTypeTranslation(type.name)}`)
  );
  pokeTypes.innerText = typescontent;
  applyColorBackgroundTypes(types[0].type.name);

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
}

/** EventListeners --------------------------- */

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
    applyHitEnvironment(pokemonName);
    setSumOfHits(sumOfHits + 1);
  } else {
    // caso o usuário não tenha acertado o palpite
    applyErrorEnvironment(pokemonName);
    countMaximumHits();
    setSumOfHits(0);

    // reiniciando o número de skips disponíveis
    setNumberOfSkips(3);
  }

  elSkipButton.disabled = true;
});

elSkipButton.addEventListener("click", () => {
  if (numberOfSkips > 0) {
    handleStart();
    setNumberOfSkips(numberOfSkips - 1);
  }
});
