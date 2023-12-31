import {
  applyErrorEnvironment,
  applyHitEnvironment,
  setReloadDesignPage,
  setVisibleMenu,
} from "./utils/environments.js";
import {
  getPokemonName,
  initializePokemon,
  randomizePokemon,
} from "./utils/pokemon.js";
import {
  getNumberOfSkips,
  initializeNumberOfSkips,
  setNumberOfSkips,
} from "./variables/numberOfSkips.js";
import {
  countMaximumHits,
  initializeRecordOfHits,
} from "./variables/recordOfHits.js";
import {
  increaseSumOfHits,
  initializeSumOfHits,
  setSumOfHits,
} from "./variables/sumOfHits.js";

const elSubmitButton = document.querySelector("#button-poke");
const elSkipButton = document.querySelector("#skip-button");
const elAudio = document.querySelector("audio");
const elAudioControl = document.querySelector(".audio-control");
const elForm = document.querySelector("form");

handleStart();
async function handleStart() {
  await initializePokemon();
  setReloadDesignPage(); //Função de reload da página
  initializeNumberOfSkips();
  initializeSumOfHits();
  initializeRecordOfHits();
}

/** EventListeners --------------------------- */

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

elSubmitButton.addEventListener("click", () => {
  /// Caso o usuário queira continuar jogando
  if (elSubmitButton.textContent !== "Enviar") {
    //Caso o button seja de reiniciar
    if(elSubmitButton.textContent === "Reiniciar"){
      setVisibleMenu("flex");
    }
    
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
    randomizePokemon(); //Randomize o pokemon
    setNumberOfSkips(numberOfSkips - 1);
  }
});

elAudioControl.addEventListener("click", () => {
  if (elAudio.paused) {
    elAudioControl.innerHTML = `<i class="fas fa-pause"></i>`;
    elAudio.play();
  } else {
    elAudioControl.innerHTML = `<i class="fas fa-play"></i>`;
    elAudio.pause();
  }
});
