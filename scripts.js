const form = document.querySelector(".formEmail");
const formTwo = document.querySelector(".formEmailTwo");

const alertModal = (status) => {
  document.querySelector(".fundo").style.display = "block";
  if (status >= 200 && status <= 300) {
    document.querySelector(".boxModalSucesso").style.display = "block";
  } else {
    document.querySelector(".boxModalErro").style.display = "block";
  }
};

const alertClear = () => {
  document.querySelector(".fundo").style.display = "none";
  document.querySelector(".boxModalSucesso").style.display = "none";
  document.querySelector(".boxModalErro").style.display = "none";
  document.querySelector(".formEmail input").value = "";
  document.location.reload(true);
};

const sendEmail = (formSelector, emailSelector) => (e) => {
  e.preventDefault();
  let email = document.querySelector(`${formSelector} ${emailSelector}`).value;
  const options = {email};
  fetch("https://09wtsdvqd7.execute-api.us-east-1.amazonaws.com/dev/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  })
    .then((response) => {
      alertModal(response.status)
    })
    .catch((error) => {
      alertModal(response.status)
    });
};

form.addEventListener("submit", sendEmail(".formEmail", "input"));
formTwo.addEventListener("submit", sendEmail(".formEmailTwo", "input"));