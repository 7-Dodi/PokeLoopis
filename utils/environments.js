import { getPokemonName } from "./pokemon.js";
import { getNumberOfSkips } from "../variables/numberOfSkips.js";

const elBody = document.querySelector("body");
const elPokeImage = document.querySelector(".pokemon-img-dark");
const elInput = document.querySelector("#text-poke");
const elSubmitButton = document.querySelector("#button-poke");
const elSkipButton = document.querySelector("#skip-button");

const capitalizeFLetter = (p) => p[0].toUpperCase() + p.slice(1);
const elHits = document.querySelector(".current-hits");

function applyDefaultEnvironment() {
  elBody.style.backgroundColor = "var(--black)";
  elSubmitButton.textContent = "Enviar";
  elInput.placeholder = "Qual é esse Pokémon?!";
  elPokeImage.style.transition = "0s";
  elPokeImage.style.filter = "brightness(0)";
  elInput.disabled = false;
  elInput.value = "";
  
  const numberOfSkips = getNumberOfSkips();

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
  
  const pokemonName = getPokemonName();
  elInput.value = `${capitalizeFLetter(
    pokemonName
  )}!! Você acertou, Parabéns!!`;
}

function applyErrorEnvironment() {
  defaultSettings();
  elBody.style.backgroundColor = "var(--light-red)";
  elSubmitButton.textContent = "Reiniciar";
  const pokemonName = getPokemonName();
  elInput.value = `${capitalizeFLetter(pokemonName)}! Não foi dessa vez ;-;`;
}

export { applyDefaultEnvironment, applyHitEnvironment, applyErrorEnvironment };
