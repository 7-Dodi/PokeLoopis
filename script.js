const elBody = document.querySelector("body");
const elPokeImage = document.getElementsByClassName("pokemon-img-dark")[0];
const elInput = document.querySelector("#text-poke");
const elButton = document.querySelector("#button-poke");

let pokemonName = "";

handleStart();

async function handleStart() {
  resetFields();

  const { image, name } = await getPokeData();
  pokemonName = name;
  elPokeImage.src = image;
}

function resetFields() {
  elBody.style.backgroundColor = "var(--black)";
  elButton.textContent = "Enviar";
  elInput.placeholder = "Qual é esse Pokémon?!";
  elPokeImage.style.filter = "brightness(0)";
  elInput.disabled = false;
  elInput.value = "";
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
  };
}

const form = document.querySelector("form");
form.addEventListener("submit", (eve) => {
  eve.preventDefault();
});

const sendButton = document.querySelector("#button-poke");
sendButton.addEventListener("click", () => {
  if (elButton.textContent === "Reiniciar") {
    handleStart();
    return;
  }

  const userReponse = elInput.value;

  if (userReponse !== pokemonName) {
    elBody.style.backgroundColor = "var(--green)";
    elPokeImage.style.filter = "none";
    elInput.value = `${
      pokemonName[0].toUpperCase() + pokemonName.substring(1)
    }!! Você acertou, Parabéns!!`;
    elInput.disabled = true;
    elButton.textContent = "Reiniciar";
  }
});
