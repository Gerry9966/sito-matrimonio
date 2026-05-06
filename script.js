/* COUNTDOWN */

const weddingDate = new Date("2027-01-03T16:00:00").getTime();

function updateCountdown() {
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
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

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysElement.innerText = days;
  hoursElement.innerText = hours;
  minutesElement.innerText = minutes;
  secondsElement.innerText = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* RSVP */

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx9yGO0NMZE17jES6VVY90sC5ZNNoJSaX1vt0p6qLigZKqSrdm52PmTMmln50w751lZ/exec";

const form = document.getElementById("rsvp-form");
const message = document.getElementById("form-message");

if (form && message) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    message.innerText = "Invio in corso...";

    const formData = new FormData(form);

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    message.innerText = "Grazie! Conferma inviata.";
    form.reset();
  });
}


/* APERTURA INVITO + MUSICA */

const invitationScreen = document.getElementById("invitation-screen");
const openInvitationButton = document.getElementById("open-invitation");
const weddingMusic = document.getElementById("wedding-music");

if (openInvitationButton && invitationScreen) {
  openInvitationButton.addEventListener("click", function () {
    invitationScreen.classList.add("opening");

    if (weddingMusic) {
      weddingMusic.volume = 0.4;

      weddingMusic.play().catch(function (error) {
        console.log("Musica non partita:", error);
      });
    }

    setTimeout(function () {
      invitationScreen.classList.add("hidden");
    }, 900);
  });
}
