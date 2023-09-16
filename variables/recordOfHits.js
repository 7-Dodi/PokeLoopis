import { getSumOfHits } from "./sumOfHits.js";

const elRecord = document.querySelector(".record-hits");

let recordOfHits = 0;
// Atualiza o valor do recorde na mensagem
const updateRecordOfHitsElement = () =>
  (elRecord.textContent = `🔥 Recordes de acertos: ${recordOfHits}`);

function initializeRecordOfHits() {
  recordOfHits = JSON.parse(localStorage.getItem("record") || "0");
  updateRecordOfHitsElement();
}
function countMaximumHits() {
  const sumOfHits = getSumOfHits();
  recordOfHits = Math.max(recordOfHits, sumOfHits);
  updateRecordOfHitsElement();
  localStorage.setItem("record", JSON.stringify(recordOfHits));
}

export { initializeRecordOfHits, countMaximumHits };
