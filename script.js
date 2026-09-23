/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate = new Date("2027-01-03T16:00:00").getTime();

function updateCountdown() {

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    return;
  }

  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {

    daysElement.innerText = "0";
    hoursElement.innerText = "0";
    minutesElement.innerText = "0";
    secondsElement.innerText = "0";

    return;
  }

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (distance / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (distance / 1000) % 60
  );

  daysElement.innerText = days;
  hoursElement.innerText = hours;
  minutesElement.innerText = minutes;
  secondsElement.innerText = seconds;
}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   RSVP - ELEMENTI
========================================================= */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx9yGO0NMZE17jES6VVY90sC5ZNNoJSaX1vt0p6qLigZKqSrdm52PmTMmln50w751lZ/exec";

const form = document.getElementById("rsvp-form");
const message = document.getElementById("form-message");

const partecipazioneSelect =
  document.getElementById("partecipazione");

const extraFields =
  document.getElementById("rsvp-extra-fields");

const numeroInvitati =
  document.getElementById("numero_invitati");

const pernottamentoSelect =
  document.getElementById("pernottamento");

const partecipantiAggiuntivi =
  document.getElementById("partecipanti-aggiuntivi");


/* =========================================================
   MOSTRA / NASCONDI CAMPI RSVP
========================================================= */

if (partecipazioneSelect && extraFields) {

  partecipazioneSelect.addEventListener(
    "change",
    function () {

      if (this.value === "Sì") {

        extraFields.classList.add("show-fields");

      } else {

        extraFields.classList.remove("show-fields");

        if (numeroInvitati) {
          numeroInvitati.value = "";
        }

        if (pernottamentoSelect) {
          pernottamentoSelect.value = "";
        }

        if (partecipantiAggiuntivi) {
          partecipantiAggiuntivi.innerHTML = "";
        }

      }

    }
  );

}


/* =========================================================
   CREA PARTECIPANTI AGGIUNTIVI
========================================================= */

function creaPartecipantiAggiuntivi(numeroTotale) {

  if (!partecipantiAggiuntivi) {
    return;
  }

  partecipantiAggiuntivi.innerHTML = "";

  /*
    La prima persona è quella che sta compilando il form.
    Quindi iniziamo dal partecipante numero 2.
  */

  for (
    let numeroPartecipante = 2;
    numeroPartecipante <= numeroTotale;
    numeroPartecipante++
  ) {

    const participantBox =
      document.createElement("div");

    participantBox.className =
      "partecipante-aggiuntivo";


    /* TITOLO */

    const titolo =
      document.createElement("h3");

    titolo.className =
      "partecipante-title";

    titolo.innerText =
  numeroPartecipante === 2
    ? "Chi viene con te?"
    : "E chi altro?";

    participantBox.appendChild(titolo);


    /* NOME E COGNOME */

    const nome =
      document.createElement("input");

    nome.type = "text";

    nome.name =
      "partecipante_" +
      numeroPartecipante +
      "_nome";

    nome.placeholder =
      "Nome e cognome";

    nome.autocomplete = "off";

    nome.required = true;

    participantBox.appendChild(nome);


    /* ALLERGIE */

    const allergie =
      document.createElement("textarea");

    allergie.name =
      "partecipante_" +
      numeroPartecipante +
      "_allergie";

    allergie.placeholder =
      "Allergie o esigenze alimentari";

    participantBox.appendChild(allergie);


    /* BOX PERNOTTAMENTO */

    const sleepBox =
      document.createElement("div");

    sleepBox.className =
      "sleep-box partecipante-sleep-box";


    const sleepTitle =
      document.createElement("p");

    sleepTitle.className =
      "sleep-title";

    sleepTitle.innerText =
      "Necessita di pernottamento?";

    sleepBox.appendChild(sleepTitle);


    const pernottamento =
      document.createElement("select");

    pernottamento.name =
      "partecipante_" +
      numeroPartecipante +
      "_pernottamento";

    pernottamento.required = true;


    /* OPZIONE INIZIALE */

    const optionDefault =
      document.createElement("option");

    optionDefault.value = "";

    optionDefault.innerText =
      "Necessita di pernottamento?";

    pernottamento.appendChild(
      optionDefault
    );


    /* SÌ */

    const optionSi =
      document.createElement("option");

    optionSi.value = "Sì";
    optionSi.innerText = "Sì";

    pernottamento.appendChild(
      optionSi
    );


    /* NO */

    const optionNo =
      document.createElement("option");

    optionNo.value = "No";
    optionNo.innerText = "No";

    pernottamento.appendChild(
      optionNo
    );


    sleepBox.appendChild(
      pernottamento
    );

    participantBox.appendChild(
      sleepBox
    );


    /* INSERISCE IL PARTECIPANTE NEL FORM */

    partecipantiAggiuntivi.appendChild(
      participantBox
    );

  }

}


