import {
  applyDefaultEnvironment,
  applyErrorEnvironment,
  applyHitEnvironment,
} from "./utils/environments.js";
import {
  getPokemonName,
  initializePokemon,
  randomizePokemon,
} from "./utils/pokemon.js";
import {
  countMaximumHits,
  initializeRecordOfHits,
} from "./variables/recordOfHits.js";
import {
  getNumberOfSkips,
  initializeNumberOfSkips,
  setNumberOfSkips,
} from "./variables/numberOfSkips.js";
import {
  increaseSumOfHits,
  initializeSumOfHits,
  setSumOfHits,
} from "./variables/sumOfHits.js";

const elPokeImage = document.querySelector(".pokemon-img-dark");
const elInput = document.querySelector("#text-poke");
const elSubmitButton = document.querySelector("#button-poke");
const elSkipButton = document.querySelector("#skip-button");

handleStart();
async function handleStart() {
  initializeNumberOfSkips();
  initializeSumOfHits();
  initializeRecordOfHits();

  applyDefaultEnvironment();

  // deixando a inicialização do pokemon por último propositalmente, pois pode demorar mais
  await initializePokemon();
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
    // randomize o pokemon
    randomizePokemon();
    return;
  }

  /// Caso o usuário esteja enviando um palpite:

  const userReponse = document.querySelector("#text-poke").value;

  const pokemonName = getPokemonName();
  // caso o usuário tenha acertado o palpite
  if (userReponse.toLowerCase() === pokemonName) {
    applyHitEnvironment();
    increaseSumOfHits();
  } else {
    // caso o usuário não tenha acertado o palpite
    applyErrorEnvironment();
    countMaximumHits();
    setSumOfHits(0);

    // reiniciando o número de skips disponíveis
    setNumberOfSkips(3);
  }
});

elSkipButton.addEventListener("click", () => {
  const numberOfSkips = getNumberOfSkips();

  if (numberOfSkips > 0) {
    handleStart();
    setNumberOfSkips(numberOfSkips - 1);
  }
});
