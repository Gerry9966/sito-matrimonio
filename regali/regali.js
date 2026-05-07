const giftModal = document.getElementById("giftModal");
const closeGiftModal = document.getElementById("closeGiftModal");
const giftSelected = document.getElementById("giftSelected");
const ibanBox = document.getElementById("ibanBox");

const giftForm = document.getElementById("giftForm");
const giftName = document.getElementById("giftName");
const giftAmount = document.getElementById("giftAmount");
const giftMessage = document.getElementById("giftMessage");

const showIbanButton = document.getElementById("showIbanButton");
const causaleText = document.getElementById("causaleText");
const giftSuccess = document.getElementById("giftSuccess");

const copyIbanButton = document.getElementById("copyIban");
const copyCausaleButton = document.getElementById("copyCausale");

const giftButtons = document.querySelectorAll(".regalo-card button");

const IBAN = "IT00X0000000000000000000000";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzVuQo7Ql493vzfsACDySRfUt6AbD4hWpxSW3vn9wnvik0xXWY8zAUC02a9TiPiJhht5Q/exec";

giftButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".regalo-card");
    const giftTitle = card.querySelector("h2").textContent.trim();

    giftSelected.value = giftTitle;
    giftName.value = "";
    giftAmount.value = "";
    giftMessage.value = "";
    causaleText.textContent = "";

    giftModal.classList.add("open");
    ibanBox.classList.remove("open");
  });
});

closeGiftModal.addEventListener("click", () => {
  giftModal.classList.remove("open");
});

giftModal.addEventListener("click", (event) => {
  if (event.target === giftModal) {
    giftModal.classList.remove("open");
  }
});

showIbanButton.addEventListener("click", () => {
  if (!giftName.value.trim() || !giftAmount.value.trim()) {
    alert("Inserisci nome e importo prima di continuare.");
    return;
  }

  const nome = giftName.value.trim();
  const regalo = giftSelected.value.trim();

  causaleText.textContent = `Regalo nozze ${nome} ${regalo}`;
  ibanBox.classList.add("open");
});

copyIbanButton.addEventListener("click", async () => {
  await copyToClipboard(IBAN, copyIbanButton, "IBAN copiato ✓");
});

copyCausaleButton.addEventListener("click", async () => {
  await copyToClipboard(causaleText.textContent, copyCausaleButton, "Causale copiata ✓");
});

giftForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!GOOGLE_SCRIPT_URL) {
    alert("Form non ancora collegato a Google Sheets.");
    return;
  }

  const submitButton = giftForm.querySelector(".confirm-transfer");

  const formData = new FormData();
  formData.append("nome", giftName.value.trim());
  formData.append("regalo", giftSelected.value.trim());
  formData.append("importo", giftAmount.value.trim());
  formData.append("messaggio", giftMessage.value.trim());
  formData.append("causale", causaleText.textContent.trim());
  formData.append("data", new Date().toLocaleString("it-IT"));

  try {
    submitButton.disabled = true;
    submitButton.textContent = "Invio in corso...";

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData
    });

    giftModal.classList.remove("open");
    giftSuccess.classList.add("open");

    giftForm.reset();
    ibanBox.classList.remove("open");
    causaleText.textContent = "";

    setTimeout(() => {
      giftSuccess.classList.remove("open");
    }, 4200);
  } catch (error) {
    alert("C'è stato un problema nell'invio. Riprova tra qualche secondo.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Ho effettuato il bonifico ❤️";
  }
});

async function copyToClipboard(text, button, successText) {
  const originalText = button.textContent;

  try {
    await navigator.clipboard.writeText(text);
    button.textContent = successText;

    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  } catch (error) {
    alert("Copia non riuscita. Puoi copiare manualmente il testo.");
  }
}