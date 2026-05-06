/* COUNTDOWN */

const weddingDate = new Date("2027-01-03T16:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("days").innerText = "0";
    document.getElementById("hours").innerText = "0";
    document.getElementById("minutes").innerText = "0";
    document.getElementById("seconds").innerText = "0";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* RSVP */

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx9yGO0NMZE17jES6VVY90sC5ZNNoJSaX1vt0p6qLigZKqSrdm52PmTMmln50w751lZ/exec";

const form = document.getElementById("rsvp-form");
const message = document.getElementById("form-message");

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


/* APERTURA INVITO + MUSICA */

const invitationScreen = document.getElementById("invitation-screen");
const openInvitationButton = document.getElementById("open-invitation");
const weddingMusic = document.getElementById("wedding-music");

openInvitationButton.addEventListener("click", function () {
  invitationScreen.classList.add("opening");

  weddingMusic.volume = 0.4;

  const playPromise = weddingMusic.play();

  if (playPromise !== undefined) {
    playPromise
      .then(function () {
        console.log("Musica avviata");
      })
      .catch(function () {
        alert("Tocca di nuovo lo schermo per avviare la musica 🎵");
      });
  }

  setTimeout(function () {
    invitationScreen.classList.add("hidden");
  }, 900);
});
