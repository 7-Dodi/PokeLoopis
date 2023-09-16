const elHits = document.querySelector(".current-hits");

let sumOfHits = 0;

function getSumOfHits() {
  return sumOfHits;
}

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

function increaseSumOfHits() {
  setSumOfHits(sumOfHits + 1);
}

export { getSumOfHits, initializeSumOfHits, setSumOfHits, increaseSumOfHits };
