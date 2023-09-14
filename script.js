const elBody = document.querySelector("body");
const elPokeImage = document.getElementsByClassName("pokemon-img-dark")[0];
const elInput = document.querySelector("#text-poke");
const elButton = document.querySelector("#button-poke");
const elHits = document.querySelector(".current-hits");
const elRecord = document.querySelector(".record-hits");

let pokemonName = "";
let sumOfHits = 0;
function countCurrentHits() {
  sumOfHits++;
  elHits.textContent = `Acertos atuais: ${sumOfHits}`;
}
let recordOfHits = 0;
function countMaximumHits() {
  recordOfHits = Math.max(recordOfHits, sumOfHits);
  elRecord.textContent = `🔥 Recordes de acertos: ${recordOfHits}`;
}
/////


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
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const sendButton = document.querySelector("#button-poke");
sendButton.addEventListener("click", () => {
  /// Caso o usuário queira continuar jogando
  if (elButton.textContent !== "Enviar") {
    handleStart();
    return;
  }

  /// Caso o usuário esteja enviando um palpite:

  const userReponse = document.querySelector("#text-poke").value;

  // ações em comum
  elPokeImage.style.filter = "brightness(100%)";
  elInput.disabled = true;

  // caso o usuário tenha acertado o palpite
  if (userReponse.toLowerCase() === pokemonName) {
    elBody.style.backgroundColor = "var(--green)";
    elButton.textContent = "Próximo";
    elInput.value = `${
      pokemonName[0].toUpperCase() + pokemonName.substring(1)
    }!! Você acertou, Parabéns!!`;

    countCurrentHits();
  } else {
    // caso o usuário não tenha acertado o palpite
    elBody.style.backgroundColor = "var(--red)";
    elButton.textContent = "Reiniciar";
    elInput.value = `${
      pokemonName[0].toUpperCase() + pokemonName.substring(1)
    }! Não foi dessa vez ;-;`;

    countMaximumHits();

    sumOfHits = 0;
    elHits.textContent = "Acertos atuais: 0";
  }
});
