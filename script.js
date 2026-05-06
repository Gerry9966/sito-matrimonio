/* COUNTDOWN */

const weddingDate = new Date("2027-01-03T16:00:00").getTime();

function updateCountdown() {

  const now = new Date().getTime();

  const distance = weddingDate - now;

  if(distance <= 0){
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (distance / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (distance / 1000) % 60
  );

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

}

updateCountdown();

setInterval(updateCountdown,1000);


/* RSVP */

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx9yGO0NMZE17jES6VVY90sC5ZNNoJSaX1vt0p6qLigZKqSrdm52PmTMmln50w751lZ/exec";

const form = document.getElementById("rsvp-form");

const message = document.getElementById("form-message");

form.addEventListener("submit",function(event){

  event.preventDefault();

  message.innerText = "Invio in corso...";

  const formData = new FormData(form);

  fetch(GOOGLE_SCRIPT_URL,{
    method:"POST",
    mode:"no-cors",
    body:formData
  });

  message.innerText = "Grazie! Conferma inviata.";

  form.reset();

});
