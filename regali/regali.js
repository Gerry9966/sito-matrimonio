/* =========================================================
   LISTA NOZZE - VIAGGIO DI NOZZE
========================================================= */

const IBAN = "IT84R0306975513100000008135";

const copyIbanButton = document.getElementById("copyIban");
const ibanCopyFeedback = document.getElementById("ibanCopyFeedback");


/* =========================================================
   COPIA IBAN
========================================================= */

if (copyIbanButton) {

  copyIbanButton.addEventListener("click", async () => {

    const originalText = copyIbanButton.textContent;

    try {

      // Metodo principale
      await navigator.clipboard.writeText(IBAN);

      copyIbanButton.textContent = "IBAN copiato ✓";

      if (ibanCopyFeedback) {
        ibanCopyFeedback.textContent =
          "Ora puoi incollarlo direttamente nell’app della tua banca.";
      }

      setTimeout(() => {

        copyIbanButton.textContent = originalText;

        if (ibanCopyFeedback) {
          ibanCopyFeedback.textContent = "";
        }

      }, 3000);

    } catch (error) {

      /*
       * Metodo alternativo per browser che
       * non supportano navigator.clipboard
       */

      const temporaryInput = document.createElement("textarea");

      temporaryInput.value = IBAN;
      temporaryInput.setAttribute("readonly", "");

      temporaryInput.style.position = "fixed";
      temporaryInput.style.left = "-9999px";
      temporaryInput.style.top = "-9999px";

      document.body.appendChild(temporaryInput);

      temporaryInput.focus();
      temporaryInput.select();
      temporaryInput.setSelectionRange(0, IBAN.length);

      try {

        document.execCommand("copy");

        copyIbanButton.textContent = "IBAN copiato ✓";

        if (ibanCopyFeedback) {
          ibanCopyFeedback.textContent =
            "Ora puoi incollarlo direttamente nell’app della tua banca.";
        }

        setTimeout(() => {

          copyIbanButton.textContent = originalText;

          if (ibanCopyFeedback) {
            ibanCopyFeedback.textContent = "";
          }

        }, 3000);

      } catch (fallbackError) {

        if (ibanCopyFeedback) {
          ibanCopyFeedback.textContent =
            "Copia manualmente l’IBAN: " + IBAN;
        }

      }

      document.body.removeChild(temporaryInput);
    }

  });

}


/* =========================================================
   HAMBURGER MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const sideOverlay = document.getElementById("sideOverlay");


function openMenu() {

  sideMenu.classList.add("open");
  sideOverlay.classList.add("open");
  menuToggle.classList.add("open");

}


function closeMenu() {

  sideMenu.classList.remove("open");
  sideOverlay.classList.remove("open");
  menuToggle.classList.remove("open");

}


if (menuToggle && sideMenu && sideOverlay) {

  menuToggle.addEventListener("click", () => {

    if (sideMenu.classList.contains("open")) {

      closeMenu();

    } else {

      openMenu();

    }

  });


  sideOverlay.addEventListener("click", closeMenu);

}