//Home Button Redirecting

const redirectButton = document.getElementById("directing");
const secondRedirecting = document.getElementById("redirecting2");

redirectButton.addEventListener("submit", () => {
  window.location.href = "journal.html";
});

secondRedirecting.addEventListener("click", () => {
  window.location.href = "journal.html";
});