/* =========================================================
   CAMBIO NUMERO PARTECIPANTI
========================================================= */

if (numeroInvitati && partecipantiAggiuntivi) {

  function aggiornaPartecipanti() {

    const valore = numeroInvitati.value.trim();

    // Campo vuoto: nessun partecipante aggiuntivo
    if (valore === "") {
      partecipantiAggiuntivi.innerHTML = "";
      return;
    }

    const numero = Number(valore);

    // Valore non valido oppure 1:
    // nessun partecipante aggiuntivo
    if (!Number.isInteger(numero) || numero <= 1) {
      partecipantiAggiuntivi.innerHTML = "";
      return;
    }

    // Massimo 10 partecipanti
    if (numero > 10) {
      numeroInvitati.value = 10;
      creaPartecipantiAggiuntivi(10);
      return;
    }

    // Solo da 2 in poi vengono creati gli accompagnatori
    creaPartecipantiAggiuntivi(numero);
  }

  numeroInvitati.addEventListener(
    "input",
    aggiornaPartecipanti
  );

  numeroInvitati.addEventListener(
    "change",
    aggiornaPartecipanti
  );
}

/* =========================================================
   INVIO RSVP
========================================================= */

if (form && message) {

  form.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      message.innerText =
        "Invio in corso...";

      const formData =
        new FormData(form);


      /*
        ATTENZIONE:

        Per ora manteniamo l'invio esistente.

        Nel prossimo passaggio aggiorneremo
        Google Apps Script affinché ogni
        partecipante venga registrato in
        una riga separata del Google Sheet.
      */

      fetch(
        GOOGLE_SCRIPT_URL,
        {
          method: "POST",
          mode: "no-cors",
          body: formData
        }
      );


      message.innerText =
        "Grazie! Conferma inviata.";

      form.reset();


      /* NASCONDE I CAMPI EXTRA */

      if (extraFields) {

        extraFields.classList.remove(
          "show-fields"
        );

      }


      /* ELIMINA I PARTECIPANTI GENERATI */

      if (partecipantiAggiuntivi) {

        partecipantiAggiuntivi.innerHTML = "";

      }

    }
  );

}


/* =========================================================
   APERTURA INVITO
========================================================= */

const invitationScreen =
  document.getElementById(
    "invitation-screen"
  );

const openInvitationButton =
  document.getElementById(
    "open-invitation"
  );

const invitationAlreadyOpened =
  localStorage.getItem(
    "invitationOpened"
  );


if (
  invitationAlreadyOpened === "true" &&
  invitationScreen
) {

  invitationScreen.classList.add(
    "hidden"
  );

}


if (
  openInvitationButton &&
  invitationScreen
) {

  openInvitationButton.addEventListener(
    "click",
    function () {

      invitationScreen.classList.add(
        "opening"
      );

      localStorage.setItem(
        "invitationOpened",
        "true"
      );

      setTimeout(
        function () {

          invitationScreen.classList.add(
            "hidden"
          );

        },
        900
      );

    }
  );

}


/* =========================================================
   HAMBURGER MENU
========================================================= */

const menuToggle =
  document.getElementById(
    "menuToggle"
  );

const sideMenu =
  document.getElementById(
    "sideMenu"
  );

const sideOverlay =
  document.getElementById(
    "sideOverlay"
  );


function openMenu() {

  if (sideMenu) {
    sideMenu.classList.add("open");
  }

  if (sideOverlay) {
    sideOverlay.classList.add("open");
  }

  if (menuToggle) {
    menuToggle.classList.add("open");
  }

}


function closeMenu() {

  if (sideMenu) {
    sideMenu.classList.remove("open");
  }

  if (sideOverlay) {
    sideOverlay.classList.remove("open");
  }

  if (menuToggle) {
    menuToggle.classList.remove("open");
  }

}


if (menuToggle && sideMenu) {

  menuToggle.addEventListener(
    "click",
    function () {

      if (
        sideMenu.classList.contains("open")
      ) {

        closeMenu();

      } else {

        openMenu();

      }

    }
  );

}


if (sideOverlay) {

  sideOverlay.addEventListener(
    "click",
    closeMenu
  );

}


/* =========================================================
   MUSIC PLAYER
========================================================= */

const musicToggle =
  document.getElementById(
    "musicToggle"
  );

const bgMusic =
  document.getElementById(
    "bgMusic"
  );

let musicPlaying = false;


if (
  musicToggle &&
  bgMusic
) {

  bgMusic.volume = 0.12;

  musicToggle.addEventListener(
    "click",
    async function () {

      try {

        if (!musicPlaying) {

          await bgMusic.play();

          musicPlaying = true;

          musicToggle.innerText =
            "❚❚ Pausa musica";

        } else {

          bgMusic.pause();

          musicPlaying = false;

          musicToggle.innerText =
            "▶︎ Musica";

        }

      } catch (error) {

        console.log(error);

      }

    }
  );

}