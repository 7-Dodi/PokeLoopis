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

export { typesPokemon, getPokeTypeTranslation, applyColorBackgroundTypes };