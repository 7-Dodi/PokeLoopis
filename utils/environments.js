import { getPokemonName } from "./pokemon.js";
import { getNumberOfSkips } from "../variables/numberOfSkips.js";

const elBody = document.querySelector("body");
const elPokeImage = document.querySelector(".pokemon-img-dark");
const elInput = document.querySelector("#text-poke");
const elSubmitButton = document.querySelector("#button-poke");
const elSkipButton = document.querySelector("#skip-button");
const elBtnStart = document.querySelector("#btn-start");
const screen = document.querySelector(".screen");
let stateOfPage = "";

const capitalizeFLetter = (p) => p[0].toUpperCase() + p.slice(1);
const elHits = document.querySelector(".current-hits");

//Função para settar o stado da página
function setResultLocalStorage(newState) {
  localStorage.setItem("statePage", JSON.stringify(newState));
  return true;
}

function setVisibleMenu(valeu){
  if(valeu === 'none' || valeu === 'flex'){
    screen.style.display = valeu;
  }
}

function applyDefaultEnvironment() {
  elBody.style.backgroundColor = "var(--black)";
  elSubmitButton.textContent = "Enviar";
  elInput.placeholder = "Qual é esse Pokémon?!";
  elPokeImage.style.transition = "0s";
  elPokeImage.style.filter = "brightness(0)";
  elInput.disabled = false;
  elInput.value = "";
  stateOfPage = "Default"; //Setando o valor da variável

  const numberOfSkips = getNumberOfSkips();
  setResultLocalStorage(stateOfPage);

  // Só ativa o botão de skipar se o número de skips for > 0
  if (numberOfSkips > 0) {
    elSkipButton.disabled = false;
  }
}

function defaultSettings() {
  elPokeImage.style.transition = "var(--transition-default)";
  elPokeImage.style.filter = "brightness(100%)";
  elInput.disabled = true;
  elSkipButton.disabled = true;
}

function applyHitEnvironment() {
  defaultSettings();
  elBody.style.backgroundColor = "var(--green)";
  elSubmitButton.textContent = "Próximo";
  stateOfPage = "Hit";
  setResultLocalStorage(stateOfPage);

  const pokemonName = getPokemonName();
  elInput.value = `${capitalizeFLetter(
    pokemonName
  )}!! Você acertou, Parabéns!!`;
}

function applyErrorEnvironment() {
  defaultSettings();
  elBody.style.backgroundColor = "var(--light-red)";
  elSubmitButton.textContent = "Reiniciar";
  stateOfPage = "Error";
  setResultLocalStorage(stateOfPage);

  const pokemonName = getPokemonName();
  elInput.value = `${capitalizeFLetter(pokemonName)}! Não foi dessa vez ;-;`;
}

//Função para modificar o design da página
function setReloadDesignPage() {
  const statePage = JSON.parse(localStorage.getItem("statePage"));

  if (statePage === "Default") {
    applyDefaultEnvironment();
  } else if (statePage === "Hit") {
    applyHitEnvironment();
  } else if (statePage == "Error") {
    applyErrorEnvironment();
  }
}

// AddEventeListenner para ativar a jogo
elBtnStart.addEventListener("click", ()=>{
  setVisibleMenu("none");
});

export {
  applyDefaultEnvironment,
  applyHitEnvironment,
  applyErrorEnvironment,
  setReloadDesignPage,
  setVisibleMenu,
};
