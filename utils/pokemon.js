import { applyDefaultEnvironment } from "./environments.js";

//Objeto como a lista de tipos, tradução e a cor correspondente
const typesPokemon = [
  {
    name: "fire",
    tradution: "Fogo",
    color: "var(--light-red)",
  },
  {
    name: "bug",
    tradution: "Inseto",
    color: "var(--green)",
  },
  {
    name: "psychic",
    tradution: "Psíquico",
    color: "var(--purple)",
  },
  {
    name: "water",
    tradution: "Água",
    color: "var(--blue)",
  },
  {
    name: "ghost",
    tradution: "Fantasma",
    color: "var(--grey)",
  },
  {
    name: "normal",
    tradution: "Normal",
    color: "var(--orange)",
  },
  {
    name: "ground",
    tradution: "Terrestre",
    color: "var(--brow)",
  },
  {
    name: "electric",
    tradution: "Elétrico",
    color: "var(--yellow)",
  },
  {
    name: "poison",
    tradution: "Venenoso",
    color: "var(--magenta)",
  },
  {
    name: "grass",
    tradution: "Planta",
    color: "var(--honey)",
  },
  {
    name: "fighting",
    tradution: "Lutador",
    color: "var(--naval)",
  },
  {
    name: "rock",
    tradution: "Pedra",
    color: "var(--rock)",
  },
  {
    name: "steel",
    tradution: "Aço",
    color: "var(--steel)",
  },
  {
    name: "dragon",
    tradution: "Dragão",
    color: "var(--kepel)",
  },
  {
    name: "fairy",
    tradution: "Fada",
    color: "var(--fairy)",
  },
  {
    name: "ice",
    tradution: "Gelo",
    color: "var(--ice)",
  },
  {
    name: "flying",
    tradution: "Voador",
    color: "var(--fly)",
  },
  {
    name: "dark",
    tradution: "Sombrio",
    color: "var(--dark)",
  },
];

const elTipPoke = document.querySelector(".tip-poke");
const elCirclePoke = document.querySelector(".circle-poke");
const pokeTypes = document.querySelector(".tip-poke > h4");
const elPokeImage = document.querySelector(".pokemon-img-dark");

let pokemonData = {};

function getPokemon() {
  return pokemonData;
}

function getPokemonName() {
  return pokemonData.name;
}

async function initializePokemon() {
  const pokeDataLS = localStorage.getItem("pokemon");

  // caso existam dados salvos em cache
  if(pokeDataLS) {
    pokemonData = JSON.parse(pokeDataLS);
    initializeAttributes(pokemonData.image, pokemonData.types);
  } else { // caso não existam dados salvos em cache
    await randomizePokemon();
  }
}

async function randomizePokemon() {
  applyDefaultEnvironment();

  const pokemonData_ = await getPokeData();
  localStorage.setItem("pokemon", JSON.stringify(pokemonData_)); //Enviando os dados do pokemon para o localStorage
  const { image, types } = pokemonData_;
  pokemonData = pokemonData_;
  
  initializeAttributes(image, types);
}

//Função para inicializar a imagem e o tipo do pokemon
function initializeAttributes(image, types){
  elPokeImage.src = image;
  let typescontent = "Tipo: ";
  // Obs.: Seria legal se o nome dos tipos fossem apresentados em português
  types.forEach(
    ({ type }) => (typescontent += ` ${getPokeTypeTranslation(type.name)}`)
  );
  pokeTypes.innerText = typescontent;
  applyColorBackgroundTypes(types[0].type.name);
}

async function getPokeData() {
  // gera um número entre 1 e 500
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

// Pega a tradução do nome do respectivo tipo
function getPokeTypeTranslation(typeName) {
  const typeTranslation = typesPokemon.find(({ name }) => name === typeName);
  return typeTranslation.tradution;
};

// Função para mudar a cor do circulo e da dica
function applyColorBackgroundTypes(name) {
  typesPokemon.forEach((type) => {
    if (name === type.name) {
      elTipPoke.style.backgroundColor = type.color;
      elCirclePoke.style.backgroundColor = type.color;
    }
  });
}

export { typesPokemon, getPokemon, getPokemonName, initializePokemon, randomizePokemon, getPokeTypeTranslation, applyColorBackgroundTypes };
